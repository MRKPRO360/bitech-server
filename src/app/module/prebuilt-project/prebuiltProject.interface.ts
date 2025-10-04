import { Document, Model } from 'mongoose';

export interface IPrebuiltProjectResult {
  pageLoadTime?: string;
  rating?: string;
}

export interface IPrebuiltProjectImages {
  thumbnail?: string;
  gallery?: string[];
}

export interface IPrebuiltProject extends Document {
  title: string;
  slug: string;
  category?: string;

  budget?: string;
  status?: 'completed' | 'in-progress' | 'draft' | 'archived';
  features: string[];
  shortDescription?: string;
  fullDescription?: string;
  technologies?: string[];
  liveLink?: string;
  repoLink?: string; // GitHub/Bitbucket
  docsLink?: string; // Documentation
  version?: string; // "1.0.0"
  price: string;
  license?: string; // e.g. MIT, Commercial
  featured: boolean;
  results?: IPrebuiltProjectResult;
  images?: IPrebuiltProjectImages;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PrebuiltProjectModel extends Model<IPrebuiltProject> {
  isPrebuiltProjectExistsById: (id: string) => Promise<IPrebuiltProject | null>;
}
