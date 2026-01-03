import { Request, Response } from "express";
import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

// Helper to upload to Cloudinary from buffer
const uploadToCloudinary = (buffer: Buffer): Promise<{ secure_url: string; public_id: string }> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "categories" },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload failed"));
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      }
    );
    Readable.from(buffer).pipe(stream);
  });
};

/** CREATE CATEGORY (Admin) */
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, isActive, sortOrder, seo } = req.body;

    // Check if category exists
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Category with this name already exists" });
    }

    let imageUrl: string | null = null;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    } else if (req.body.imageUrl || req.body.image) {
      // Accept image URL from frontend upload
      imageUrl = req.body.imageUrl || req.body.image;
    }

    // Parse seo if it's sent as a string (multipart/form-data often sends nested objects as strings)
    let parsedSeo = seo;
    if (typeof seo === 'string') {
      try {
        parsedSeo = JSON.parse(seo);
      } catch (e) {
        // ignore or handle error
      }
    }

    // Parse subCategories if sent as string
    let parsedSubCategories = req.body.subCategories;
    if (typeof parsedSubCategories === 'string') {
      try {
        parsedSubCategories = JSON.parse(parsedSubCategories);
      } catch (e) {
        // ignore
      }
    }

    const category = await Category.create({
      name,
      description,
      imageUrl,
      isActive: isActive === 'true' || isActive === true, // Handle string 'true' from form-data
      sortOrder: sortOrder ? Number(sortOrder) : 0,
      seo: parsedSeo,
      subCategories: parsedSubCategories || [],
    });

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    console.error("Create Category Error:", err);
    return res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : "Unknown error" });
  }
};

/** UPDATE CATEGORY */
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, isActive, sortOrder, seo } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    let imageUrl = category.imageUrl;

    if (req.file) {
      // proper cleanup: delete old image if exists (logic omitted for simplicity but highly recommended)
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    // Parse seo if needed
    let parsedSeo = seo;
    if (typeof seo === 'string') {
      try {
        parsedSeo = JSON.parse(seo);
      } catch (e) {
        // ignore
      }
    }

    // Parse subCategories if needed
    if (req.body.subCategories) {
      let parsedSubCategories = req.body.subCategories;
      if (typeof parsedSubCategories === 'string') {
        try {
          parsedSubCategories = JSON.parse(parsedSubCategories);
        } catch (e) {
          // ignore
        }
      }
      category.subCategories = parsedSubCategories;
    }

    // Update fields
    if (name) category.name = name;
    if (description !== undefined) category.description = description;
    if (imageUrl) category.imageUrl = imageUrl;
    // parentId removed
    if (isActive !== undefined) category.isActive = isActive === 'true' || isActive === true || isActive === '1';
    if (sortOrder !== undefined) category.sortOrder = Number(sortOrder);
    if (parsedSeo) category.seo = parsedSeo;

    await category.save(); // using save() triggers validation and pre-save hooks (like slug generation if name changed)

    return res.json({
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    console.error("Update Category Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/** DELETE CATEGORY */
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Optional: Delete image from Cloudinary here if you stored public_id
    await category.deleteOne();

    return res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Delete Category Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/** GET ALL CATEGORIES */
export const getCategories = async (req: Request, res: Response) => {
  try {
    const { isAdmin } = req.query;

    const query: any = {};
    // If not admin fetching, maybe show only active?
    // User requested "get for all", so probably public just wants active, or raw list.
    // Let's just return all for now, sorted by sortOrder and createdAt.

    // If we want hierarchical... for now plain list is fine.
    const categories = await Category.find(query)
      .sort({ sortOrder: 1, createdAt: -1 });

    return res.json({ categories });
  } catch (err) {
    console.error("Get Categories Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/** GET CATEGORY BY SLUG */
export const getCategoryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

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

/** ADD SUB-CATEGORY */
export const addSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    if (!name) return res.status(400).json({ message: "Subcategory name is required" });

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    // Check if subcategory slug already exists in this category
    const exists = category.subCategories.find((sub: any) => sub.slug === slug);
    if (exists) {
      return res.status(409).json({ message: "Subcategory with this name already exists in this category" });
    }

    category.subCategories.push({
      name,
      slug,
      description,
      isActive: isActive !== undefined ? isActive : true,
    });

    await category.save();

    return res.status(201).json({
      message: "Subcategory added successfully",
      category,
    });
  } catch (err) {
    console.error("Add Subcategory Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/** UPDATE SUB-CATEGORY */
export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const { id, slug } = req.params;
    const { name, description, isActive } = req.body;

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const subCategory = category.subCategories.find((sub: any) => sub.slug === slug);
    if (!subCategory) return res.status(404).json({ message: "Subcategory not found" });

    if (name) {
      subCategory.name = name;
      // Optionally update slug if name changes? 
      // Usually dangerous if products rely on slug, but let's update it for consistency if desired.
      // For now, let's keep slug static or strictly separate update.
      // Let's create a new slug if name changes
      const newSlug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
      if (newSlug !== subCategory.slug) {
        // Check collision
        const exists = category.subCategories.find((sub: any) => sub.slug === newSlug && sub !== subCategory);
        if (exists) return res.status(409).json({ message: "Subcategory name already in use" });
        subCategory.slug = newSlug;
      }
    }
    if (description !== undefined) subCategory.description = description;
    if (isActive !== undefined) subCategory.isActive = isActive;

    await category.save();

    return res.json({
      message: "Subcategory updated successfully",
      category,
    });
  } catch (err) {
    console.error("Update Subcategory Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/** REMOVE SUB-CATEGORY */
export const removeSubCategory = async (req: Request, res: Response) => {
  try {
    const { id, slug } = req.params;

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const originalLength = category.subCategories.length;
    category.subCategories = category.subCategories.filter((sub: any) => sub.slug !== slug);

    if (category.subCategories.length === originalLength) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    await category.save();

    return res.json({
      message: "Subcategory removed successfully",
      category,
    });
  } catch (err) {
    console.error("Remove Subcategory Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
