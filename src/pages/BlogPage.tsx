import { motion } from 'framer-motion';
import { Terminal, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogs as fallbackBlogs } from '../data/blogs';
import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';

export const BlogPage = () => {
  const [blogs, setBlogs] = useState(fallbackBlogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const query = `*[_type == "post"] | order(date desc) {
          title, "slug": slug.current, excerpt, date, readTime, category
        }`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setBlogs(data);
        }
      } catch(err) {
        console.error("Sanity blog fetch failed:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="py-32 bg-slate-950 min-h-screen relative overflow-hidden">
        {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center flex flex-col items-center"
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-6">
                <Terminal size={16} className="text-blue-400" />
                <span className="text-blue-300 font-mono text-sm tracking-widest uppercase">
                  System Logs & Architecture Notes
                </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold font-header tracking-tight text-white leading-tight mb-6">
               Engineering Thoughts.
            </h2>
            <p className="text-slate-400 text-lg md:text-xl font-light max-w-2xl">
                Essays on software architecture, building scalable SaaS, and avoiding the pitfalls of generic templates.
            </p>
        </motion.div>

        <div className="space-y-8">
            {blogs.map((post, index) => (
                <motion.article 
                    key={post.slug}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-10 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500 overflow-hidden"
                >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-mono">
                            <span className="px-3 py-1 bg-slate-950 text-blue-400 rounded-full border border-slate-800">
                                {post.category}
                            </span>
                            <span className="text-slate-500">
                                {post.date}
                            </span>
                            <span className="text-slate-700 hidden sm:block">•</span>
                            <span className="text-slate-500 flex items-center gap-1.5">
                                <FileText size={14} /> {post.readTime}
                            </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold font-header text-white mb-4 group-hover:text-blue-300 transition-colors">
                            {post.title}
                        </h3>

                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            {post.excerpt}
                        </p>

                        <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-blue-400 font-semibold group/btn hover:text-white transition-colors uppercase tracking-wide text-sm mt-4">
                            Read Article 
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.article>
            ))}
        </div>
      </div>
    </section>
  );
};
