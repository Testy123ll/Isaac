import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import {
  Home,
  LayoutGrid,
  AlignLeft,
  Wrench,
  User,
  Mail,
  Sun,
  Moon,
  ArrowUpRight,
} from "lucide-react";

const navItems = [
  { icon: Home,       label: "Home",      path: "/",          id: "home" },
  { icon: LayoutGrid, label: "Portfolio", path: "/portfolio", id: "portfolio" },
  { icon: AlignLeft,  label: "Blog",      path: "/blog",      id: "blog" },
  { icon: Wrench,     label: "Services",  path: "/#services", id: "services" },
  { icon: User,       label: "About",     path: "/#about",    id: "about" },
  { icon: Mail,       label: "Contact",   path: "/#contact",  id: "contact" },
];

export const NavigationBar = () => {
  const location = useLocation();
  const [isLight, setIsLight] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setIsLight(true);
      document.documentElement.classList.add("light");
    }
  }, []);

  // Hide dock on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < lastScrollY || currentY < 60);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  const getActiveLabel = () => {
    const path = location.pathname;
    if (path === "/") return "Home";
    if (path.startsWith("/portfolio") && path !== "/portfolio") return "Case Study";
    if (path === "/portfolio") return "Portfolio";
    if (path.startsWith("/blog/")) return "Blog Post";
    if (path === "/blog") return "Blog";
    if (path === "/contact") return "Contact";
    return "Home";
  };

  const isActive = (item: typeof navItems[0]) => {
    if (item.path === "/") return location.pathname === "/";
    return (
      location.pathname.startsWith(item.path.split("#")[0]) &&
      item.path.split("#")[0] !== "/"
    );
  };

  return (
    <>
      {/* ── Fixed top-left logo ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-5 left-6 z-50"
      >
        <Link smooth to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 50"
            className="h-8 w-auto hover:opacity-80 transition-opacity"
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
      </motion.div>

      {/* ── Floating bottom dock ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">

        {/* Current page label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={getActiveLabel()}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto"
          >
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-800/90 backdrop-blur-md border border-slate-700/60 text-slate-200 text-sm font-medium shadow-lg">
              {getActiveLabel()}
              <ArrowUpRight size={13} className="opacity-60" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Main dock pill */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="pointer-events-auto flex items-center gap-1 px-4 py-3 rounded-[2rem] bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <div
                key={item.id}
                className="relative flex items-center"
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredId === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.92 }}
                      transition={{ duration: 0.15 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium whitespace-nowrap pointer-events-none shadow-lg"
                    >
                      {item.label}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link smooth to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.92 }}
                    className={`relative w-11 h-11 flex items-center justify-center rounded-2xl transition-colors duration-200 cursor-pointer ${
                      active
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/70"
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.6} />
                    {active && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400"
                      />
                    )}
                  </motion.div>
                </Link>
              </div>
            );
          })}

          {/* Divider */}
          <div className="w-px h-6 bg-slate-700/80 mx-1" />

          {/* Theme toggle */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredId("theme")}
            onMouseLeave={() => setHoveredId(null)}
          >
            <AnimatePresence>
              {hoveredId === "theme" && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium whitespace-nowrap pointer-events-none shadow-lg"
                >
                  {isLight ? "Dark mode" : "Light mode"}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-11 h-11 flex items-center justify-center rounded-2xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 transition-colors duration-200"
            >
              <AnimatePresence mode="wait">
                {isLight ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={20} strokeWidth={1.6} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={20} strokeWidth={1.6} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
};
