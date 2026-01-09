import mongoose, { Schema, Types, Document } from "mongoose";

export interface IVideo extends Document {
  title: string;
  description?: string;

  video: {
    url: string;
    publicId: string;
    duration: number;
  };

  thumbnail: {
    url: string;
    publicId: string;
  };

  productId: Types.ObjectId;

  isActive: boolean;
  createdAt: Date;
}

const VideoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },

    description: { type: String },

    video: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
      duration: { type: Number },
    },

    thumbnail: {
      url: { type: String },
      publicId: { type: String },
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Video =
  mongoose.models.Video ||
  mongoose.model<IVideo>("Video", VideoSchema);

export default Video;
