import mongoose, { Schema } from 'mongoose';
import {
  IProject,
  IProjectImages,
  IProjectResult,
  ProjectModel,
} from './project.interface';

const ImageSchema = new Schema<IProjectImages>(
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

const ResultSchema = new Schema<IProjectResult>(
  {
    conversionRate: {
      type: String,
    },
    pageLoadTime: {
      type: String,
    },
    mobileTraffic: {
      type: String,
    },
    customerSatisfaction: {
      type: String,
    },
  },
  { _id: false },
);

const ProjectSchema = new Schema<IProject, ProjectModel>(
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
    client: {
      type: String,
    },
    duration: {
      type: String,
    },
    completionDate: {
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
    shortDescription: {
      type: String,
    },
    fullDescription: {
      type: String,
    },
    technologies: {
      type: [String],
    },
    challenges: {
      type: [String],
    },
    solutions: {
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

ProjectSchema.statics.isProjectExistsById = async (id: string) =>
  await Project.findById(id);

const Project = mongoose.model<IProject, ProjectModel>(
  'Project',
  ProjectSchema,
);

export default Project;
