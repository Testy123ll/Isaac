import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogs as fallbackBlogs, type BlogPost as BlogPostType } from '../data/blogs';
import { supabase } from '../lib/supabase';

const BASE_URL = 'https://blue-stark.vercel.app'; // Production URL for absolute links

export const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setPost(data);
        } else {
          const foundPost = fallbackBlogs.find(b => b.slug === slug);
          if (foundPost) setPost(foundPost);
        }
      } catch (err) {
        console.error("Supabase fetch failed, using fallback:", err);
        const foundPost = fallbackBlogs.find(b => b.slug === slug);
        if (foundPost) setPost(foundPost);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-4xl font-bold mb-4 font-header">Article Not Found</h1>
        <p className="text-slate-400 mb-8">The blog post you are looking for does not exist.</p>
        <Link to="/blog" className="text-blue-400 hover:text-white flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  // Simple parser to render basic markdown for the sample post. 
  // In a real app, you might use 'react-markdown' or similar.
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold font-header text-white mt-12 mb-6">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl md:text-4xl font-bold font-header text-white mt-12 mb-6">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('**') && line.includes('**', 2)) {
          const parts = line.split('**');
          return <p key={index} className="text-lg leading-relaxed mb-6"><strong className="text-white font-semibold">{parts[1]}</strong>{parts[2]}</p>
      }
      if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
          const parts = line.split('**');
          if (parts.length > 2) {
            return <li key={index} className="text-lg leading-relaxed mb-4 ml-6 list-decimal"><strong className="text-white font-semibold">{parts[1]}</strong>{parts[2]}</li>
          }
          return <li key={index} className="text-lg leading-relaxed mb-4 ml-6 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
      }
      if (line.startsWith('- ')) {
          const parts = line.split('**');
          if (parts.length > 2) {
            return <li key={index} className="text-lg leading-relaxed mb-4 ml-6 list-disc"><strong className="text-white font-semibold">{parts[1]}</strong>{parts[2]}</li>
          }
          return <li key={index} className="text-lg leading-relaxed mb-4 ml-6 list-disc">{line.replace('- ', '')}</li>;
      }
      if (line.trim() === '') {
        return null;
      }
      return <p key={index} className="text-lg leading-relaxed mb-6">{line}</p>;
    });
  };

  const absoluteImageUrl = post.imageUrl.startsWith('http') ? post.imageUrl : `${BASE_URL}${post.imageUrl}`;

  return (
    <article className="bg-slate-950 min-h-screen pb-32">
        <Helmet>
            <title>{post.title} | BlueStark</title>
            <meta name="description" content={post.excerpt} />
            <meta property="og:title" content={`${post.title} | BlueStark`} />
            <meta property="og:description" content={post.excerpt} />
            <meta property="og:image" content={absoluteImageUrl} />
            <meta property="og:type" content="article" />
            <meta name="twitter:card" content="summary_large_image" />
        </Helmet>

        {/* Navigation Bar */}
        <div className="fixed top-0 left-0 right-0 p-6 z-50 pointer-events-none">
            <div className="container mx-auto max-w-[750px]">
                <Link to="/blog" className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white hover:border-blue-500 transition-colors">
                    <ArrowLeft size={16} /> Back to Articles
                </Link>
            </div>
        </div>

        {/* Hero Image */}
        <section className="w-full h-[50vh] min-h-[400px] relative">
            <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </section>

        {/* Content Container - 750px max width for optimal reading */}
        <section className="container mx-auto px-6 max-w-[750px] relative -mt-32 z-10">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-slate-400 mb-6">
                    <span className="px-3 py-1 rounded-full bg-blue-900/20 border border-blue-500/30 text-blue-400">
                        {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 border border-slate-800 rounded-full px-3 py-1 bg-slate-900/50">
                        <Calendar size={14} />
                        {post.date}
                    </div>
                    <div className="flex items-center gap-1.5 border border-slate-800 rounded-full px-3 py-1 bg-slate-900/50">
                        <Clock size={14} />
                        {post.readTime}
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-header text-white leading-tight mb-8 tracking-tight">
                    {post.title}
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-12 border-l-4 border-blue-500 pl-6 py-2">
                    {post.excerpt}
                </p>

                <div className="h-px w-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 mb-12" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-slate-300 font-light article-content"
            >
                {post.content.trim().startsWith('<') || post.content.includes('<p>') || post.content.includes('<h2>') ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose prose-invert max-w-none space-y-6 leading-relaxed" />
                ) : (
                  renderContent(post.content)
                )}
            </motion.div>
            
            {/* CTA */}
            <div className="mt-24 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-center">
                <h3 className="text-2xl font-bold font-header text-white mb-4">Want to build something similar?</h3>
                <p className="text-slate-400 mb-8">I build the websites that ambitious businesses use to scale.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20">
                    Hire Me <ArrowUpRight size={18} />
                </Link>
            </div>
        </section>
    </article>
  );
};
