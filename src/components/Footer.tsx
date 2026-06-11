import { motion } from "framer-motion";
import { HashLink as Link } from "react-router-hash-link";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUp,
  MessageCircle,
} from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-900 py-16 md:py-24 z-10 transition-colors duration-300">
      {/* Background soft grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Status */}
          <div className="flex flex-col gap-6">
            <Link smooth to="/" className="inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 50"
                className="h-7 w-auto text-white"
              >
                <polygon
                  points="10,25 20,5 40,5 50,25 40,45 20,45"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <polyline
                  points="20,15 30,25 20,35"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="30" y1="25" x2="50" y2="25"
                  stroke="#7c3aed"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <text
                  x="62" y="34"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontSize="26"
                  fontWeight="800"
                  fill="currentColor"
                >
                  Blue<tspan fill="#7c3aed">Stark</tspan>
                </text>
              </svg>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed font-light font-sans max-w-xs">
              Engineering premium, high-performance web applications and digital experiences for founders and growing businesses worldwide.
            </p>

            {/* Availability Indicator */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
                Available for New Projects
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-mono text-xs uppercase tracking-widest font-semibold border-l-2 border-blue-600 pl-3">
              Explore Sitemap
            </h4>
            <ul className="flex flex-col gap-3 font-mono text-sm">
              <li>
                <Link smooth to="/" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                  <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all">//</span> Home
                </Link>
              </li>
              <li>
                <Link smooth to="/portfolio" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                  <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all">//</span> Portfolio
                </Link>
              </li>
              <li>
                <Link smooth to="/blog" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                  <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all">//</span> Tech Blog
                </Link>
              </li>
              <li>
                <Link smooth to="/#services" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group flex">
                  <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all">//</span> Services
                </Link>
              </li>
              <li>
                <Link smooth to="/#about" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group flex">
                  <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all">//</span> About Me
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Communication Channels */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-mono text-xs uppercase tracking-widest font-semibold border-l-2 border-blue-600 pl-3">
              Direct Channels
            </h4>
            <div className="flex flex-col gap-4 font-sans text-sm">
              <a href="mailto:isaactestimony.dev@gmail.com" className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">Email Connection</p>
                  <p className="text-white font-medium text-xs break-all">isaactestimony.dev@gmail.com</p>
                </div>
              </a>

              <a href="https://wa.link/0cit50" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-green-500/50 hover:bg-slate-900 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-green-400 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">Instant Signal</p>
                  <p className="text-white font-medium text-xs">Chat on WhatsApp</p>
                </div>
              </a>
            </div>
          </div>

          {/* Column 4: Quick CTA */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-mono text-xs uppercase tracking-widest font-semibold border-l-2 border-blue-600 pl-3">
              Initiate Project
            </h4>
            <div className="flex flex-col gap-4">
              <p className="text-xs text-slate-400 leading-relaxed font-light font-sans">
                Have a project concept or detailed technical brief? Let's analyze parameters and build it together.
              </p>
              <Link
                smooth
                to="/#contact"
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 px-5 py-3 text-white font-bold text-center text-xs tracking-wider transition-all shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                <span>INITIATE PROTOCOL</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Separator line */}
        <div className="h-px bg-slate-900/80 w-full mb-8 border-t border-slate-900" />

        {/* Bottom sub-footer row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono">
          <div className="text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} BlueStark by Isaac Testimony. All rights reserved.
          </div>

          <div className="flex gap-4 items-center">
            {/* Social Icons row */}
            <div className="flex gap-4 mr-2">
              <a href="https://linkedin.com/in/isaac-testimony-b63243230" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-all" aria-label="LinkedIn">
                <Linkedin size={15} />
              </a>
              <a href="https://github.com/Testy123ll" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-all" aria-label="GitHub">
                <Github size={15} />
              </a>
              <a href="https://x.com/bluestark01" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-all" aria-label="Twitter">
                <Twitter size={15} />
              </a>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-300 font-medium rounded-lg shadow-md transition-all cursor-pointer font-sans"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} className="text-blue-400 animate-bounce" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};
