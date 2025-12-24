import { Request, Response } from "express";
import cloudinary from "../config/cloudinary.js";
import Video from "../models/Video.js";


// Create a new video
export const createVideo = async (req: Request, res: Response) => {
  try {
    const { title, description, productId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Video required" });
    }

    const upload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "yodhafoods/videos",
      eager: [{ width: 720, height: 1280, crop: "fill" }],
    });

    const video = await Video.create({
      title,
      description,
      productId,
      video: {
        url: upload.secure_url,
        publicId: upload.public_id,
        duration: upload.duration,
      },
      thumbnail: {
        url: upload.secure_url.replace(".mp4", ".jpg"),
        publicId: upload.public_id,
      },
    });

    res.status(201).json({ video });
  } catch (error) {
    console.error("Video upload error", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get videos for kitchen page
export const getKitchenVideos = async (_req: Request, res: Response) => {
  const videos = await Video.find({ isActive: true })
    .populate("productId")
    .sort({ createdAt: -1 });

  res.json({ videos });
};
