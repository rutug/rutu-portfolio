import BlogCard from "../components/Blogs";
import RevealFx from "../components/RevealFx";

const blogs = [
    {
      id: 1,
      title: "Understanding React Server Components",
      coverImage: "/blog/react-server.jpg",
      date: "April 12, 2024",
      category: "React",
      readTime: "5",
      excerpt: "An introduction to React Server Components and how they change the game...",
      content: `<p>Full blog content here...</p>
                <h2>Introduction</h2>
                <p> Excitement the first time we had a working prototype internally...
                Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...
                 </p>`,
      tags: ["react", "javascript", "web-development"]
    },
    {
        id: 2,
        title: "Understanding React Server Components",
        coverImage: "/blog/react-server.jpg",
        date: "April 12, 2024",
        category: "React",
        readTime: "5",
        excerpt: "An introduction to React Server Components and how they change the game...",
        content: `<p>Full blog content here...</p>
                  <h2>Introduction</h2>
                  <p> Excitement the first time we had a working prototype internally...
                  Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...
                   </p>`,
        tags: ["react", "javascript", "web-development"]
      },
      {
        id: 3,
        title: "Understanding React Server Components",
        coverImage: "/blog/react-server.jpg",
        date: "April 12, 2024",
        category: "React",
        readTime: "5",
        excerpt: "An introduction to React Server Components and how they change the game...",
        content: `<p>Full blog content here...</p>
                  <h2>Introduction</h2>
                  <p> Excitement the first time we had a working prototype internally...
                  Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...Excitement the first time we had a working prototype internally...
                   </p>`,
        tags: ["react", "javascript", "web-development"]
      },
];

function BlogPage() {
    return (
      <RevealFx>
        <div className="min-h-screen py-20 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-medium text-gray-200 mb-12 text-center">
              Blogs
            </h2>
            <BlogCard blogs={blogs} />
          </div>
        </div>
      </RevealFx>
    );
  }

export default BlogPage;