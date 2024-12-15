'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const BlogCard = ({ blogs }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedBlog ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedBlog]);

  return (
    <div className="flex flex-col space-y-8 max-w-3xl mx-auto">
      {blogs.map((blog) => (
        <motion.div
          key={blog.id}
          layoutId={`blog-${blog.id}`}
          onClick={() => setSelectedBlog(blog)}
          className="cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="rounded-lg border border-gray-700/50 backdrop-blur-sm bg-white/5 overflow-hidden h-full">
            <motion.div layoutId={`image-${blog.id}`} className="relative h-64">
              <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
            </motion.div>
            <motion.div layoutId={`content-${blog.id}`} className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-400">{blog.date}</span>
                {blog.category && (
                  <span className="px-2 py-1 text-xs rounded-full border border-gray-700/50 text-gray-300 bg-white/5">
                    {blog.category}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-medium text-gray-200 mb-3">{blog.title}</h3>
              <p className="text-gray-400 line-clamp-3">{blog.excerpt}</p>
            </motion.div>
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <motion.div
                layoutId={`blog-${selectedBlog.id}`}
                onClick={e => e.stopPropagation()}
                className="w-full max-w-4xl bg-gray-900 rounded-lg border border-gray-700/50 overflow-hidden max-h-[90vh] relative"
              >
                <div className="flex flex-col h-[90vh]">
                  <motion.div layoutId={`image-${selectedBlog.id}`} className="relative h-64 flex-shrink-0">
                    <Image src={selectedBlog.coverImage} alt={selectedBlog.title} fill className="object-cover" />
                  </motion.div>
                  <motion.div layoutId={`content-${selectedBlog.id}`} className="flex-1 overflow-y-auto p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm text-gray-400">{selectedBlog.date}</span>
                      {selectedBlog.category && (
                        <span className="px-2 py-1 text-sm rounded-full border border-gray-700/50 text-gray-300 bg-white/5">
                          {selectedBlog.category}
                        </span>
                      )}
                      {selectedBlog.readTime && (
                        <span className="text-sm text-gray-400">{selectedBlog.readTime} min read</span>
                      )}
                    </div>
                    <h2 className="text-2xl font-medium text-gray-200 mb-4">{selectedBlog.title}</h2>
                    <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
                    {selectedBlog.tags && (
                      <div className="flex flex-wrap gap-2 mt-6">
                        {selectedBlog.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 text-sm rounded-full border border-gray-700/50 text-gray-300 bg-white/5">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogCard;