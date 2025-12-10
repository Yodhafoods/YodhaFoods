import { Request, Response } from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";

/**
 * POST /api/products
 * Admin: Create Product
 * Accepts category as either categoryId (ObjectId string) or categorySlug (string)
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, stock, images } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category required" });
    }

    // resolve category: allow passing slug or id
    let categoryId: mongoose.Types.ObjectId | null = null;
    if (mongoose.isValidObjectId(category)) {
      categoryId = new mongoose.Types.ObjectId(category);
    } else {
      // treat as slug
      const cat = await Category.findOne({ slug: (category as string).toLowerCase() });
      if (!cat) {
        return res.status(400).json({ message: "Category not found by slug" });
      }
      categoryId = cat._id;
    }

    const product = await Product.create({
      name,
      description,
      price,
      category: categoryId,
      stock: stock || 0,
      images: images || []
    });

    // populate category basic fields before returning
    await product.populate("category", "name slug");

    return res.status(201).json({
      message: "Product created",
      product,
    });
  } catch (err) {
    console.error("Create Product Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/products/:id
 * Admin: Update Product
 * Accepts category as id or slug (optional)
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = { ...req.body };

    // if category present, resolve to ObjectId
    if (body.category) {
      if (mongoose.isValidObjectId(body.category)) {
        body.category = new mongoose.Types.ObjectId(body.category);
      } else {
        const cat = await Category.findOne({ slug: (body.category as string).toLowerCase() });
        if (!cat) {
          return res.status(400).json({ message: "Category not found by slug" });
        }
        body.category = cat._id;
      }
    }

    const updated = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate("category", "name slug");

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({
      message: "Product updated",
      product: updated,
    });
  } catch (err) {
    console.error("Update Product Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/products/:id
 * Admin: Delete Product + Cloudinary cleanup
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Remove product images from Cloudinary
    for (const img of product.images) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await product.deleteOne();

    return res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete Product Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/products
 * Public: Paginated Products + Search + Category Filter (by slug or id)
 * Query params:
 *   page, limit, search, category (slug or id)
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 12, 100);
    const search = (req.query.search as string) || "";
    const categoryQuery = (req.query.category as string) || "";

    const filter: Record<string, any> = { isActive: true };

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (categoryQuery) {
      // if the provided category is a valid ObjectId, use it directly
      if (mongoose.isValidObjectId(categoryQuery)) {
        filter.category = new mongoose.Types.ObjectId(categoryQuery);
      } else {
        // otherwise treat as slug and lookup category
        const cat = await Category.findOne({ slug: categoryQuery.toLowerCase() });
        if (!cat) {
          // no matching category → return empty result
          return res.json({
            products: [],
            pagination: { total: 0, page, totalPages: 0 }
          });
        }
        filter.category = cat._id;
      }
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate("category", "name slug"),
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
 * Public: Get product by slug (slug still on product doc)
 */
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;

    const product = await Product.findOne({ slug }).populate("category", "name slug");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (err) {
    console.error("Get Product Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
