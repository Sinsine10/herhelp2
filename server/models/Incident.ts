import { Schema, model, models } from "mongoose";

const incidentSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: false },
    steps: [
      {
        title: { type: String, required: true },
        body: { type: String, required: true },
      },
    ],
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Incident = models.Incident || model("Incident", incidentSchema);
