// import { Model, ObjectId } from 'mongoose';
import { Model, Types } from 'mongoose';

export interface IBlog {
  title: string;
  content: string;
  blogImage: string;
  tag: string;
  author: Types.ObjectId;
  isDeleted?: boolean;
  authorEmail: string;
}

export interface BlogModel extends Model<IBlog> {
  isBlogExistsById: (id: string) => Promise<IBlog | null>;
}
