import { Request, Response } from "express";
import cloudinary from "../config/cloudinary.js";
import Video from "../models/Video.js";
import { Readable } from "stream";

// Helper to upload video to Cloudinary from buffer
const uploadVideoToCloudinary = (buffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder: "yodhafoods/videos",
        eager: [{ width: 720, height: 1280, crop: "fill" }],
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload failed"));
        resolve(result);
      }
    );
    Readable.from(buffer).pipe(stream);
  });
};

// Create a new video
export const createVideo = async (req: Request, res: Response) => {
  try {
    const { title, description, productId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Video required" });
    }

    // Use stream upload instead of file path
    const upload = await uploadVideoToCloudinary(req.file.buffer);

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
