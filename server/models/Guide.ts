import { Schema, model, models } from "mongoose";

const guideSchema = new Schema(
  {
    category: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    intro: { type: String, required: true, trim: true },
    heading: { type: String, trim: true },
    bullets: [{ type: String }],
    footer: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Guide = models.Guide || model("Guide", guideSchema);
