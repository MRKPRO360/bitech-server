import mongoose, { Schema } from 'mongoose';
import {
  IPrebuiltProject,
  IPrebuiltProjectImages,
  IPrebuiltProjectResult,
  PrebuiltProjectModel,
} from './prebuiltProject.interface';

const ImageSchema = new Schema<IPrebuiltProjectImages>(
  {
    thumbnail: {
      type: String,
    },
    gallery: {
      type: [String],
    },
  },
  { _id: false },
);

const ResultSchema = new Schema<IPrebuiltProjectResult>(
  {
    rating: {
      type: String,
    },
    pageLoadTime: {
      type: String,
    },
  },
  { _id: false },
);

const PrebuiltProjectSchema = new Schema<
  IPrebuiltProject,
  PrebuiltProjectModel
>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },

    budget: {
      type: String,
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'draft', 'archived'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    features: {
      type: [String],
      required: true,
    },
    shortDescription: {
      type: String,
    },
    fullDescription: {
      type: String,
    },
    technologies: {
      type: [String],
    },

    results: {
      type: ResultSchema,
    },
    images: {
      type: ImageSchema,
    },
    liveLink: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

PrebuiltProjectSchema.statics.isPrebuiltProjectExistsById = async function (
  id: string,
) {
  return await this.findById(id);
};
const PrebuiltProject = mongoose.model<IPrebuiltProject, PrebuiltProjectModel>(
  'PrebuiltProject',
  PrebuiltProjectSchema,
);

export default PrebuiltProject;
