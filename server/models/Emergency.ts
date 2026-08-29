import { Schema, model, models } from "mongoose";

const emergencySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    number: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Emergency = models.Emergency || model("Emergency", emergencySchema);
