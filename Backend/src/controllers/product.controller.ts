import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

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
    const {
      name, description, price, discountPrice, categoryId, stock,
      isActive, isFeatured, tags, attributes, seo
    } = req.body;

    // Resolve category
    let resolvedCategoryId: mongoose.Types.ObjectId;

    // Check if categoryId is a valid ObjectId
    if (mongoose.isValidObjectId(categoryId)) {
      const cat = await Category.findById(categoryId);
      if (!cat) return res.status(404).json({ message: "Category not found" });
      resolvedCategoryId = cat._id as mongoose.Types.ObjectId;
    } else {
      // Try slug lookup
      const cat = await Category.findOne({ slug: categoryId.toLowerCase() });
      if (!cat) return res.status(404).json({ message: "Category not found" });
      resolvedCategoryId = cat._id as mongoose.Types.ObjectId;
    }

    // Handle Image Uploads
    // Handle Image Uploads
    let images: { url: string; public_id: string }[] = [];
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const uploadPromises = (req.files as Express.Multer.File[]).map(file =>
        uploadToCloudinary(file.buffer)
      );
      const results = await Promise.all(uploadPromises);
      results.forEach(res => images.push({ url: res.secure_url, public_id: res.public_id }));
    } else if (req.body.images) {
      // If images sent as JSON (e.g. from frontend direct upload)
      if (Array.isArray(req.body.images)) {
        images = req.body.images;
      } else if (typeof req.body.images === 'string') {
        // Fallback for single image string (optional, but good for robustness)
        images.push({ url: req.body.images, public_id: 'external_' + Date.now() });
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      discountPrice,
      categoryId: resolvedCategoryId,
      stock,
      isActive,
      isFeatured,
      images,
      tags: tags || [],
      attributes: attributes || {},
      seo
    });

    await product.populate("categoryId", "name slug");

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err: any) {
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
    const body = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Resolve Category if provided
    if (body.categoryId) {
      if (mongoose.isValidObjectId(body.categoryId)) {
        // Verify existence
        const cat = await Category.findById(body.categoryId);
        if (!cat) return res.status(404).json({ message: "Category not found" });
        product.categoryId = cat._id as mongoose.Types.ObjectId;
      } else {
        const cat = await Category.findOne({ slug: body.categoryId.toLowerCase() });
        if (!cat) return res.status(404).json({ message: "Category not found by slug" });
        product.categoryId = cat._id as mongoose.Types.ObjectId;
      }
    }

    // Handle New Image Uploads (Append to existing)
    if (req.files && Array.isArray(req.files)) {
      const uploadPromises = (req.files as Express.Multer.File[]).map(file =>
        uploadToCloudinary(file.buffer)
      );
      const results = await Promise.all(uploadPromises);
      results.forEach(res => product.images.push({ url: res.secure_url, public_id: res.public_id }));
    }

    // Update fields
    if (body.name) product.name = body.name;
    if (body.description !== undefined) product.description = body.description;
    if (body.price !== undefined) product.price = body.price;
    if (body.discountPrice !== undefined) product.discountPrice = body.discountPrice;
    if (body.stock !== undefined) product.stock = body.stock;
    if (body.isActive !== undefined) product.isActive = body.isActive;
    if (body.isFeatured !== undefined) product.isFeatured = body.isFeatured;
    if (body.tags) product.tags = body.tags;
    if (body.attributes) product.attributes = body.attributes;
    if (body.seo) product.seo = body.seo;

    await product.save();
    await product.populate("categoryId", "name slug");

    return res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (err: any) {
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
      const deletePromises = product.images.map(img => {
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
          return res.json({
            products: [],
            pagination: { total: 0, page, totalPages: 0 }
          });
        }
        catId = cat._id;
      }
      filter.categoryId = catId;
    }

    let sortOption: any = { createdAt: -1 };
    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };

    const [products, total] = await Promise.all([
      Product.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sortOption)
        .select("-attributes -seo") // lightweight list
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
 * GET /api/products/:slug
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
    console.error("Get Product Error:", err);
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
