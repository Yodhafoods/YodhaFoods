import mongoose, { Schema, Document, Types } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser extends Document {
  _id: Types.ObjectId;
  first_name: string;
  last_name?: string;
  email: string;
  Contact_number: string;
  password?: string;
  role: UserRole;
  verified: boolean;
  googleId?: string;
  resetPasswordToken ?: string;
  resetPasswordExpire ?: Date;
}

const userSchema = new Schema<IUser>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    Contact_number: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google Auth users

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    verified: { type: Boolean, default: false },
    googleId: { type: String }, // Add googleId field
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
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
