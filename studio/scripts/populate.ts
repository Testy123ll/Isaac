import { getCliClient } from 'sanity/cli'
import { createReadStream } from 'fs'
import { join } from 'path'

const client = getCliClient()

const publicDir = join(process.cwd(), '../public')

const projects = [
  {
    slug: 'austin-elite-smiles',
    title: 'Austin Elite Smiles',
    category: 'Luxury Dental UX',
    description: 'A complete Website Audit & Redesign for a luxury dental clinic. By identifying UX friction—specifically treating high-ticket veneer leads like standard cleaning leads—I engineered a custom "Smart Triage" React modal and an immersive "Atmosphere Video" hero to significantly increase VIP conversions.',
    techStack: ['React', 'Site Audit', 'CRO', 'Tailwind CSS'],
    liveUrl: 'https://austin-smiles.vercel.app/',
    imageUrl: 'austin-smiles.png',
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
    imageUrl: 'eaasyreels.png',
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
    imageUrl: 'blessed-olas.png',
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

const blogs = [
  {
    slug: 'how-i-audit-a-dental-website',
    title: 'How I Audit a Dental Website for SEO and Conversions',
    excerpt: 'A deep dive into my process for tearing down poorly performing luxury dental sites and engineering them for high-ticket leads.',
    date: 'March 4, 2026',
    readTime: '6 min read',
    category: 'Website Auditing',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop',
    content: `
# The Blueprint for High-Ticket Medical Funnels

When a client comes to me with a failing luxury dental website, the issue is almost never the traffic. It's the architecture. 

They are driving $10k/month in ads to a site that treats a $30,000 veneer patient exactly the same as someone looking for an $80 cleaning. This guarantees friction, frustration, and bounce rates.

Here is exactly how I audit and tear down these sites.

## 1. The UX Teardown
First, I map the user flow. Where is the "Book Now" button leading? Usually, it's a generic contact form with 15 required fields. 

**The Fix:** We engineer a "Smart Triage" system. A React-based modal that asks 3 simple questions: "What is your main concern?", "What is your timeline?", "What is your budget?". Based on the answers, high-ticket leads are routed directly to a VIP concierge calendar.

## 2. The Performance Audit
Luxury means speed. If a page takes 4 seconds to load its massive stock images, the luxury illusion shatters.
I run Lighthouse audits and usually find unoptimized assets and render-blocking scripts.

**The Fix:** I rebuild the foundation. We lazy-load every image outside the viewport, compress hero visuals to next-gen formats (WebP/AVIF), and strip out bloated WordPress plugins in favor of a lean React/Next.js architecture.

## 3. The Visual Hierarchy
A premium service needs a premium aesthetic. Dark mode accents, subtle Framer Motion reveals, and crisp typography (like Inter or Plus Jakarta Sans). 

We move away from the "medical clinic" vibe and towards a "luxury boutique" experience.

## Conclusion
A website is not a brochure; it is an engineered sales machine. By combining rigorous auditing with bespoke code, we turn leaky funnels into high-converting assets.
    `
  },
  {
    slug: 'traditional-coding-vs-no-code',
    title: 'Traditional Coding vs. No-Code & WordPress: The Hard Truth',
    excerpt: 'The reality of when to use No-Code tools, and when you absolutely need custom software engineering.',
    date: 'February 28, 2026',
    readTime: '5 min read',
    category: 'Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop',
    content: `
# Breaking the No-Code Illusion

No-code tools like Webflow and Framer are incredible for rapid prototyping and simple marketing sites. However, selling them as the ultimate solution for complex SaaS platforms or highly secure enterprise tools is a dangerous game.

## When Custom Engineering Wins

1.  **Complex Logic:** If your application requires intricate state management, complex data relationships, or custom algorithms, dragging and dropping won't cut it. You need a real backend (Node.js, Postgres) and a robust frontend framework (React).
2.  **Performance at Scale:** WordPress and heavy page builders inherently output bloated DOM structures. Custom React/Vite builds achieve perfect core web vitals because you control every single byte of code shipped to the browser.
3.  **Security & Control:** When you rely on third-party plugins to hold your platform together, every update is a terrifying game of Russian Roulette. Custom code means you own the architecture.

At BlueStark, we use the right tool for the job. But when it matters, we write code.
    `
  },
  {
    slug: 'future-of-web-development',
    title: 'The Future of Web Development: AI Integrated Interfaces',
    excerpt: 'How AI is changing the way users interact with the web, and how developers need to adapt.',
    date: 'February 15, 2026',
    readTime: '8 min read',
    category: 'AI & Engineering',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop',
    content: `
# Beyond the Static Page

The era of navigating through deeply nested menus is ending. The future interface is generative, predictive, and wildly conversational.

## The Shift in UI/UX
We are moving from "Click here to find this" to "Ask for this, and the UI builds itself to show it." This requires a completely different architectural approach.

Instead of hardcoding every possible UI state, engineers must now build dynamic component systems that an AI layer can compose on the fly.

## What this means for Engineers
If you only know how to center a div and fetch a REST API, you are falling behind. We must learn:
-   **Vector Databases & RAG:** Integrating semantic search deeply into the frontend.
-   **Streaming Architectures:** Handling real-time, token-by-token responses smoothly without judder.
-   **Agentic Workflows:** Building interfaces that act on behalf of the user, not just display data.

The web is getting smarter. Our code needs to keep up.
    `
  }
];

async function uploadImage(url: string) {
  console.log('Uploading image:', url)
  try {
    if (url.startsWith('http')) {
      const res = await fetch(url)
      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const asset = await client.assets.upload('image', buffer, { filename: 'image.jpg' })
      return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    } else {
      const cleanPath = url.replace(/^[./]+/, '')
      const absPath = join(publicDir, cleanPath)
      const asset = await client.assets.upload('image', createReadStream(absPath), { filename: cleanPath })
      return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    }
  } catch (err) {
    console.error('Failed to upload image:', url, err)
    return undefined
  }
}

async function run() {
  console.log('Starting population...')
  
  for (const p of projects) {
    console.log('Processing project:', p.title)
    const imageObj = await uploadImage(p.imageUrl)
    
    const doc = {
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      category: p.category,
      description: p.description,
      techStack: p.techStack,
      liveUrl: p.liveUrl,
      imageUrl: imageObj || undefined,
      caseStudy: p.caseStudy
    }
    
    await client.create(doc)
    console.log('Created project.')
  }

  for (const b of blogs) {
    console.log('Processing blog:', b.title)
    const imageObj = await uploadImage(b.imageUrl)
    
    const blocks: any[] = []
    const lines = b.content.split('\\n')
    for (const line of lines) {
      const text = line.trim()
      if (!text) continue
      
      let style = 'normal'
      let cleanText = text
      let listItem = undefined

      if (text.startsWith('## ')) {
        style = 'h2'
        cleanText = text.replace('## ', '')
      } else if (text.startsWith('# ')) {
        style = 'h1'
        cleanText = text.replace('# ', '')
      } else if (text.startsWith('- ')) {
        listItem = 'bullet'
        cleanText = text.replace('- ', '')
      } else if (text.match(/^\\d+\\.\\s/)) {
        listItem = 'number'
        cleanText = text.replace(/^\\d+\\.\\s/, '')
      }

      const block: any = {
        _type: 'block',
        style,
        children: [{ _type: 'span', text: cleanText, marks: [] }]
      }
      
      if (listItem) {
        block.listItem = listItem
      }
      
      blocks.push(block)
    }

    const doc = {
      _type: 'post',
      title: b.title,
      slug: { _type: 'slug', current: b.slug },
      excerpt: b.excerpt,
      date: b.date,
      readTime: b.readTime,
      category: b.category,
      imageUrl: imageObj || undefined,
      content: blocks
    }
    
    await client.create(doc)
    console.log('Created blog.')
  }
  
  console.log('CMS Population Completed!')
}

run().catch(console.error)
