import { Schema, model, models } from "mongoose";

const helpServiceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
    hours: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    verified: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const HelpService = models.HelpService || model("HelpService", helpServiceSchema);
