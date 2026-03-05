import mongoose, { Schema, model, models } from "mongoose";

const answersSchema = new Schema(
  {
    description: String,
    services: [String],
    customers: String,
    differentiation: String,
    hasLogo: Boolean,
    brandColors: String,
    stylePreference: String,
    competitors: [String],
    phone: String,
    instagram: String,
    website: String,
    notes: String,
  },
  { _id: false }
);

const generatedContentSchema = new Schema(
  {
    hero: { headline: String, subheadline: String },
    about: String,
    services: [{ title: String, description: String }],
    cta: String,
  },
  { _id: false }
);

const leadSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    businessName: { type: String, required: true },
    location: { type: String, required: true },
    businessType: {
      type: String,
      required: true,
      enum: ["local-service", "online-business", "personal-brand", "small-company"],
    },
    answers: { type: answersSchema, default: {} },
    generatedContent: { type: generatedContentSchema, default: null },
  },
  { timestamps: true }
);

export const Lead = models.Lead ?? model("Lead", leadSchema);
