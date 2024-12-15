// src/models/Blog.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  coverImage: {
    type: String,
    required: [true, 'Cover image is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  tags: [{
    type: String
  }],
  readTime: {
    type: Number,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);