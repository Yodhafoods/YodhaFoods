import { Request, Response } from "express";
import mongoose from "mongoose";
import Product, { IProduct } from "../models/Product.js";
import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";
import { createProductSchema, updateProductSchema } from "../schemas/product.schema.js";

// Helper to upload to Cloudinary from buffer
const uploadToCloudinary = (buffer: Buffer): Promise<{ secure_url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload failed"));
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      }
    );
    Readable.from(buffer).pipe(stream);
  });
};

/**
 * POST /api/products
 * Admin: Create Product
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    // 1. Validate body with Zod
    // Note: Zod schema handles parsing JSON strings for complex fields via z.preprocess
    const validatedData = createProductSchema.parse(req.body);

    // 2. Resolve category
    let resolvedCategoryId: mongoose.Types.ObjectId;
    if (mongoose.isValidObjectId(validatedData.categoryId)) {
      const cat = await Category.findById(validatedData.categoryId);
      if (!cat) return res.status(404).json({ message: "Category not found" });
      resolvedCategoryId = cat._id as mongoose.Types.ObjectId;
    } else {
      const cat = await Category.findOne({ slug: validatedData.categoryId.toLowerCase() });
      if (!cat) return res.status(404).json({ message: "Category not found" });
      resolvedCategoryId = cat._id as mongoose.Types.ObjectId;
    }

    // 3. Handle Image Uploads
    let images: { url: string; public_id: string }[] = [];
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const uploadPromises = (req.files as Express.Multer.File[]).map(file =>
        uploadToCloudinary(file.buffer)
      );
      const results = await Promise.all(uploadPromises);
      results.forEach(res => images.push({ url: res.secure_url, public_id: res.public_id }));
    }

    // 4. Create Product
    const product = await Product.create({
      ...validatedData,
      categoryId: resolvedCategoryId,
      subCategory: validatedData.subCategory || null,
      images,
      // Default auto-slug handling is in Model
    });

    await product.populate("categoryId", "name slug");

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: "Validation error", errors: err.errors });
    }
    console.error("Create Product Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * PUT /api/products/:id
 * Admin: Update Product
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 1. Validate partial body
    const validatedData = updateProductSchema.parse(req.body);

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. Resolve Category if provided
    if (validatedData.categoryId) {
      if (mongoose.isValidObjectId(validatedData.categoryId)) {
        const cat = await Category.findById(validatedData.categoryId);
        if (!cat) return res.status(404).json({ message: "Category not found" });
        product.categoryId = cat._id as mongoose.Types.ObjectId;
      } else {
        const cat = await Category.findOne({ slug: validatedData.categoryId.toLowerCase() });
        if (!cat) return res.status(404).json({ message: "Category not found by slug" });
        product.categoryId = cat._id as mongoose.Types.ObjectId;
      }
    }

    // 3. Handle New Image Uploads (Append)
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const uploadPromises = (req.files as Express.Multer.File[]).map(file =>
        uploadToCloudinary(file.buffer)
      );
      const results = await Promise.all(uploadPromises);
      results.forEach(res => product.images.push({ url: res.secure_url, public_id: res.public_id }));
    }

    // 4. Update fields
    // Explicitly update fields if they exist in validatedData

    if (validatedData.name) product.name = validatedData.name;
    if (validatedData.slug) product.slug = validatedData.slug; // Allow slug update if provided
    if (validatedData.description !== undefined) product.description = validatedData.description;

    // For complex objects, if provided, entirely replace the property
    if (validatedData.packs) product.packs = validatedData.packs as any;
    if (validatedData.ingredients) product.ingredients = validatedData.ingredients;
    if (validatedData.shelfLifeMonths) product.shelfLifeMonths = validatedData.shelfLifeMonths;
    if (validatedData.storageInstructions !== undefined) product.storageInstructions = validatedData.storageInstructions;
    if (validatedData.howToUse !== undefined) product.howToUse = validatedData.howToUse;

    // Type casting 'as any' for complex nested schemas compatible with Mongoose Document types
    if (validatedData.nutritionTable) product.nutritionTable = validatedData.nutritionTable as any;
    if (validatedData.highlights) product.highlights = validatedData.highlights;
    if (validatedData.productInfo) product.productInfo = validatedData.productInfo;
    if (validatedData.specifications) product.specifications = validatedData.specifications as any;
    if (validatedData.seo) product.seo = validatedData.seo as any;

    if (validatedData.isActive !== undefined) product.isActive = validatedData.isActive;
    if (validatedData.isFeatured !== undefined) product.isFeatured = validatedData.isFeatured;
    if (validatedData.subCategory !== undefined) product.subCategory = validatedData.subCategory || null; // allow clearing it

    await product.save();
    await product.populate("categoryId", "name slug");

    return res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ message: "Validation error", errors: err.errors });
    }
    console.error("Update Product Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * DELETE /api/products/:id
 * Admin: Delete Product + Cloudinary cleanup
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Remove product images from Cloudinary
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((img: { public_id: string }) => {
        if (img.public_id) return cloudinary.uploader.destroy(img.public_id);
        return Promise.resolve();
      });
      await Promise.all(deletePromises);
    }

    await product.deleteOne();

    return res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete Product Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/products
 * Public: Paginated Products + Search + Category Filter
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 12, 100);
    const search = (req.query.search as string) || "";
    const categoryQuery = (req.query.category as string) || "";

    // Sort options
    const sort = (req.query.sort as string) || "newest"; // newest, price-asc, price-desc

    const filter: any = { isActive: true };

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (categoryQuery) {
      let catId: any = categoryQuery;
      if (!mongoose.isValidObjectId(categoryQuery)) {
        const cat = await Category.findOne({ slug: categoryQuery.toLowerCase() });
        if (!cat) {
          // If category slug not found, return empty list immediately
          return res.json({
            products: [],
            pagination: { total: 0, page, totalPages: 0 }
          });
        }
        catId = cat._id;
      }
      filter.categoryId = catId;
    }

    if (req.query.subCategory) {
      filter.subCategory = req.query.subCategory;
    }

    let sortOption: any = { createdAt: -1 };

    if (sort === "price-asc") sortOption = { "packs.price": 1 };
    if (sort === "price-desc") sortOption = { "packs.price": -1 };

    const [products, total] = await Promise.all([
      Product.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sortOption)
        .select("-specifications -seo -productInfo") // lightweight list
        .populate("categoryId", "name slug"),

      Product.countDocuments(filter)
    ]);

    return res.json({
      products,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error("Get Products Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/products/:id
 * Public: Get product by ID
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id).populate("categoryId", "name slug");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (err) {
    console.error("Get Product By ID Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/products/slug/:slug
 * Public: Get product by slug
 */
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug, isActive: true })
      .populate("categoryId", "name slug");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (err) {
    console.error("Get Product By Slug Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/products/category/:slug
 * Public: Get all products belonging to a category by slug
 */
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    // Find category
    const category = await Category.findOne({ slug: slug.toLowerCase(), isActive: true });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.find({
      categoryId: category._id,
      isActive: true,
    }).populate("categoryId", "name slug");

    return res.json({
      category: {
        name: category.name,
        slug: category.slug,
      },
      products,
    });
  } catch (err) {
    console.error("Get Products by Category Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/products/category/:categorySlug/:subCategorySlug
 * Public: Get products by subcategory
 */
export const getProductsBySubCategory = async (req: Request, res: Response) => {
  try {
    const { categorySlug, subCategorySlug } = req.params;

    // 1. Find connection parent category
    const category = await Category.findOne({ slug: categorySlug.toLowerCase(), isActive: true });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 2. Find subcategory
    const subCategory = category.subCategories.find(
      (sub: any) => sub.slug === subCategorySlug.toLowerCase() && sub.isActive
    );

    if (!subCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // 3. Find Products
    const products = await Product.find({
      categoryId: category._id,
      subCategory: subCategory.slug,
      isActive: true,
    }).populate("categoryId", "name slug");

    return res.json({
      category: {
        name: category.name,
        slug: category.slug,
      },
      subCategory: {
        name: subCategory.name,
        slug: subCategory.slug,
      },
      products,
    });
  } catch (err) {
    console.error("Get Products by SubCategory Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

