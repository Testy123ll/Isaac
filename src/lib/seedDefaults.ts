/**
 * seedDefaults.ts
 * Seeds Supabase tables with all existing site content only if tables are empty.
 * Safe to call on every app load — never overwrites existing data.
 */
import { supabase } from './supabase';
import { projects as fallbackProjects } from '../data/projects';

// ─── FAQs ────────────────────────────────────────────────────────────────────
const DEFAULT_FAQS = [
  { question: "How do you work?", answer: "I start by understanding your business and what the site needs to achieve. Then I define the structure, design the layout, build it in clean code, test it, and hand it over live. You're updated at every stage, with no surprises.", order_index: 0 },
  { question: "How long does a project take?", answer: "A standard business website takes 1–2 weeks. Landing pages can be done in 3–5 days. Larger web applications are scoped per project. I give you a clear timeline before we start.", order_index: 1 },
  { question: "How much do you charge?", answer: "Pricing depends on the scope of the project. A basic business website starts from $300. Landing pages start from $150. I offer flat-fee pricing with no hidden costs and no hourly surprises. Message me and I'll give you an exact quote.", order_index: 2 },
  { question: "How many revisions do I get?", answer: "You get 2 rounds of revisions included in every project. I build to your brief from the start, so most clients don't need more than one round. Additional revisions beyond that are available at a small flat fee.", order_index: 3 },
  { question: "Do you offer support after launch?", answer: "Yes. Every project includes 2 weeks of free post-launch support. After that, I offer affordable monthly maintenance packages covering updates, performance monitoring, and content changes.", order_index: 4 },
  { question: "What's your pricing model?", answer: "I charge a flat project fee rather than an hourly rate. You know the full cost before I write a single line of code. 50% upfront, 50% on delivery. No retainers unless you want ongoing maintenance.", order_index: 5 },
];

// ─── Site Content ─────────────────────────────────────────────────────────────
const DEFAULT_SITE_CONTENT = [
  { section: 'hero', key: 'headline', value: 'I Build Websites That Generate Leads, Sales, and Growth' },
  { section: 'hero', key: 'subheadline', value: 'Full-Stack Web Developer helping businesses and founders build fast, conversion-focused websites, written in real code with no templates and no shortcuts.' },
  { section: 'hero', key: 'availability', value: '✦ A BlueStark Initiative' },
  { section: 'about', key: 'title', value: 'The Developer Behind the Work.' },
  { section: 'about', key: 'bio', value: "Hi, I'm Isaac Testimony, a Full-Stack Web Developer and final-year Civil Engineering student. My engineering background shapes everything I build. I think in systems, plan before I write a single line of code, and solve problems from first principles.\n\nWhen I build your website, I'm thinking about structure, performance, and how it holds up under real-world pressure, using the same discipline I apply to engineering problems.\n\nI personally handle everything: the architecture, the frontend, the backend, and the launch. No handoffs, no communication gaps, no agency markup." },
  { section: 'stats', key: 'stat1_val', value: '15+' },
  { section: 'stats', key: 'stat1_lbl', value: 'Projects Delivered' },
  { section: 'stats', key: 'stat2_val', value: '10+' },
  { section: 'stats', key: 'stat2_lbl', value: 'Happy Clients' },
  { section: 'stats', key: 'stat3_val', value: '2+' },
  { section: 'stats', key: 'stat3_lbl', value: 'Years Building' },
  { section: 'stats', key: 'stat4_val', value: '100%' },
  { section: 'stats', key: 'stat4_lbl', value: 'On-Time Delivery' },
  { section: 'services', key: 'title', value: 'Engineered Solutions.' },
  { section: 'services', key: 'desc', value: "I don't just build websites; I audit failing platforms and engineer the exact solution required to scale." },
  { section: 'pain_points', key: 'title', value: "You've Got the Vision. The Build Is Where It Falls Apart." },
  { section: 'pain_points', key: 'desc', value: "These aren't hypothetical struggles. These are the exact conversations I have every week with founders who found me right before they gave up." },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const DEFAULT_TESTIMONIALS = [
  { name: "Austin Dental Clinic", position: "Owner", company: "Austin Elite Smiles", body: "Isaac completely transformed our website. The new smart triage system dramatically increased our high-ticket veneer bookings within the first week of launch. Genuinely impressive work.", avatar_url: "", order_index: 0 },
  { name: "Impact Pest Team", position: "Operations Lead", company: "Impact Pest Control", body: "We went from almost no web leads to a steady stream of calls after Isaac rebuilt our site. It's fast, it looks professional, and it actually converts. Best investment we made.", avatar_url: "", order_index: 1 },
  { name: "WeGlobalee Team", position: "CTO", company: "WeGlobalee", body: "The portal Isaac engineered handles our entire global logistics data cleanly. Complex multi-role access, massive datasets, all rendering flawlessly. He knew exactly what we needed.", avatar_url: "", order_index: 2 },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────
const DEFAULT_BLOG_POSTS = [
  {
    title: 'How I Audit a Dental Website for SEO and Conversions',
    slug: 'how-i-audit-a-dental-website',
    excerpt: 'A deep dive into my process for tearing down poorly performing luxury dental sites and engineering them for high-ticket leads.',
    category: 'Website Auditing',
    readTime: '6 min read',
    date: 'March 4, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop',
    content: `# The Blueprint for High-Ticket Medical Funnels\n\nWhen a client comes to me with a failing luxury dental website, the issue is almost never the traffic. It's the architecture.\n\nThey are driving $10k/month in ads to a site that treats a $30,000 veneer patient exactly the same as someone looking for an $80 cleaning. This guarantees friction, frustration, and bounce rates.\n\n## 1. The UX Teardown\nFirst, I map the user flow. Where is the "Book Now" button leading? Usually, it's a generic contact form with 15 required fields.\n\n**The Fix:** I build a "Smart Triage" system. A React-based modal that asks 3 simple questions: "What is your main concern?", "What is your timeline?", "What is your budget?". Based on the answers, high-ticket leads are routed directly to a VIP concierge calendar.\n\n## 2. The Performance Audit\nLuxury means speed. If a page takes 4 seconds to load its massive stock images, the luxury illusion shatters.\n\n**The Fix:** I rebuild the foundation. I lazy-load every image outside the viewport, compress hero visuals to next-gen formats (WebP/AVIF), and strip out bloated WordPress plugins in favor of a lean React/Next.js architecture.\n\n## 3. The Visual Hierarchy\nA premium service needs a premium aesthetic. Dark mode accents, subtle Framer Motion reveals, and crisp typography.\n\n## Conclusion\nA website is not a brochure; it is an engineered sales machine.`,
    published: true,
  },
  {
    title: 'Traditional Coding vs. No-Code & WordPress: The Hard Truth',
    slug: 'traditional-coding-vs-no-code',
    excerpt: 'The reality of when to use No-Code tools, and when you absolutely need custom web development.',
    category: 'Architecture',
    readTime: '5 min read',
    date: 'February 28, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    content: `# Breaking the No-Code Illusion\n\nNo-code tools like Webflow and Framer are incredible for rapid prototyping and simple marketing sites. However, selling them as the ultimate solution for complex SaaS platforms or highly secure enterprise tools is a dangerous game.\n\n## When Custom Engineering Wins\n\n1. **Complex Logic:** If your application requires intricate state management, complex data relationships, or custom algorithms, dragging and dropping won't cut it.\n2. **Performance at Scale:** WordPress and heavy page builders inherently output bloated DOM structures. Custom React/Vite builds achieve perfect core web vitals because you control every single byte of code shipped to the browser.\n3. **Security & Control:** When you rely on third-party plugins to hold your platform together, every update is a terrifying game of Russian Roulette. Custom code means you own the architecture.\n\nI use the right tool for the job. But when it matters, I write code.`,
    published: true,
  },
  {
    title: 'The Future of Web Development: AI Integrated Interfaces',
    slug: 'future-of-web-development',
    excerpt: 'How AI is changing the way users interact with the web, and how developers need to adapt.',
    category: 'AI & Engineering',
    readTime: '8 min read',
    date: 'February 15, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop',
    content: `# Beyond the Static Page\n\nThe era of navigating through deeply nested menus is ending. The future interface is generative, predictive, and wildly conversational.\n\n## The Shift in UI/UX\nThe web is moving from "Click here to find this" to "Ask for this, and the UI builds itself to show it." This requires a completely different architectural approach.\n\nInstead of hardcoding every possible UI state, engineers must now build dynamic component systems that an AI layer can compose on the fly.\n\n## What This Means for Engineers\nIf you only know how to center a div and fetch a REST API, you are falling behind. Developers must learn:\n- **Vector Databases & RAG:** Integrating semantic search deeply into the frontend.\n- **Streaming Architectures:** Handling real-time, token-by-token responses smoothly without judder.\n- **Agentic Workflows:** Building interfaces that act on behalf of the user, not just display data.\n\nThe web is getting smarter. My code needs to keep up.`,
    published: true,
  },
  {
    title: 'How Websites Fail: Functionality Over Form',
    slug: 'how-websites-fail-functionality',
    excerpt: 'Why beautiful websites consistently lose money, and how engineering functional conversion architecture is the only design that matters.',
    category: 'Conversion Architecture',
    readTime: '7 min read',
    date: 'March 6, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop',
    content: `# The Aesthetic Trap\n\nI see it every single week. A founder drops $15,000 on an award-winning creative agency. The website is delivered. It has 3D WebGL renders, cinematic scroll tracking, custom cursors, and 4K autoplaying background videos.\n\nIt wins a CSS design award.\n\nAnd then... crickets. The bounce rate is 85%. The conversion rate is 0.2%.\n\n## Design is Not Functionality\nBeautiful design builds trust, but **functionality drives revenue**. When a user visits your site, they are trying to solve a specific problem. If your 3D animations block them from understanding how to give you their money in the first 5 seconds, you have failed.\n\n### The 3 Core Pillars of a Functional Website:\n\n1. **Ultra-Fast Value Proposition:** A razor-sharp H1 dominating the viewport.\n2. **Frictionless Architecture:** Put the CTA everywhere. Make the paths to revenue direct.\n3. **Performance as a Feature:** You cannot have a functional website if it takes 4 seconds to become interactive on mobile.\n\n## The Engineering Solution\nI don't start with colors and fonts. I start with the database architecture, the routing strategy, and the conversion funnel. Only once the engine is flawlessly constructed do I paint the car.`,
    published: true,
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
const DEFAULT_PROJECTS = fallbackProjects.map((p, i) => ({
  ...p,
  type: (p as any).type || 'client',
  order_index: i,
}));

// ─── Seeder ───────────────────────────────────────────────────────────────────
export async function seedDefaultsIfEmpty(): Promise<void> {
  try {
    // --- Seed FAQs ---
    const { count: faqCount, error: faqCountErr } = await supabase
      .from('faqs').select('*', { count: 'exact', head: true });
    if (!faqCountErr && faqCount === 0) {
      const { error } = await supabase.from('faqs').insert(DEFAULT_FAQS);
      if (error) console.warn('FAQ seed failed:', error.message);
      else console.log('✓ FAQs seeded');
    }

    // --- Seed site_content ---
    const { count: scCount, error: scCountErr } = await supabase
      .from('site_content').select('*', { count: 'exact', head: true });
    if (!scCountErr && scCount === 0) {
      const { error } = await supabase.from('site_content').insert(DEFAULT_SITE_CONTENT);
      if (error) console.warn('site_content seed failed:', error.message);
      else console.log('✓ site_content seeded');
    }

    // --- Seed testimonials ---
    const { count: tCount, error: tCountErr } = await supabase
      .from('testimonials').select('*', { count: 'exact', head: true });
    if (!tCountErr && tCount === 0) {
      const { error } = await supabase.from('testimonials').insert(DEFAULT_TESTIMONIALS);
      if (error) console.warn('testimonials seed failed:', error.message);
      else console.log('✓ testimonials seeded');
    }

    // --- Seed blog posts ---
    const { count: bCount, error: bCountErr } = await supabase
      .from('blog_posts').select('*', { count: 'exact', head: true });
    if (!bCountErr && bCount === 0) {
      const { error } = await supabase.from('blog_posts').insert(DEFAULT_BLOG_POSTS);
      if (error) console.warn('blog_posts seed failed:', error.message);
      else console.log('✓ blog posts seeded');
    }

    // --- Seed & Sync projects ---
    for (const proj of DEFAULT_PROJECTS) {
      const { data: existing, error: checkErr } = await supabase
        .from('projects')
        .select('id, imageUrl')
        .eq('slug', proj.slug)
        .maybeSingle();

      if (!checkErr) {
        if (existing) {
          // If the database imageUrl is empty, is a compiled asset path, or differs from the default path, sync it
          const needsSync = !existing.imageUrl || 
                            existing.imageUrl.includes('/assets/') || 
                            existing.imageUrl !== proj.imageUrl;
          if (needsSync) {
            const { error: updateErr } = await supabase
              .from('projects')
              .update({ imageUrl: proj.imageUrl })
              .eq('id', existing.id);
            if (updateErr) {
              console.warn(`Failed to sync imageUrl for project ${proj.slug}:`, updateErr.message);
            } else {
              console.log(`✓ Synced image URL to ${proj.imageUrl} for project: ${proj.slug}`);
            }
          }
        } else {
          // Insert missing project
          const { error: insertErr } = await supabase
            .from('projects')
            .insert([proj]);
          if (insertErr) {
            console.warn(`Failed to seed project ${proj.slug}:`, insertErr.message);
          } else {
            console.log(`✓ Seeded project: ${proj.slug}`);
          }
        }
      }
    }

  } catch (err) {
    console.warn('Seeding skipped (tables may not exist yet):', err);
  }
}
