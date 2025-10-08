import { Document, Model } from 'mongoose';

export interface IProjectResult {
  conversionRate?: string;
  pageLoadTime?: string;
  mobileTraffic?: string;
  customerSatisfaction?: string;
}

export interface IProjectImages {
  thumbnail?: string;
  gallery?: string[];
}

export interface IProject extends Document {
  title: string;
  slug: string;
  category?: string;
  client?: string;
  duration?: string;
  completionDate?: string;
  budget?: string;
  status?: 'completed' | 'in-progress' | 'draft' | 'archived';
  featured?: boolean;
  shortDescription?: string;
  fullDescription?: string;
  technologies?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: IProjectResult;
  images?: IProjectImages;
  liveLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

export interface ProjectModel extends Model<IProject> {
  isProjectExistsById: (id: string) => Promise<IProject | null>;
}
