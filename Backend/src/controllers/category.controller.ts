import { Request, Response } from "express";
import Category from "../models/Category.js";

/** CREATE CATEGORY (Admin) */
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name, description });

    return res.status(201).json({
      message: "Category created",
      category,
    });
  } catch (err) {
    console.error("Create Category Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/** UPDATE CATEGORY */
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const updated = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json({
      message: "Category updated",
      category: updated,
    });
  } catch (err) {
    console.error("Update Category Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/** DELETE CATEGORY */
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne();

    return res.json({ message: "Category deleted" });
  } catch (err) {
    console.error("Delete Category Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/** GET ALL CATEGORIES */
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.json({ categories });
  } catch (err) {
    console.error("Get Categories Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/** GET CATEGORY BY SLUG */
export const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug;

    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json({ category });
  } catch (err) {
    console.error("Get Category Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
