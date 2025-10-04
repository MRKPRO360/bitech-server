import { model, Schema } from 'mongoose';
import { BlogModel, IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog, BlogModel>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    blogImage: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

blogSchema.statics.isBlogExistsById = async (id: string) => {
  return await Blog.findById(id);
};

const Blog = model<IBlog, BlogModel>('Blog', blogSchema);

export default Blog;
