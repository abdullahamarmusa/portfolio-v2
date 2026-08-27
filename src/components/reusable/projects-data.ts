/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PRODUCT ARCHIVE — Project Data
 *
 * Single source of truth for the "Selected Product Builds" archive and all
 * dedicated /work/[slug] case-study pages.
 *
 * To swap in real screenshots:
 *   - Drop files in `public/` and reference them as `/nuvora-cover.jpg`
 *   - Update `coverImage` and `gallery` entries below
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  size?: 'full' | 'medium' | 'split' | 'close';
};

export type Highlight = {
  title: string;
  description: string;
};

export type EngineeringDecision = {
  title: string;
  description: string;
};

// Legacy type kept for StackSection / any remaining consumer
export type SecondaryImage = {
  src: string;
  alt: string;
  label: string;
};

export type Project = {
  /** URL segment: "nuvora" */
  slug: string;
  /** Editorial index, e.g. "01" */
  number: string;
  /** Product name */
  title: string;
  /** Short category label */
  category: string;
  /** 1–2 sentence teaser for the archive section */
  shortDescription: string;
  /** Longer paragraph for the case-study hero */
  description: string;

  /* ── Metadata ─────────────────────────────────────────────────────── */
  role: string;
  productType: string;
  stack: string[];
  focus: string[];
  status: string;
  year: string;

  /* ── Visuals ──────────────────────────────────────────────────────── */
  coverImage: string;
  coverImageAlt: string;
  gallery: GalleryImage[];

  /* ── Case-study sections ──────────────────────────────────────────── */
  overview: string;
  challenge: string;
  whatIBuilt: string;
  highlights: Highlight[];
  architecture: string[];
  engineeringDecisions: EngineeringDecision[];
  outcome: string;

  /* ── Style ────────────────────────────────────────────────────────── */
  accent: string;
  /** External link (GitHub / demo) */
  href: string;
  /** Live preview link (deployed demo / repo) — shown beside the case study link */
  liveUrl: string;

  /* ── Legacy compat ────────────────────────────────────────────────── */
  image?: string;
  imageAlt?: string;
  secondaryImages?: SecondaryImage[];
  story?: { problem: string; outcome: string };
  product?: string;
};

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT DATA
   ═══════════════════════════════════════════════════════════════════════════ */

export const PROJECTS: Project[] = [
  /* ── 01 · Nuvora ─────────────────────────────────────────────────────── */
  {
    slug: "nuvora",
    number: "01",
    title: "Nuvora",
    category: "E-commerce Operations & Analytics",
    shortDescription:
      "A unified operations workspace for e-commerce — revenue, orders, inventory and customer activity in one dashboard.",

    role: "Product Engineer",
    productType: "E-commerce Platform",
    stack: ["Next.js", "TypeScript", "Supabase"],
    focus: ["Analytics", "Operations", "UX"],
    status: "Built",
    year: "2025",

    coverImage: "/nuvora-cover.jpg",
    coverImageAlt: "Nuvora e-commerce operations and analytics dashboard",
    gallery: [
      {
        src: "/nuvora-cover.jpg",
        alt: "Nuvora main dashboard with revenue chart and KPI cards",
        caption: "Main Dashboard — Revenue & Orders Overview",
        size: "full",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
        alt: "Nuvora analytics panel with trend data",
        caption: "Analytics Panel — 30-day Revenue Trend",
        size: "medium",
      },
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        alt: "Nuvora inventory management interface",
        caption: "Inventory Management — Stock Alerts",
        size: "split",
      },
    ],

    description:
      "A data-driven workspace for monitoring revenue, orders, inventory, customers, and business performance.",
    overview:
      "Nuvora is a unified operations workspace for e-commerce businesses — a single platform for monitoring revenue trends, managing order fulfilment, tracking inventory levels and understanding customer behaviour. The platform replaces the need to jump between multiple disconnected tools for core daily operations.",
    challenge:
      "E-commerce operators typically juggle four or five separate tools to get a complete picture of their business. Revenue lives in one tab, inventory in another, customer data in a third. The friction of constant context-switching adds up and slows down daily decisions — especially as order volumes increase.",
    whatIBuilt:
      "A complete e-commerce operations platform spanning four core workflows:",
    highlights: [
      {
        title: "Revenue Intelligence",
        description: "Interactive forecasting, daily trends, and period-over-period comparisons.",
      },
      {
        title: "Inventory Operations",
        description: "Real-time stock level monitoring with configurable alert thresholds.",
      },
      {
        title: "Customer Management",
        description: "Segmented customer views with lifetime value and purchase history.",
      },
      {
        title: "Performance Analytics",
        description: "Top-line KPI cards and conversion metrics across multiple channels.",
      },
    ],
    architecture: [
      "Next.js",
      "Application UI",
      "API / Data Layer",
      "Supabase",
      "PostgreSQL",
    ],
    engineeringDecisions: [
      {
        title: "Data-heavy UI",
        description:
          "Designed tables and charts that prioritize scannability over decorative elements, allowing operators to parse complex data at a glance.",
      },
      {
        title: "Reusable component system",
        description:
          "Built a headless table architecture and standardized metric cards to ensure visual consistency across all modules.",
      },
      {
        title: "Responsive dashboard architecture",
        description:
          "Implemented a fluid layout that scales seamlessly from desktop control centers to mobile on-the-go views.",
      },
      {
        title: "Visual information hierarchy",
        description:
          "Used subtle typography scaling and selective color accents to draw the eye to critical alerts without overwhelming the user.",
      },
      {
        title: "Analytics-oriented interaction",
        description:
          "Integrated interactive filtering and dynamic charting that updates without full page reloads for instant feedback.",
      },
    ],
    outcome:
      "• Built a reusable e-commerce operations and analytics interface.\n• Demonstrates a complete dashboard system for revenue, inventory and customer workflows.",

    accent: "#22d3ee",
    href: "https://github.com/abdullahamarmusa",
    liveUrl: "https://github.com/abdullahamarmusa",

    // Legacy compat
    image: "/nuvora-cover.jpg",
    imageAlt: "Nuvora e-commerce operations and analytics dashboard",
    secondaryImages: [
      { src: "/nuvora-cover.jpg", alt: "Nuvora analytics", label: "Analytics" },
    ],
    story: {
      problem:
        "E-commerce businesses need a centralized way to monitor revenue, orders, inventory and customer activity without stitching together five different tools.",
      outcome:
        "A unified interface for monitoring and managing store operations — from revenue trends down to individual orders.",
    },
    product: "Analytics Platform",
  },

  /* ── 02 · NexusKit ───────────────────────────────────────────────────── */
  {
    slug: "nexuskit",
    number: "02",
    title: "NexusKit",
    category: "Next.js SaaS / Admin Dashboard",
    shortDescription:
      "A production-ready SaaS foundation — auth-ready layouts, composable dashboard components and clean architecture out of the box.",
    description:
      "A production foundation for SaaS and admin interfaces. Authentication-ready layouts, reusable dashboard components and a clean architecture that eliminates weeks of boilerplate so teams can start building product features on day one.",

    role: "Product Engineer",
    productType: "SaaS Starter Kit",
    stack: ["Next.js", "TypeScript", "React", "Auth.js"],
    focus: ["Product Foundation", "Architecture", "DX"],
    status: "Built",
    year: "2025",

    coverImage: "/nexuskit-cover.jpg",
    coverImageAlt: "NexusKit SaaS admin dashboard with users table and KPIs",
    gallery: [
      {
        src: "/nexuskit-cover.jpg",
        alt: "NexusKit main dashboard with user overview and stats",
        caption: "Dashboard — User Management & KPI Overview",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
        alt: "NexusKit analytics panel",
        caption: "Analytics — Subscription & Revenue Metrics",
      },
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        alt: "NexusKit authentication system",
        caption: "Auth Flow — Sign In / Sign Up / Password Reset",
      },
    ],

    overview:
      "NexusKit is a production-ready SaaS foundation built with Next.js and TypeScript. It provides a complete starting point for teams building admin dashboards and SaaS interfaces — covering authentication, dashboard layout, data tables, user management and analytics display without any of the usual setup overhead.",
    challenge:
      "Product teams regularly lose the first two weeks of a SaaS build to the same boilerplate: authentication flows, sidebar layouts, protected routes, API scaffolding and table components. The problem repeats with every new project. NexusKit exists to eliminate that repeated setup entirely.",
    whatIBuilt:
      "A composable SaaS foundation covering four main areas. A complete authentication system with sign-in, sign-up and password reset screens. A persistent sidebar layout system with collapsible navigation and role-aware route protection. A reusable data table component with sorting, filtering and pagination. A stats and metrics display layer showing MAU, MRR and subscription trends.",
    highlights: [
      {
        title: "Authentication System",
        description:
          "Complete auth flow with sign-in, sign-up, password reset and session management — production-ready from day one.",
      },
      {
        title: "Dashboard Shell",
        description:
          "Persistent sidebar navigation with collapsible states, breadcrumb headers and mobile-responsive drawer behaviour.",
      },
      {
        title: "Composable UI System",
        description:
          "A reusable component library covering tables, cards, modals, badges, form inputs and dropdown menus with consistent design tokens.",
      },
      {
        title: "Type-Safe Architecture",
        description:
          "Full TypeScript coverage from API routes to UI components, with strict typing on all data models and component props.",
      },
      {
        title: "Clean Folder Structure",
        description:
          "Feature-organised codebase following Next.js App Router conventions, making it straightforward for any team member to orient and extend.",
      },
    ],
    architecture: [
      "Next.js App Router",
      "React Component Layer",
      "Auth.js Sessions",
      "API Routes",
      "Database",
    ],
    engineeringDecisions: [
      {
        title: "App Router over Pages Router",
        description:
          "The Next.js App Router was chosen for its native support for React Server Components, simplified data fetching patterns and layout nesting — all of which make the dashboard architecture significantly cleaner.",
      },
      {
        title: "Auth.js for session management",
        description:
          "Auth.js (formerly NextAuth) was selected for its tight Next.js integration, provider flexibility and zero-infrastructure session model that works with both database and JWT strategies.",
      },
      {
        title: "Headless table foundation",
        description:
          "The data table is built on a headless table foundation rather than a pre-styled library, giving complete rendering control while handling the complex state logic (sorting, filtering, pagination) internally.",
      },
      {
        title: "Design token system",
        description:
          "All UI values (colors, spacing, radii, shadows) are defined as CSS custom properties, making it possible to retheme the entire kit by swapping a single token file.",
      },
    ],
    outcome:
      "Delivered a reusable, production-grade SaaS foundation that reduces initial setup time from two weeks to under a day. The authentication system, dashboard shell and component library provide a coherent starting point that can be extended to any SaaS product without rearchitecting.",

    accent: "#a855f7",
    href: "https://github.com/abdullahamarmusa",
    liveUrl: "https://github.com/abdullahamarmusa",

    image: "/nexuskit-cover.jpg",
    imageAlt: "NexusKit SaaS admin dashboard",
    secondaryImages: [
      { src: "/nexuskit-cover.jpg", alt: "NexusKit dashboard", label: "Dashboard" },
    ],
    story: {
      problem: "Product teams lose weeks re-building the same auth flows, dashboard shells and table systems for every new SaaS project.",
      outcome: "A reusable, production-grade foundation that lets teams ship a working SaaS interface in days, not weeks.",
    },
    product: "SaaS Starter Kit",
  },

  /* ── 03 · Devascent ──────────────────────────────────────────────────── */
  {
    slug: "devascent",
    number: "03",
    title: "Devascent",
    category: "Digital Product Marketplace",
    shortDescription:
      "A marketplace-style product architecture — catalog browsing, product detail flows and conversion-focused pages built as a coherent ecosystem.",
    description:
      "A complete digital product marketplace — catalog browsing, product detail flows, seller admin and checkout intent pages built as a coherent ecosystem rather than a collection of isolated screens.",

    role: "Product Engineer",
    productType: "Digital Marketplace",
    stack: ["Next.js", "TypeScript", "Catalog API", "UI Systems"],
    focus: ["Conversion", "Architecture", "Marketplace UX"],
    status: "Built",
    year: "2025",

    coverImage: "/devascent-cover.jpg",
    coverImageAlt: "Devascent digital product marketplace storefront",
    gallery: [
      {
        src: "/devascent-cover.jpg",
        alt: "Devascent marketplace storefront with product grid",
        caption: "Storefront — Product Catalog & Category Filters",
      },
      {
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070&auto=format&fit=crop",
        alt: "Devascent product detail page",
        caption: "Product Detail — Preview, Pricing & Purchase Intent",
      },
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        alt: "Devascent seller admin interface",
        caption: "Seller Admin — Product Listing Management",
      },
    ],

    overview:
      "Devascent is a digital product marketplace architecture covering the full buyer and seller journey. It includes a storefront with category filtering and search, individual product detail pages with purchase intent flows, a seller-facing admin interface for product management and a checkout experience designed for digital downloads.",
    challenge:
      "Selling digital products requires substantially more than a landing page. Catalog browsing, product detail with previews, seller tooling, and checkout intent all need to work together as a system. Building each screen in isolation creates a fragmented experience — Devascent was designed as a coherent product architecture from the start.",
    whatIBuilt:
      "A complete marketplace ecosystem built across three layers: the buyer-facing storefront with category navigation, filtering, search and product cards; a product detail page system with preview panels, pricing display and purchase calls-to-action; and a seller admin interface for listing management, sales tracking and product analytics.",
    highlights: [
      {
        title: "Catalog & Search UX",
        description:
          "Multi-category product browsing with faceted filters, keyword search and dynamic sorting — designed for fast product discovery.",
      },
      {
        title: "Product Detail Flows",
        description:
          "Rich product detail pages with preview panels, feature lists, pricing variants and strong purchase intent CTAs.",
      },
      {
        title: "Conversion-Focused Pages",
        description:
          "Every page in the buyer flow is structured around a clear next action — reducing friction from browse to purchase.",
      },
      {
        title: "Seller Admin Interface",
        description:
          "A dedicated seller workspace for managing product listings, viewing sales data and updating product details.",
      },
      {
        title: "Scalable UI System",
        description:
          "A consistent design system spanning buyer and seller interfaces with shared components, tokens and interaction patterns.",
      },
    ],
    architecture: [
      "Next.js App",
      "Storefront UI",
      "Catalog API Layer",
      "Seller Admin",
      "Payment / Checkout",
    ],
    engineeringDecisions: [
      {
        title: "Unified design system across buyer and seller",
        description:
          "A single component library serves both the buyer storefront and the seller admin, ensuring visual consistency and reducing duplicated code across the two main product surfaces.",
      },
      {
        title: "Static generation for catalog pages",
        description:
          "Product listing and detail pages are statically generated at build time, providing fast initial load performance — critical for conversion on product pages where speed directly impacts purchase intent.",
      },
      {
        title: "Faceted filter architecture",
        description:
          "Filters are modelled as URL query parameters rather than local state, making filter selections shareable, bookmarkable and crawlable by search engines.",
      },
      {
        title: "Separation of buyer and seller concerns",
        description:
          "The buyer storefront and seller admin are built as distinct routing surfaces with separate data-fetching patterns, preventing coupling between the two product experiences.",
      },
    ],
    outcome:
      "Built a complete marketplace ecosystem covering the full buyer and seller journey — from product discovery through purchase intent to seller management. Developed a conversion-oriented UI architecture with consistent design patterns across all product surfaces and a scalable foundation for adding further marketplace features.",

    accent: "#e879f9",
    href: "https://github.com/abdullahamarmusa",
    liveUrl: "https://github.com/abdullahamarmusa",

    image: "/devascent-cover.jpg",
    imageAlt: "Devascent digital product marketplace",
    secondaryImages: [
      { src: "/devascent-cover.jpg", alt: "Devascent catalog", label: "Catalog" },
    ],
    story: {
      problem: "Selling digital products requires more than a landing page — catalog browsing, product detail, checkout intent and seller tooling all have to work together.",
      outcome: "A complete marketplace ecosystem: browse, evaluate and buy digital products through one coherent product architecture.",
    },
    product: "Marketplace",
  },

  /* ── 04 · SaaS Landing ───────────────────────────────────────────────── */
  {
    slug: "saas-landing",
    number: "04",
    title: "Premium SaaS Landing",
    category: "Next.js Startup Landing Experience",
    shortDescription:
      "A conversion-focused SaaS landing page with clear narrative hierarchy — product story, feature proof and CTA flow structured to move visitors to signups.",
    description:
      "A polished, conversion-focused SaaS landing experience. Clear copy hierarchy, product story narrative and a CTA flow structured to take visitors from first impression to signup decision without unnecessary friction.",

    role: "Product Engineer",
    productType: "Landing Page",
    stack: ["Next.js", "Tailwind CSS", "Motion", "SEO"],
    focus: ["Conversion", "Storytelling", "Performance"],
    status: "Built",
    year: "2025",

    coverImage: "/saas-landing-cover.jpg",
    coverImageAlt: "Premium SaaS startup landing page with hero and feature sections",
    gallery: [
      {
        src: "/saas-landing-cover.jpg",
        alt: "SaaS landing page hero section with product preview",
        caption: "Hero Section — Headline, CTA & Product Preview",
      },
      {
        src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2070&auto=format&fit=crop",
        alt: "SaaS landing page feature and pricing sections",
        caption: "Features & Pricing — Narrative Flow",
      },
    ],

    overview:
      "A premium SaaS landing page built for early-stage startups that need to communicate product value quickly and drive free-trial signups. The page architecture follows a deliberate narrative structure — from problem awareness through solution understanding to conversion action — with every section earning its place in the flow.",
    challenge:
      "Most startup landing pages list features without telling a story. Visitors arrive, scan a grid of icons, and leave without understanding what the product actually does or why it matters to them. The challenge was designing a page that guides visitors through a clear narrative arc from problem identification to purchase confidence.",
    whatIBuilt:
      "A full-page SaaS landing experience structured around conversion narrative. A hero section establishing the core value proposition with a bold headline hierarchy and primary CTA. A social proof strip with trust signals. A features section with tab-based exploration rather than a static grid. A pricing table with clear tier differentiation. A testimonial section and a final conversion CTA. Full mobile responsiveness and performance-optimised build.",
    highlights: [
      {
        title: "Narrative Copy Hierarchy",
        description:
          "Every headline, subheadline and supporting paragraph is written to move the reader toward the next section rather than simply describing features.",
      },
      {
        title: "Product Storytelling",
        description:
          "The page structure follows a deliberate arc: problem → solution → proof → pricing → action — matching how buyers actually make decisions.",
      },
      {
        title: "CTA Flow Design",
        description:
          "Primary and secondary CTAs placed at psychologically appropriate moments — after establishing value, not before it.",
      },
      {
        title: "Performance-First Build",
        description:
          "Core Web Vitals optimised — static generation, image optimisation and minimal JavaScript payload for fast first contentful paint.",
      },
      {
        title: "Fully Responsive",
        description:
          "Mobile-first layout with breakpoints designed for readability on all devices, not just desktop resizing.",
      },
    ],
    architecture: [
      "Next.js (Static)",
      "Page Components",
      "Motion Layer",
      "Image Optimisation",
      "Analytics / GTM",
    ],
    engineeringDecisions: [
      {
        title: "Static generation for maximum performance",
        description:
          "The page is fully statically generated — no server-side rendering overhead. This maximises initial load performance, which directly impacts bounce rate and conversion.",
      },
      {
        title: "Scroll-triggered reveals over auto-play animations",
        description:
          "Animations are triggered by scroll position rather than running on page load, ensuring they add visual interest without competing with the copy during first impression.",
      },
      {
        title: "Section-level CTA placement strategy",
        description:
          "CTAs are placed after evidence is established (features section, testimonials) rather than only at hero and footer — increasing conversion surface area.",
      },
      {
        title: "Typography as hierarchy tool",
        description:
          "Font size, weight and spacing are used deliberately to create a reading hierarchy that guides the eye through the page without relying solely on layout.",
      },
    ],
    outcome:
      "Built a complete, conversion-oriented landing page architecture with clear narrative structure and performance-optimised delivery. The page provides a reusable template for SaaS startup launches with appropriate SEO foundations, analytics integration points and mobile-first responsive design.",

    accent: "#a855f7",
    href: "https://github.com/abdullahamarmusa",
    liveUrl: "https://github.com/abdullahamarmusa",

    image: "/saas-landing-cover.jpg",
    imageAlt: "Premium SaaS landing page",
    secondaryImages: [
      { src: "/saas-landing-cover.jpg", alt: "SaaS landing hero", label: "Hero" },
    ],
    story: {
      problem: "Startups lose signups because their landing page tells no story — features are listed, but the value and the next step are unclear.",
      outcome: "A landing experience with clear narrative hierarchy that moves visitors from first impression to signup.",
    },
    product: "Landing Page",
  },

  /* ── 05 · Next.js Starter ────────────────────────────────────────────── */
  {
    slug: "nextjs-starter",
    number: "05",
    title: "Next.js SaaS Starter",
    category: "Launch-Ready Developer Foundation",
    shortDescription:
      "A developer starter kit removing every week-one setup task — auth, dashboard shell, analytics wiring and Supabase integration out of the box.",
    description:
      "A launch-ready developer foundation for shipping SaaS products faster. Authentication, dashboard shell, analytics wiring, Supabase integration and clean architecture — out of the box, documented and ready to extend.",

    role: "Product Engineer",
    productType: "Developer Starter Kit",
    stack: ["Next.js", "TypeScript", "Supabase", "Auth.js"],
    focus: ["Developer Experience", "Speed", "Architecture"],
    status: "Built",
    year: "2025",

    coverImage: "/nextjs-starter-cover.jpg",
    coverImageAlt: "Next.js SaaS starter kit with code snippets, auth flow and database schema",
    gallery: [
      {
        src: "/nextjs-starter-cover.jpg",
        alt: "Starter kit overview showing code, auth and schema panels",
        caption: "Kit Overview — Code, Auth Flow & Schema Visualization",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
        alt: "Starter kit analytics wiring and API diagram",
        caption: "Analytics Wiring — GA4 + API Data Flow",
      },
    ],

    overview:
      "A Next.js SaaS starter kit that eliminates the first week of every SaaS build. It ships with a working authentication system, a ready-to-use dashboard layout, Supabase database integration, analytics event wiring and a documented component structure — everything needed to start building product features on day one.",
    challenge:
      "Every SaaS product build begins with the same two weeks of setup: authentication, routing protection, database connection, dashboard layout, analytics integration. These weeks produce no product value — they just create the foundation that real work depends on. The starter kit was built to compress that setup to hours.",
    whatIBuilt:
      "A complete developer foundation covering five integration areas. A working authentication system with Supabase Auth handling sign-in, sign-up, session management and protected route middleware. A dashboard shell with persistent navigation and layout components. A Supabase integration layer with typed database helpers. Analytics event wiring for Google Analytics 4 with custom event tracking. Full documentation covering setup, extension and deployment.",
    highlights: [
      {
        title: "Authentication Out of the Box",
        description:
          "Working sign-in, sign-up, password reset and session management — production-ready with Supabase Auth and Next.js middleware.",
      },
      {
        title: "Dashboard Shell",
        description:
          "Persistent navigation layout with sidebar, header and content area — ready to drop product pages into immediately.",
      },
      {
        title: "Supabase Integration",
        description:
          "Typed database client, row-level security patterns and example queries covering the most common data operations.",
      },
      {
        title: "Analytics Wiring",
        description:
          "GA4 integration with page view tracking, custom event helpers and conversion event examples pre-connected.",
      },
      {
        title: "Documented Handoff",
        description:
          "Every integration point is documented: how to extend auth, add database tables, wire new analytics events and deploy to Vercel.",
      },
    ],
    architecture: [
      "Next.js App Router",
      "Dashboard UI Shell",
      "Auth Middleware",
      "Supabase Client",
      "PostgreSQL + RLS",
    ],
    engineeringDecisions: [
      {
        title: "Supabase as the all-in-one backend",
        description:
          "Supabase provides auth, database, storage and real-time subscriptions in a single integrated platform — eliminating the need to wire together separate auth and database services.",
      },
      {
        title: "Row-level security patterns",
        description:
          "All database access is secured via PostgreSQL row-level security policies rather than application-level guards alone, providing defence-in-depth without additional middleware complexity.",
      },
      {
        title: "Typed database helpers",
        description:
          "The Supabase schema is converted to TypeScript types via supabase-gen, giving full type safety from database query to UI component without manual type maintenance.",
      },
      {
        title: "Analytics as a first-class citizen",
        description:
          "GA4 and custom event tracking are wired in from the start — not bolted on later. This reflects the principle that measurement should be part of the initial build, not an afterthought.",
      },
    ],
    outcome:
      "Built a launch-ready foundation that reduces SaaS project setup from two weeks to under a day. The authentication system, Supabase integration and analytics wiring provide a complete, documented starting point for any SaaS product — allowing teams to skip boilerplate entirely and start building real product features immediately.",

    accent: "#22d3ee",
    href: "https://github.com/abdullahamarmusa",
    liveUrl: "https://github.com/abdullahamarmusa",

    image: "/nextjs-starter-cover.jpg",
    imageAlt: "Next.js SaaS starter kit",
    secondaryImages: [
      { src: "/nextjs-starter-cover.jpg", alt: "Starter kit overview", label: "Overview" },
    ],
    story: {
      problem: "Every new SaaS project starts with the same two weeks of boilerplate: auth, layout, data wiring — before any real product work happens.",
      outcome: "A launch-ready foundation that removes the boilerplate so product teams start building features on day one.",
    },
    product: "Starter Kit",
  },
];