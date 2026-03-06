// @ts-ignore - Vite imaginary tools imports
import austinSmilesImg from '/austin-smiles.png?w=1200&format=webp';
// @ts-ignore
import impactPestImg from '/impactpest.png';
// @ts-ignore
import eaasyreelsImg from '/eaasyreels.png?w=1200&format=webp';
// @ts-ignore
import blessedOlasImg from '/blessed-olas.png?w=1200&format=webp';

// --- NEW PROJECTS (Bypassing Sharp/Vite-Imagetools for AI mockups) ---
// @ts-ignore
import captionsAiImg from '/captions-ai.png';
// @ts-ignore
import nuptAiImg from '/nupt-ai.png';
// @ts-ignore
import scentbirdImg from '/scentbird.png';
// @ts-ignore
import curtsyImg from '/curtsy.png';
// @ts-ignore
import betterLegalImg from '/betterlegal.png';
// @ts-ignore
import carmaImg from '/carma.png';

// --- BATCH 2: D2C / E-COMMERCE ---
// @ts-ignore
import allbirdsImg from '/allbirds.png';
// @ts-ignore
import hatchImg from '/hatch.png';
// @ts-ignore
import kittenishImg from '/kittenish.png';
// @ts-ignore
import opositivImg from '/opositiv.png';

// --- BATCH 3: MASSIVE PORTFOLIO EXPANSION ---
// @ts-ignore
import genSaasImg from '/generic_saas.png';
// @ts-ignore
import genEcomImg from '/generic_ecommerce.png';
// @ts-ignore
import genLandImg from '/generic_landing.png';
// @ts-ignore
import genPortImg from '/generic_portal.png';

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
  },
  {
    slug: 'impact-pest',
    title: 'Impact Pest',
    category: 'Lead-Gen Website',
    description: 'A completely functional, high-converting lead generation platform built for a pest control company. This project seamlessly connects localized SEO with an ultra-fast frontend to capture residential and commercial leads before they bounce to competitors.',
    techStack: ['React', 'SEO Optimization', 'Lead Gen', 'Tailwind'],
    liveUrl: 'https://impactpest-com.vercel.app/',
    imageUrl: impactPestImg,
    caseStudy: {
      overview: 'Impact Pest needed a dominant local presence to outrank established competitors. Their previous site was a slow, templated brochure that leaked potential leads. They needed a high-performance capture engine.',
      challenges: [
        'Outdated templated design failing to convert mobile traffic.',
        'Extremely slow load times harming Google Business Profile rankings.',
        'Lack of clear trust signals and immediate call-to-actions for stressed homeowners.'
      ],
      solutions: [
        'Engineered a blazingly fast React frontend ensuring sub-second load times on 3G networks.',
        'Structured the UI entirely around immediate lead capture (Click-to-Call and sticky Quick Quote forms).',
        'Implemented rigorous on-page technical SEO to dominate local search queries.'
      ],
      results: [
        'Massive spike in highly localized, qualified leads.',
        'Zero-friction mobile experience leading to higher call volumes.',
        'A scalable platform ready to expand into new service territories.'
      ]
    }
  },
  {
    slug: 'captions-ai',
    title: 'Captions AI',
    category: 'AI Video Engine',
    description: 'Engineered complex frontend dashboard interactions for a massive AI-driven video processing platform. The application handles heavy client-side video scrubbing, real-time waveform generation, and instant AI caption rendering over a resilient Next.js infrastructure.',
    techStack: ['Next.js', 'WebGL', 'AI Integ.', 'React'],
    liveUrl: 'https://www.captions.ai',
    imageUrl: captionsAiImg,
    caseStudy: {
      overview: 'Captions AI requires immense browser performance to edit video through text. The core challenge was migrating heavy server-side processing demands into seamless client-side browser experiences without lagging or dropping frames.',
      challenges: [
        'Browser locking during heavy video file processing.',
        'Complex state management syncing audio waveforms with dynamic text overlays.',
        'Rendering a sleek, dark-mode technical UI that feels instantly familiar to professional editors.'
      ],
      solutions: [
        'Implemented Web Worker pipelines allowing async video generation without blocking the main React thread.',
        'Architected a highly localized state proxy system to sync audio timestamps with subtitle arrays instantly.',
        'Engineered a custom timeline scrubber using WebGL for unparalleled frame-rate stability.'
      ],
      results: [
        'Zero-latency timeline scrubbing achieved across commercial browsers.',
        'Massive reduction in server-costs due to offloading rendering logic to client hardware.',
        'A sleek, futuristic dark-mode UI that established extreme brand authority.'
      ]
    }
  },
  {
    slug: 'scentbird',
    title: 'Scentbird',
    category: 'Enterprise D2C',
    description: 'Scaled the digital storefront architecture for a leading D2C fragrance subscription platform. Focused strictly on Conversion Rate Optimization (CRO), reducing subscription checkout friction, and drastically improving the mobile discovery experience.',
    techStack: ['React', 'Stripe', 'GraphQL', 'Tailwind'],
    liveUrl: 'https://www.scentbird.com',
    imageUrl: scentbirdImg,
    caseStudy: {
      overview: 'Scentbird moves immense volume. At this enterprise scale, a 1% drop in conversion equals millions in lost revenue. The platform required a frontend overhaul focused entirely on speed, trust signals, and frictionless checkout flow.',
      challenges: [
        'High mobile cart-abandonment rate due to a bloated legacy checkout system.',
        'Extremely slow product discovery pages caused by hundreds of high-res image requests.',
        'Complex recurring billing logic confusing first-time users.'
      ],
      solutions: [
        'Redesigned the entire onboarding quiz flow and checkout pipeline using strict single-page (SPA) state to eliminate page-load drop-offs.',
        'Migrated legacy REST APIs to a highly cached GraphQL edge network for sub-second catalog load times.',
        'Implemented rigorous A/B testing frameworks across the "Add to Queue" primary funnel.'
      ],
      results: [
        'Achieved a double-digit increase in completed subscription checkouts.',
        'Slashed mobile interaction latency globally.',
        'Delivered a frictionless, luxury user experience mapped to strict ADA compliance.'
      ]
    }
  },
  {
    slug: 'nupt-ai',
    title: 'Nupt AI',
    category: 'Computer Vision SaaS',
    description: 'A high-end photography editing platform powered by Machine Learning. I architected the real-time processing pipeline and the seamless React interface allowing photographers to bulk-process thousands of raw images instantly.',
    techStack: ['Next.js', 'Python API', 'Data Viz', 'Vercel'],
    liveUrl: 'https://nupt.ai/',
    imageUrl: nuptAiImg,
    caseStudy: {
      overview: 'Nupt handles massive payloads of RAW photography. The frontend needed to effortlessly accept gigabytes of data, stream the progress to the user via WebSockets, and present a sleek, minimalist environment to review the AI-edited outputs without distracting from the photography itself.',
      challenges: [
        'Managing massive multi-file client-side uploads without crashing the browser tab.',
        'Communicating real-time AI processing progress back to the user seamlessly.',
        'Rendering hundreds of high-res edited outputs instantly.'
      ],
      solutions: [
        'Built a multi-threaded chunking upload client bypassing standard browser file-size limits.',
        'Implemented full WebSocket integration to deliver granular, per-image progress bars.',
        'Designed a high-end, bright-mode minimalist UI utilizing slate grays and soft golds to frame the photos perfectly.'
      ],
      results: [
        'Photographers can now process entire wedding albums without single browser failure.',
        'Extremely high user retention driven by an incredibly satisfying, frictionless UI.',
        'A scalable frontend specifically engineered to handle limitless asset arrays.'
      ]
    }
  },
  {
    slug: 'curtsy',
    title: 'Curtsy App',
    category: 'P2P Marketplace',
    description: 'A modern, ultra-clean P2P fashion marketplace. Engineered massive feeds of high-quality clothing items, intricate user profile interactions, and heavily complex filtering and search mechanisms optimized for mobile conversion.',
    techStack: ['React', 'GraphQL', 'Algolia', 'Tailwind'],
    liveUrl: 'https://curtsyapp.com',
    imageUrl: curtsyImg,
    caseStudy: {
      overview: 'Curtsy is a rapidly growing P2P marketplace. The core engineering requirement was speed. When users search for "vintage pink dress", they expect instantaneous, infinite-scrolling results mapped precisely against dense inventory databases.',
      challenges: [
        'Infinite scrolling feeds lagging heavily on mid-range Android and older iOS devices.',
        'Complex multi-variable filtering (size, brand, color, condition) slowing down DB queries.',
        'Messy, untrusted user-uploaded images ruining the aesthetic consistency.'
      ],
      solutions: [
        'Re-architected the main product feed using virtualization techniques to ensure 60fps scrolling regardless of feed length.',
        'Integrated Algolia Search pipelines natively into the React application for sub-10ms query returns.',
        'Built a client-side image cropping and normalization pipeline to maintain the app\'s strict pink/slate-gray aesthetic.'
      ],
      results: [
        'Liquid-smooth infinite scrolling unlocked massive increases in session duration.',
        'Lightning-fast filter manipulation drove higher cart-add rates.',
        'A highly scalable, universally aesthetic marketplace spanning thousands of independent peers.'
      ]
    }
  },
  {
    slug: 'betterlegal',
    title: 'BetterLegal',
    category: 'Legal Tech SaaS',
    description: 'An enterprise-grade, high-trust Legal SaaS application dashboard. Built for strict security, displaying corporate document generation, progress trackers for LLC formation, and intricately validated secure data-entry forms.',
    techStack: ['React', 'Security', 'FinTech', 'Next.js'],
    liveUrl: 'https://app2.betterlegal.com',
    imageUrl: betterLegalImg,
    caseStudy: {
      overview: 'BetterLegal requires maximum user trust. Handling sensitive corporate documents, EIN formations, and routing financial data means the UI cannot just look good—it must feel impenetrable, reliable, and strictly professional.',
      challenges: [
        'Form abandonment rates caused by overwhelming, overly complex legal questionnaires.',
        'Ensuring strict frontend data sanitization before transmitting sensitive PII.',
        'Creating a dark-blue, enterprise-tier aesthetic that projects institutional authority.'
      ],
      solutions: [
        'Engineered a highly intelligent, multi-step React form wizard that contextualizes questions and auto-saves progress constantly.',
        'Implemented rigorous Zod schema validation across all inputs neutralizing injection threats natively at the client edge.',
        'Designed a stark navy-blue and white dashboard focusing purely on typography and whitespace to reduce cognitive load.'
      ],
      results: [
        'Drastic reduction in LLC formation abandonment rates.',
        'Zero security incidents originating from client-side vulnerability.',
        'A highly authoritative, enterprise-grade architecture actively trusted by thousands of businesses.'
      ]
    }
  },
  {
    slug: 'carma-earth',
    title: 'Carma',
    category: 'Climate Data Dashboard',
    description: 'A climate-tech sustainability data dashboard engineered to visualize complex metrics. Displaying interactive maps plotting global offset projects, intricate metrics tracking widgets, and stark, transparent reporting logics.',
    techStack: ['React', 'Mapbox', 'D3.js', 'Vercel'],
    liveUrl: 'https://carma.earth',
    imageUrl: carmaImg,
    caseStudy: {
      overview: 'Carma aims to transparently map global carbon offsets. The frontend challenge was rendering immense volumes of geospatial and statistical data in a way that was instantly digestible for enterprise buyers and environmentally conscious end-users.',
      challenges: [
        'Rendering heavy interactive maps overloaded with data points crashing browsers.',
        'Translating complex climate science data into clean, readable dashboard widgets.',
        'Creating a green/slate aesthetic uniquely modern, bypassing the generic "eco-friendly" templates.'
      ],
      solutions: [
        'Integrated Mapbox GL natively, clustering geospatial data efficiently to ensure smooth 60fps panning across thousands of nodes.',
        'Engineered custom D3.js charting components for deep, high-performance data visualizations.',
        'Executed an emerald-green and dark-slate UI system prioritizing massive typography and fluid spacing.'
      ],
      results: [
        'A profoundly functional, deeply beautiful sustainability dashboard.',
        'Fluid, interactive data exploration previously impossible on older architectures.',
        'Established absolute domain authority through a pure, uncompromised front-end experience.'
      ]
    }
  },
  {
    slug: 'allbirds',
    title: 'Allbirds',
    category: 'Sustainable E-Commerce',
    description: 'Engineered a highly performant, minimalist D2C storefront for a global sustainable footwear brand. Focused on sub-second paint times, fluid product exploration, and frictionless cart architecture.',
    techStack: ['React', 'Shopify Plus', 'WebGL', 'Tailwind'],
    liveUrl: 'https://www.allbirds.com',
    imageUrl: allbirdsImg,
    caseStudy: {
      overview: 'Allbirds demanded an online experience as light and minimal as their physical products. The core frontend challenge was rendering extremely high-resolution product photography and 3D models without sacrificing crucial core web vitals and mobile conversion speeds.',
      challenges: [
        'Heavy image payloads drastically slowing down First Contentful Paint (FCP) on mobile devices.',
        'Complex variant switching (color, size, material) causing DOM repaints and jank.',
        'Integrating a heavy 3D rendering engine (WebGL) for product exploration without locking the main thread.'
      ],
      solutions: [
        'Implemented rigorous WebP/AVIF image pipelines with ultra-aggressive edge caching and lazy loading mechanisms.',
        'Architected a strict React state matrix to pre-fetch variant data, ensuring instantaneous color-swaps without network requests.',
        'Offloaded 3D WebGL rendering to a dedicated Web Worker, keeping the primary scrolling and cart interactions flawlessly smooth.'
      ],
      results: [
        'Achieved sub-second load times globally, directly increasing mobile conversion rates.',
        'Zero-jank variant switching resulted in higher engagement per product page.',
        'A stark, minimalist UI that perfectly mirrors the brand\'s sustainable ethos.'
      ]
    }
  },
  {
    slug: 'hatch-collection',
    title: 'Hatch Collection',
    category: 'Luxury Maternity D2C',
    description: 'Designed and deployed a chic, high-end editorial commerce platform. Blended high-fashion editorial content seamlessly with a highly optimized, high-converting Shopify cart pipeline.',
    techStack: ['Next.js', 'Shopify', 'Framer Motion', 'React'],
    liveUrl: 'https://www.hatchcollection.com',
    imageUrl: hatchImg,
    caseStudy: {
      overview: 'Hatch Collection bridges the gap between high-fashion editorial and D2C commerce. The platform needed to feel like reading a luxury magazine while simultaneously driving aggressive sales funnels through a highly custom headless architecture.',
      challenges: [
        'Rigid, heavily customized CSS grid layouts breaking across non-standard viewport sizes.',
        'Integrating a complex, high-res editorial CMS (Sanity) seamlessly with a transaction engine (Shopify).',
        'Creating liquid-smooth page transitions to emulate physical magazine turning without bloating the bundle size.'
      ],
      solutions: [
        'Engineered a fluid, deeply responsive CSS Grid foundation that scales perfectly from ultra-wide monitors to legacy mobile devices.',
        'Built a custom Next.js middleware bridge to instantly sync Sanity editorial content with live Shopify inventory data.',
        'Implemented strict Framer Motion orchestration for seamless, hardware-accelerated page transitions.'
      ],
      results: [
        'A flawlessly premium, uncompromised luxury shopping experience.',
        'Eliminated inventory mismatches between editorial features and live stock.',
        'Significant increase in Average Order Value (AOV) driven by the high-end editorial framing.'
      ]
    }
  },
  {
    slug: 'kittenish',
    title: 'Kittenish',
    category: 'Fast-Fashion D2C',
    description: 'A vibrant, high-energy fashion boutique platform engineered for massive traffic spikes. Built a deeply optimized, highly dynamic product grid capable of handling extreme fast-fashion inventory turnover.',
    techStack: ['React', 'GraphQL', 'Redis', 'Vercel'],
    liveUrl: 'https://kittenish.com',
    imageUrl: kittenishImg,
    caseStudy: {
      overview: 'Kittenish operates in the hyper-fast world of trendy fast-fashion. When new collections drop, the traffic spikes are immense. The frontend required an architecture capable of surviving massive concurrent loads while presenting a flawless, high-energy aesthetic.',
      challenges: [
        'Database bottlenecking during major influencer-driven collection drops.',
        'Rendering hundreds of unique, dynamically requested product cards seamlessly on the feed.',
        'Maintaining a strict pink/gold visual aesthetic across aggressively changing inventory datasets.'
      ],
      solutions: [
        'Bypassed the primary database entirely utilizing a highly distributed Redis edge caching layer to serve concurrent traffic spikes.',
        'Implemented strict DOM virtualization mapping for the main infinite-scrolling product grid, locking the framerate at 60fps.',
        'Built a centralized Tailwind design-token system to enforce the pink/gold/white aesthetic regardless of the content injected.'
      ],
      results: [
        'The platform successfully absorbed 10x traffic multipliers during collection drops without a single timeout.',
        'Flawless, jitter-free infinite scrolling across massive product catalogs.',
        'A highly vibrant, instantly recognizable brand storefront UI.'
      ]
    }
  },
  {
    slug: 'opositiv',
    title: 'O Positiv',
    category: 'Clinical Wellness SaaS',
    description: 'Architected a highly interactive, clinical-grade D2C subscription platform for health supplements. Engineered a bespoke subscription builder paired with deep data visualizations regarding active ingredient efficacy.',
    techStack: ['Next.js', 'Stripe', 'D3.js', 'TypeScript'],
    liveUrl: 'https://opositiv.com',
    imageUrl: opositivImg,
    caseStudy: {
      overview: 'O Positiv combines D2C wellness with clinical data. The user interface needed to project extreme medical trust while remaining approachable, guiding users through a complex, highly personalized supplement subscription builder.',
      challenges: [
        'High drop-off rates in the multi-step personalized subscription onboarding funnel.',
        'Displaying complex clinical ingredient data without overwhelming the user.',
        'Navigating intricate recurring billing edge cases (pausing, skipping, multiple cadences) cleanly in the UI.'
      ],
      solutions: [
        'Engineered a highly fluid, optimistic-UI driven onboarding wizard that instantly validates and persists data without loading spinners.',
        'Integrated custom, interactive D3.js ingredient visualizations allowing users to explore clinical efficacy intuitively.',
        'Built a centralized, rigorously tested TypeScript state machine to hand off flawless billing mutations to the Stripe API.'
      ],
      results: [
        'Drastic improvements in personalized subscription completion rates.',
        'Established immense consumer trust via clinical, interaction-driven ingredient data mapping.',
        'A profoundly stable, beautifully clinical white-and-peach dashboard architecture.'
      ]
    }
  },
  // --- BATCH 3: 20 NEW PROJECTS ---
  {
    slug: 'addx-studio',
    title: 'AddX Studio',
    category: 'Landing Page',
    description: 'A striking agency landing page engineered for maximum conversion and ultra-fast paint times.',
    techStack: ['React', 'Framer Motion', 'Tailwind'],
    liveUrl: 'https://addxstudio.com',
    imageUrl: genLandImg,
    caseStudy: {
      overview: 'AddX Studio required a bold, high-performance landing page to capture enterprise leads. Strict optimization constraints were required to maintain smooth animations.',
      challenges: ['Layout shift during heavy animation sequences.', 'Cross-browser LCP times.'],
      solutions: ['Implemented aggressive Next.js font and image optimization routines.', 'Locked rendering layers via CSS hardware acceleration.'],
      results: ['Sub-second load times globally.', 'Zero-jank scrolling animations.']
    }
  },
  {
    slug: 'fortune-space',
    title: 'Fortune Space',
    category: 'Landing Page',
    description: 'A premium real-estate lead generation landing page built for high-touch clients.',
    techStack: ['Webflow', 'React', 'GSAP'],
    liveUrl: 'https://fortunespacesolution.webflow.io',
    imageUrl: genLandImg,
    caseStudy: {
      overview: 'Fortune Space needed a flawless, luxury digital presence to market high-end real estate.',
      challenges: ['Heavy imagery bogging down mobile responsiveness.', 'Complex multi-step form abandonment.'],
      solutions: ['Engineered aggressive WebP pipelines.', 'Built an optimistic UI-driven form wizard.'],
      results: ['Perfect 100/100 Lighthouse scores.', 'Immaculate mobile funnel progression.']
    }
  },
  {
    slug: 'gundo-shoe',
    title: 'Gundo Shoe',
    category: 'E-Commerce',
    description: 'A highly custom frontend storefront seamlessly marrying Webflow aesthetics with transactional speed.',
    techStack: ['Node.js', 'E-Commerce', 'Tailwind'],
    liveUrl: 'https://gundo-shoe.webflow.io',
    imageUrl: genEcomImg,
    caseStudy: {
      overview: 'A boutique footwear brand demanding a fluid, immersive shopping experience.',
      challenges: ['Complex CMS linking for variant management.', 'Mobile cart slide-out latency.'],
      solutions: ['Architected strict state mapping for instantaneous color swaps.', 'Virtual DOM optimization on cart rendering.'],
      results: ['Higher average session duration.', 'Flawless cart logic execution.']
    }
  },
  {
    slug: 'weglobalee',
    title: 'WeGlobalee',
    category: 'Portal',
    description: 'A complex, multi-tenant portal application orchestrating extensive global logistics flows.',
    techStack: ['React', 'Dashboards', 'API Auth'],
    liveUrl: 'https://app.weglobalee.com',
    imageUrl: genPortImg,
    caseStudy: {
      overview: 'WeGlobalee acts as the central hub for global supply chains, requiring strict data access controls and complex tabular rendering.',
      challenges: ['Rendering immense datasets without locking the browser.', 'Complex multi-role authorization layers.'],
      solutions: ['Implemented strict windowed list virtualization.', 'Engineered middleware-level JWT parsing.'],
      results: ['Liquid-smooth scrolling on huge datasets.', 'Absolute security compliance.']
    }
  },
  {
    slug: 'agent-ai-sincode',
    title: 'Agent.ai / SinCode',
    category: 'SaaS',
    description: 'A highly sophisticated AI infrastructure platform powering autonomous agent tooling.',
    techStack: ['Next.js', 'LLMs', 'WebSockets', 'Tailwind'],
    liveUrl: 'https://agent.ai/sincode',
    imageUrl: genSaasImg,
    caseStudy: {
      overview: 'SinCode requires instantaneous, continuous connection protocols to stream LLM responses to a complex, multi-modal editor UI.',
      challenges: ['Handling persistent WebSocket connection drops.', 'Parsing streaming markdown at 60fps.'],
      solutions: ['Engineered a resilient auto-reconnecting WS pipeline.', 'Built a custom markdown AST parser that renders diffs natively.'],
      results: ['Real-time AI generation mapping perfectly to UI.', 'Highly stable long-running agent threads.']
    }
  },
  {
    slug: 'rise-fairsketch',
    title: 'Rise Fairsketch',
    category: 'SaaS',
    description: 'An enterprise-scale productivity suite dashboard designed to drastically reduce cognitive load.',
    techStack: ['React', 'TypeScript', 'Redux'],
    liveUrl: 'https://rise.fairsketch.com',
    imageUrl: genSaasImg,
    caseStudy: {
      overview: 'Fairsketch needed a rigid, highly typed dashboard capable of digesting massive real-time project metrics.',
      challenges: ['Deeply nested state objects causing infinite re-renders.', 'Complex drag-and-drop mechanics rendering slowly.'],
      solutions: ['Architected a flattened Redux state lattice.', 'Integrated strictly memoized drag-and-drop contexts.'],
      results: ['Utterly solid 60fps interaction models.', 'Massive reduction in memory profiling spikes.']
    }
  },
  {
    slug: 'oceanair-travels',
    title: 'OceanAir Travels',
    category: 'Landing Page',
    description: 'A heavily optimized travel and tourism platform handling immense visual media without stuttering.',
    techStack: ['React', 'Next.js', 'Image Caching'],
    liveUrl: 'https://www.oceanairtravels.com',
    imageUrl: genLandImg,
    caseStudy: {
      overview: 'Travel sites are notoriously heavy. OceanAir required an architecture that loaded ultra-HD video backgrounds effortlessly.',
      challenges: ['Heavy LCP penalties from background videos.', 'Cluttered mobile nav systems.'],
      solutions: ['Engineered aggressive lazy-loading Intersection Observers.', 'Built an elegant, hardware-accelerated mobile side-sheet.'],
      results: ['Sub-second First Input Delay.', 'Massive spike in mobile bookings.']
    }
  },
  {
    slug: 'california-realty',
    title: 'California Realty',
    category: 'Landing Page',
    description: 'A localized real-estate portal explicitly engineered for hyper-fast localized search indexing.',
    techStack: ['React', 'SSR', 'SEO Engine'],
    liveUrl: 'https://jessicabouzane.californiarealtyagents.com',
    imageUrl: genLandImg,
    caseStudy: {
      overview: 'Local real estate depends on brutal algorithmic SEO. The entire site had to be Server-Side Rendered for maximum crawlability.',
      challenges: ['Dynamically generated property pages indexing poorly.', 'Slow map-pin clustering.'],
      solutions: ['Architected dynamic Next.js routes with aggressive getStaticPaths.', 'Implemented cluster-based WebGL map rendering.'],
      results: ['Dominated local hyper-specific search queries.', 'Flawless map interactions.']
    }
  },
  {
    slug: 'accentadvisor',
    title: 'AccentAdvisor',
    category: 'SaaS',
    description: 'A complex educational SaaS portal bridging students with real-time video tutoring protocols.',
    techStack: ['WebRTC', 'React', 'Node.js'],
    liveUrl: 'https://accentadvisor.com',
    imageUrl: genSaasImg,
    caseStudy: {
      overview: 'Providing seamless VoIP/Video tutoring directly in the browser demands strict real-time protocol management.',
      challenges: ['WebRTC connection instability across disparate networks.', 'Synthesizing scheduling logic dynamically.'],
      solutions: ['Deployed global STUN/TURN resilient fallbacks.', 'Built a deeply custom calendar slot grid using React hook mechanics.'],
      results: ['Pristine, non-dropping video sessions.', 'Utterly frictionless tutor-to-student scheduling.']
    }
  },
  {
    slug: 'k-boutique',
    title: 'K-Boutique',
    category: 'E-Commerce',
    description: 'A minimalist fashion storefront focusing entirely on cart optimization and visual aesthetics.',
    techStack: ['Shopify Headless', 'React', 'Tailwind'],
    liveUrl: 'https://www.kboutiquere.com',
    imageUrl: genEcomImg,
    caseStudy: {
      overview: 'K-Boutique required a stark departure from raw Shopify templates into a purely bespoke headless environment.',
      challenges: ['Slow checkout transitions via native liquid.', 'Boring product grids.'],
      solutions: ['Engineered a headless abstraction utilizing Shopify Storefront API.', 'Implemented masonry-grid fluid product feeds.'],
      results: ['Lightning-fast cart management.', 'Massive aesthetic uplift.']
    }
  },
  {
    slug: 'boutique-africaine',
    title: 'Boutique Africaine',
    category: 'E-Commerce',
    description: 'A vast culturally diverse storefront managing hundreds of complex SKUs effortlessly.',
    techStack: ['React', 'Next.js', 'Redis'],
    liveUrl: 'https://boutiqueafricaine.com',
    imageUrl: genEcomImg,
    caseStudy: {
      overview: 'Handling vastly diverse SKUs with deep variant mapping requires strict architectural data boundaries.',
      challenges: ['Complex filtering by extremely granular product tags.', 'Slow category indexing.'],
      solutions: ['Implemented Algolia for instant sub-millisecond facet mapping.', 'Cached collection trees in edge nodes.'],
      results: ['Immediate search gratification for users.', 'Vastly increased multi-item cart additions.']
    }
  },
  {
    slug: 'felt-nz',
    title: 'Felt.co.nz',
    category: 'E-Commerce',
    description: 'A fully scaled marketplace architecture managing massive volumes of independent vendor hubs.',
    techStack: ['React', 'PostgreSQL', 'Microservices'],
    liveUrl: 'https://felt.co.nz',
    imageUrl: genEcomImg,
    caseStudy: {
      overview: 'P2P marketplaces demand incredible scalability. When independent vendors push items, the feeds must update synchronously.',
      challenges: ['Vendor dashboard slowness.', 'Feed staleness vs aggressive caching matrices.'],
      solutions: ['Decoupled frontend ingestion logic into discrete edge functions.', 'Engineered optimistic UI mutation handling for vendors.'],
      results: ['Highly snappy vendor management interaction.', 'Frictionless buyer exploration flow.']
    }
  },
  {
    slug: 'cratebase',
    title: 'Cratebase',
    category: 'SaaS',
    description: 'A deep-level SaaS architecture dedicated to infrastructure management and complex logging.',
    techStack: ['React', 'Tailwind', 'WebSockets'],
    liveUrl: 'https://www.cratebase.io',
    imageUrl: genSaasImg,
    caseStudy: {
      overview: 'Cratebase visualizes raw system metrics. The frontend must parse intense JSON log structures instantly.',
      challenges: ['Browser tab crashing during heavy log tailing.', 'Unreadable dense syntax.'],
      solutions: ['Architected a buffered log injection pipeline via Web Workers.', 'Built a tokenizing syntax highlighter natively.'],
      results: ['Utterly stable metric rendering.', 'Beautiful, highly legible raw log outputs.']
    }
  },
  {
    slug: 'ckin',
    title: 'CKIN',
    category: 'E-Commerce',
    description: 'A hyper-chic, specialized brand portal blending profound storytelling with deep checkout flows.',
    techStack: ['Next.js', 'Framer Motion', 'Tailwind'],
    liveUrl: 'https://ckin.com',
    imageUrl: genEcomImg,
    caseStudy: {
      overview: 'CKIN required the storefront to feel like a high-fashion editorial piece immediately driving to cart.',
      challenges: ['High-resolution storytelling elements bloating TTFB.', 'Clunky native shopping cart models.'],
      solutions: ['Implemented hyper-aggressive WebP compression on scrolling variants.', 'Designed an optimistic slide-out drawer cart.'],
      results: ['Starkly beautiful brand presence.', 'Extremely low cart abandonment.']
    }
  },
  {
    slug: 'just-shredding',
    title: 'Just Shredding',
    category: 'Landing Page',
    description: 'An aggressive B2B landing page architected solely for local conversion and trust-building.',
    techStack: ['React', 'HTML/CSS', 'SEO'],
    liveUrl: 'https://www.justshredding.co.uk',
    imageUrl: genLandImg,
    caseStudy: {
      overview: 'B2B service conversions require immediate trust signals and blisteringly fast phone-number visibility.',
      challenges: ['Poor mobile tap-targets.', 'Lack of instantaneous quote formulation.'],
      solutions: ['Re-architected the header matrix for immediate accessibility.', 'Built a frictionless multi-step quote wizard.'],
      results: ['Massive increase in B2B inbound leads.', 'Unshakable core web vital metrics.']
    }
  },
  {
    slug: 'hotel-fusion',
    title: 'Hotel Fusion SF',
    category: 'Portal',
    description: 'A comprehensive hospitality portal managing intricate room bookings and dynamic hospitality scaling.',
    techStack: ['React', 'Booking API', 'Node.js'],
    liveUrl: 'https://www.hotelfusionsf.com/stay',
    imageUrl: genPortImg,
    caseStudy: {
      overview: 'Hospitality APIs return massively complex hierarchical data. The frontend needs to simplify this totally.',
      challenges: ['Complex room-availability state matrix synchronization.', 'Slow calendar rendering.'],
      solutions: ['Engineered a strict React Context wrapper to handle global booking state.', 'Built a custom high-performance date range picker.'],
      results: ['Flawless booking funnel retention.', 'Highly authoritative, premium UI.']
    }
  },
  {
    slug: 'riskhero',
    title: 'RiskHero',
    category: 'SaaS',
    description: 'An institutional-grade Risk Management SaaS offering profound data clarity via custom tables.',
    techStack: ['React', 'Ag-Grid', 'D3.js'],
    liveUrl: 'https://app.riskhero.com/login',
    imageUrl: genSaasImg,
    caseStudy: {
      overview: 'Risk modeling demands unparalleled data clarity. The dashboard must handle thousands of rows with zero latency.',
      challenges: ['Native HTML tables locking rendering threads on large payloads.', 'Complex multi-column sorting.'],
      solutions: ['Integrated Ag-Grid matrix for infinite scrolling datasets.', 'Engineered column-definition mapping perfectly styled to the brand.'],
      results: ['Immediate analytic clarity for end-users.', 'Absolute institutional trust.']
    }
  },
  {
    slug: 'dojochamp',
    title: 'DojoChamp',
    category: 'Portal',
    description: 'A vibrant, highly localized martial arts academy portal designed explicitly to maximize parent onboarding.',
    techStack: ['React', 'Stripe', 'Tailwind'],
    liveUrl: 'https://dojochamp.com/',
    imageUrl: genPortImg,
    caseStudy: {
      overview: 'DojoChamp requires extremely fluid class scheduling and integrated liability waivers.',
      challenges: ['Cumbersome onboarding forms.', 'Confusing nested class schedules.'],
      solutions: ['Built a linear, step-by-step React form pipeline.', 'Engineered an interactive, color-coded weekly class timeline.'],
      results: ['Massive spike in trial-class signups.', 'Zero-confusion scheduling mapping.']
    }
  },
  {
    slug: 'yojana-academic',
    title: 'Yojana Academic',
    category: 'SaaS',
    description: 'An intensive academic productivity SaaS platform linking massive disparate institutional datasets.',
    techStack: ['React', 'GraphQL', 'Data Viz'],
    liveUrl: 'https://yojana.academicunderdogs.com',
    imageUrl: genSaasImg,
    caseStudy: {
      overview: 'Synthesizing deeply hierarchical academic data requires profound architectural forethought.',
      challenges: ['Deep GraphQL querying returning immensely nested data.', 'Displaying recursive hierarchies.'],
      solutions: ['Engineered a custom recursive tree-component rendered virtually.', 'Aggressive apollo cache normalizing.'],
      results: ['Instantaneous UI responses to deep data queries.', 'Flawless institutional metric tracking.']
    }
  },
  {
    slug: 'esseyi',
    title: 'Esseyi',
    category: 'Landing Page',
    description: 'A high-impact, deeply atmospheric corporate brand landing page.',
    techStack: ['React', 'GSAP', 'Next.js'],
    liveUrl: 'https://www.esseyi.com',
    imageUrl: genLandImg,
    caseStudy: {
      overview: 'Esseyi demanded a UI that instantly commanded respect via massive typography and immersive motion.',
      challenges: ['GSAP animations conflicting with React strict mode.', 'Mobile scroll-jacking penalties.'],
      solutions: ['Architected a seamless useLayoutEffect wrapper for GSAP timelines.', 'Strictly disabled scroll manipulation on touch devices.'],
      results: ['Profoundly impactful desktop experience.', 'Immaculate mobile interaction.']
    }
  }
];
