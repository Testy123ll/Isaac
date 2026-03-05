import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

export const NavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo element */}
          <Link smooth to="/" className="flex items-center gap-2 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 50"
              className="h-8 w-auto hover:opacity-80 transition-opacity"
            >
              <polygon
                points="10,25 20,5 40,5 50,25 40,45 20,45"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <polyline
                points="20,15 30,25 20,35"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="30"
                y1="25"
                x2="50"
                y2="25"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <text
                x="62"
                y="34"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontSize="26"
                fontWeight="800"
                fill="currentColor"
              >
                Blue<tspan fill="#2563EB">Stark</tspan>
              </text>
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (location.pathname === '/' && location.hash === link.path.replace('/', ''));
                return (
                  <Link
                    smooth
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-mono transition-colors ${
                      isActive
                        ? "text-blue-400"
                        : "text-slate-400 hover:text-blue-300"
                    }`}
                  >
                    <span className="text-slate-600 mr-1">//</span>
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <Link
              smooth
              to="/#contact"
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] border border-blue-500/50"
            >
              <span>Start a Project</span>
              <div className="absolute inset-0 rounded-full border border-white/20"></div>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-800/50 bg-slate-950/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (location.pathname === '/' && location.hash === link.path.replace('/', ''));
                return (
                  <Link
                    smooth
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-header font-medium transition-colors border-b border-slate-800/50 pb-4 ${
                      isActive
                        ? "text-blue-400"
                        : "text-slate-300 hover:text-blue-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                smooth
                to="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3 mt-4 text-sm font-semibold text-white bg-blue-600 rounded-full"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
