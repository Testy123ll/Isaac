import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { projects as fallbackProjects, type Project } from '../data/projects';
import { client, urlFor } from '../lib/sanity';

const BASE_URL = 'https://blue-stark.vercel.app'; // Production URL for absolute links

export const CaseStudy = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      try {
        const query = `*[_type == "project" && slug.current == $slug][0]{
          title, "slug": slug.current, category, description, techStack, liveUrl, "imageUrl": imageUrl.asset, caseStudy
        }`;
        const data = await client.fetch(query, { slug });
        if (data) {
          setProject({
            ...data,
            imageUrl: data.imageUrl ? urlFor(data.imageUrl).url() : fallbackProjects.find(p => p.slug === slug)?.imageUrl || ''
          });
        } else {
          const foundProject = fallbackProjects.find(p => p.slug === slug);
          if (foundProject) setProject(foundProject);
        }
      } catch (err) {
        console.error("Sanity fetch failed, using fallback:", err);
        const foundProject = fallbackProjects.find(p => p.slug === slug);
        if (foundProject) setProject(foundProject);
      }
    };
    if (slug) fetchProject();
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-4xl font-bold mb-4 font-header">Project Not Found</h1>
        <p className="text-slate-400 mb-8">The case study you are looking for does not exist.</p>
        <Link to="/portfolio" className="text-blue-400 hover:text-white flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  const absoluteImageUrl = project.imageUrl.startsWith('http') ? project.imageUrl : `${BASE_URL}${project.imageUrl}`;

  return (
    <article className="bg-slate-950 min-h-screen pb-32">
        <Helmet>
            <title>{project.title} | BlueStark Case Study</title>
            <meta name="description" content={project.description} />
            <meta property="og:title" content={`${project.title} | BlueStark Case Study`} />
            <meta property="og:description" content={project.description} />
            <meta property="og:image" content={absoluteImageUrl} />
            <meta property="og:type" content="article" />
            <meta name="twitter:card" content="summary_large_image" />
        </Helmet>

        {/* Navigation / Header */}
        <div className="fixed top-0 left-0 right-0 p-6 md:p-8 z-50 pointer-events-none">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/portfolio" className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white hover:border-blue-500 transition-colors">
                    <ArrowLeft size={16} /> Back
                </Link>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-600/20">
                    Live Project <ArrowUpRight size={16} />
                </a>
            </div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 md:pt-48 pb-16 md:pb-24 px-6 overflow-hidden">
             {/* Techy background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
            
            <div className="container mx-auto max-w-4xl relative z-10 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-blue-700/30 bg-blue-900/20 text-blue-400 text-sm font-mono uppercase tracking-widest mb-6">
                       {project.category}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold font-header tracking-tight text-white mb-8 leading-tight">
                        {project.title}
                    </h1>
                    <p className="text-slate-400 text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {project.techStack.map((tech, i) => (
                          <span key={i} className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono text-sm">
                              {tech}
                          </span>
                      ))}
                    </div>
                </motion.div>
            </div>
        </section>

        {/* Hero Image */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl relative"
            >
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </motion.div>
        </section>

        {/* Case Study Content */}
        <section className="container mx-auto px-6 max-w-3xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="prose prose-invert prose-blue max-w-none space-y-16"
            >
                {/* Overview */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold font-header text-white flex items-center gap-4">
                        <span className="text-blue-500 font-mono text-xl">//_</span> The Challenge
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed font-light">
                        {project.caseStudy.overview}
                    </p>
                    <ul className="space-y-4 mt-6">
                        {project.caseStudy.challenges.map((challenge, i) => (
                            <li key={i} className="flex gap-4 items-start text-slate-400">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs text-slate-500 mt-1">
                                    0{i + 1}
                                </span>
                                <span className="leading-relaxed">{challenge}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Solutions */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold font-header text-white flex items-center gap-4">
                        <span className="text-blue-500 font-mono text-xl">//_</span> Engineered Solutions
                    </h2>
                    <div className="grid gap-6">
                        {project.caseStudy.solutions.map((solution, i) => (
                            <div key={i} className="p-6 md:p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
                                <p className="text-slate-300 leading-relaxed font-light">{solution}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold font-header text-white flex items-center gap-4">
                        <span className="text-blue-500 font-mono text-xl">//_</span> Final Results
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {project.caseStudy.results.map((result, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-blue-900/10 border border-blue-500/20 text-center flex flex-col items-center justify-center">
                                <p className="text-blue-100 font-medium leading-relaxed">{result}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </motion.div>
        </section>
        
        {/* Next Steps CTA */}
        <section className="container mx-auto px-6 max-w-4xl mt-32 text-center">
            <h2 className="text-4xl font-bold font-header text-white mb-6">Ready to upgrade your infrastructure?</h2>
            <p className="text-slate-400 text-lg mb-10">We engineer the tools that ambitious businesses use to scale.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-600/20">
                Start a New Project <ArrowUpRight size={20} />
            </Link>
        </section>
    </article>
  );
};
