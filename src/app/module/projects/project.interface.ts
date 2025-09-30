export interface Project {
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
  results?: {
    conversionRate?: string;
    pageLoadTime?: string;
    mobileTraffic?: string;
    customerSatisfaction?: string;
  };
  images?: {
    thumbnail?: string;
    gallery?: string[];
  };
  liveLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
