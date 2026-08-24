import { Schema, model, models } from "mongoose";

export const USER_ROLES = ["user", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export type UserDocument = {
  _id: string;
  fullName: string;
  phone: string;
  email?: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<UserDocument>(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    email: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, default: "user", required: true },
  },
  { timestamps: true }
);

export const User = models.User || model<UserDocument>("User", userSchema);
