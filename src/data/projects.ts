// @ts-ignore - Vite imaginary tools imports
import austinSmilesImg from '/austin-smiles.png?w=1200&format=webp';
// @ts-ignore
import eaasyreelsImg from '/eaasyreels.png?w=1200&format=webp';
// @ts-ignore
import blessedOlasImg from '/blessed-olas.png?w=1200&format=webp';

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  imageUrl: string;
  caseStudy: {
    overview: string;
    challenges: string[];
    solutions: string[];
    results: string[];
  };
}

export const projects: Project[] = [
  {
    slug: 'austin-elite-smiles',
    title: 'Austin Elite Smiles',
    category: 'Luxury Dental UX',
    description: 'A complete Website Audit & Redesign for a luxury dental clinic. By identifying UX friction—specifically treating high-ticket veneer leads like standard cleaning leads—I engineered a custom "Smart Triage" React modal and an immersive "Atmosphere Video" hero to significantly increase VIP conversions.',
    techStack: ['React', 'Site Audit', 'CRO', 'Tailwind CSS'],
    liveUrl: 'https://austin-smiles.vercel.app/',
    imageUrl: austinSmilesImg,
    caseStudy: {
      overview: 'Austin Elite Smiles handles high-ticket VIP patients. A thorough website audit revealed critical UX friction: the original site treated a $30,000 veneer lead identical to an $80 cleaning lead. This generic funnel caused massive drop-offs.',
      challenges: [
        'Generic funnel creating high friction for premium clients.',
        'High bounce rates due to an uninspiring visual atmosphere.',
        'No clear segregation between routine care and luxury cosmetic procedures.'
      ],
      solutions: [
        'Engineered a custom "Smart Triage" React modal that segments visitors based on their exact needs before presenting the booking calendar.',
        'Implemented an "Atmosphere Video" hero to immediately establish trust and luxury branding.',
        'Streamlined the conversion process specifically for high-ticket veneer leads.'
      ],
      results: [
        'Dramatically increased VIP conversion rates.',
        'Reduced bounce rate through instant visual engagement.',
        'Clean, actionable lead generation data provided to the clinic.'
      ]
    }
  },
  {
    slug: 'eaasyreels',
    title: 'Eaasyreels',
    category: 'Creator Platform',
    description: 'A high-performance, visually engaging portfolio built specifically for a videographer and content creator. Engineered with a sleek dark-mode aesthetic, the platform focuses on ultra-fast load times and seamless media playback without performance bottlenecks.',
    techStack: ['Next.js', 'Media Stream', 'Performance', 'Dark Mode'],
    liveUrl: 'https://eaasyreels.vercel.app/',
    imageUrl: eaasyreelsImg,
    caseStudy: {
      overview: 'Eaasyreels required a platform that matched the visual fidelity of their video content. A videographer\'s portfolio lives and dies by media performance, so ultra-fast load times and seamless playback were non-negotiable.',
      challenges: [
        'Balancing high-quality massive video assets with rapid page load speeds.',
        'Creating an interface that doesn\'t distract from the actual content.',
        'Ensuring perfectly smooth scrolling and media playback across all devices.'
      ],
      solutions: [
        'Built a custom dark-mode aesthetic that allows the vibrant video content to pop without UI distraction.',
        'Engineered a highly optimized media pipeline ensuring ultra-fast load times and lazy loading.',
        'Implemented seamless video playback components that perform flawlessly under heavy asset loads.'
      ],
      results: [
        'Sub-second load times despite heavy, uncompromised media files.',
        'A sleek, cinematic user experience matching the creator\'s brand.',
        'Higher engagement times as visitors seamlessly explore the video galleries.'
      ]
    }
  },
  {
    slug: 'blessed-olas',
    title: 'Blessed Olas',
    category: 'Modern Web App',
    description: 'A modern, conversion-optimized web application engineered for scalability. This project focused heavily on clean architectural principles, perfect mobile responsiveness, and an incredibly seamless user experience that guides visitors intuitively toward the primary call-to-action.',
    techStack: ['React', 'Clean Arch', 'Responsive', 'UX Design'],
    liveUrl: 'https://blessed-olas.vercel.app/',
    imageUrl: blessedOlasImg,
    caseStudy: {
      overview: 'Blessed Olas needed a completely modern web application that not only looked great but was architected for optimal conversions and seamless user traversal.',
      challenges: [
        'Lack of structural clarity leading to confused user journeys.',
        'Poor mobile optimization causing traffic drop-offs.',
        'A need for pure, scalable code architecture.'
      ],
      solutions: [
        'Prioritized clean architecture and maintainable code for extreme scalability.',
        'Engineered perfect mobile responsiveness, ensuring the application feels native on any device.',
        'Optimized the entire UX flow to guide visitors intuitively to the primary call-to-action.'
      ],
      results: [
        'Massively improved mobile conversion pipeline.',
        'A seamlessly smooth user experience free of structural friction.',
        'A resilient, maintainable codebase ready for future feature expansion.'
      ]
    }
  }
];
