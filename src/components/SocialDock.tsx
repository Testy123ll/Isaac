import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Github, Linkedin, MessageCircle, Mail } from 'lucide-react';
import { useRef } from 'react';

const icons = [
  { id: 1, icon: Github, href: "https://github.com/Testy123ll" },
  { id: 2, icon: Linkedin, href: "https://www.linkedin.com/in/isaac-testimony-b63243230?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
  { id: 4, icon: Mail, href: "mailto:isaactestimony.dev@gmail.com" },
  { id: 5, icon: MessageCircle, href: "https://wa.link/0cit50" }
];

const DockIcon = ({ icon: Icon, href, mouseX }: { icon: any, href: string, mouseX: MotionValue }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.a 
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ width }}
        className="aspect-square rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700 flex items-center justify-center hover:bg-purple-600 transition-colors"
    >
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
    </motion.a>
  );
};

export const SocialDock = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-4 px-4 py-3 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800"
      >
        {icons.map((item) => (
             <DockIcon key={item.id} icon={item.icon} href={item.href} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  );
};
