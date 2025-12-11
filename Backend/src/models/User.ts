import mongoose, { Schema, Document } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  verified: boolean;
  googleId?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google Auth users

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    verified: { type: Boolean, default: false },
    googleId: { type: String }, // Add googleId field
  },
  { timestamps: true }
);

// remove password when returning user
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
