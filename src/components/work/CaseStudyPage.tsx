import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useReducedMotion, motion } from "motion/react";
import { PROJECTS } from "../reusable/projects-data";
import { TechRadioGroup } from "./TechRadioGroup";
import "./CaseStudyPage.css";

/* ─────────────────────────────────────────────────────────────────────────────
   CASE STUDY PAGE — /work/:slug
   Full editorial case study for a single project.
   Structure:
     Hero → Overview → Challenge → What I Built → Highlights →
     Architecture → Gallery → Engineering Decisions → Outcome → CTA → Prev/Next
   ───────────────────────────────────────────────────────────────────────────── */

/* ── Architecture diagram ─────────────────────────────────────────────────── */
function ArchDiagram({ nodes, accent }: { nodes: string[]; accent: string }) {
  return (
    <div
      className="cs-arch"
      style={{ "--arch-accent": accent } as React.CSSProperties}
    >
      {nodes.map((node, i) => (
        <React.Fragment key={node}>
          <div className="cs-arch__node">
            <span>{node}</span>
          </div>
          {i < nodes.length - 1 && (
            <div className="cs-arch__connector" aria-hidden="true">
              <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                <path
                  d="M8 0v18M2 12l6 8 6-8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── Highlight card ───────────────────────────────────────────────────────── */
function HighlightCard({
  title,
  description,
  index,
  accent,
}: {
  title: string;
  description: string;
  index: number;
  accent: string;
}) {
  return (
    <div
      className="cs-highlight"
      style={{ "--hl-accent": accent } as React.CSSProperties}
    >
      <span className="cs-highlight__index">0{index + 1}</span>
      <strong className="cs-highlight__title">{title}</strong>
      <p className="cs-highlight__desc">{description}</p>
    </div>
  );
}

/* ── Engineering decision card ────────────────────────────────────────────── */
function DecisionCard({
  title,
  description,
  index,
  accent,
}: {
  title: string;
  description: string;
  index: number;
  accent: string;
}) {
  return (
    <div
      className="cs-decision"
      style={{ "--dec-accent": accent } as React.CSSProperties}
    >
      <div className="cs-decision__header">
        <span className="cs-decision__index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <strong className="cs-decision__title">{title}</strong>
      </div>
      <p className="cs-decision__desc">{description}</p>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────────────────── */
export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const reducedMotion = Boolean(useReducedMotion());
  const heroRef = useRef<HTMLElement>(null);

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];
  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null;
  const nextProject =
    projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : null;

  const [activeSection, setActiveSection] = useState("cs-s1");

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  }, [slug, reducedMotion]);

  // Section observer for sticky nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );
    
    document.querySelectorAll(".cs-section").forEach((sec) => {
      observer.observe(sec);
    });
    
    return () => observer.disconnect();
  }, [slug]);

  // 404 handling
  if (!project) {
    return (
      <main className="cs-notfound">
        <div className="cs-notfound__inner">
          <span className="cs-notfound__code">404</span>
          <h1>Project not found</h1>
          <p>This case study doesn’t exist or has moved.</p>
          <Link to="/#work" className="cs-btn cs-btn--primary">
            ← Back to Work
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="cs-page"
      style={{ "--cs-accent": project.accent } as React.CSSProperties}
    >
      {/* ── Background atmosphere ───────────────────────────────── */}
      <div className="cs-atmosphere" aria-hidden="true">
        <div className="cs-atmosphere__glow cs-atmosphere__glow--top" />
        <div className="cs-atmosphere__glow cs-atmosphere__glow--mid" />
        <div className="cs-atmosphere__grain" />
      </div>

      {/* ══════════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="cs-hero" aria-labelledby="cs-hero-title">
        <div className="cs-shell">
          {/* Back link */}
          <Link to="/#work" className="cs-back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M13 8H3M7 12l-4-4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Selected Work
          </Link>

          {/* Number + category */}
          <div className="cs-hero__eyebrow">
            <span className="cs-hero__number">{project.number}</span>
            <div className="cs-hero__eyebrow-line" aria-hidden="true" />
            <span className="cs-hero__category">{project.category.toUpperCase()}</span>
          </div>

          {/* Title */}
          <h1 id="cs-hero-title" className="cs-hero__title">
            {project.title}
          </h1>

          {/* Description */}
          <p className="cs-hero__desc">{project.description}</p>

          {/* Metadata grid */}
          <dl className="cs-meta">
            <div className="cs-meta__item">
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div className="cs-meta__item">
              <dt>Product Type</dt>
              <dd>{project.productType}</dd>
            </div>
            <div className="cs-meta__item">
              <dt>Stack</dt>
              <dd>
                <TechRadioGroup
                  items={project.stack}
                  label="Technologies used in this project"
                  accent={project.accent}
                />
              </dd>
            </div>
            <div className="cs-meta__item">
              <dt>Focus</dt>
              <dd>{project.focus.join(" · ")}</dd>
            </div>
            <div className="cs-meta__item">
              <dt>Status</dt>
              <dd>
                <span className="cs-status">{project.status}</span>
              </dd>
            </div>
            <div className="cs-meta__item">
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>
        </div>

        {/* Hero Product Media */}
        <div className="cs-hero-media">
          <motion.div
            className="cs-hero-media-frame"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Optional subtle browser-like chrome for Nuvora */}
            {project.slug === "nuvora" && (
              <div className="cs-hero-media-chrome" aria-hidden="true">
                <div className="cs-hero-media-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="cs-hero-media-title">nuvora.app</div>
              </div>
            )}
            
            <img
              src={project.coverImage}
              alt={project.coverImageAlt}
              loading="eager"
              decoding="async"
              width={1400}
              height={875}
              className="cs-hero-img"
            />
            <div className="cs-hero-media-glow" aria-hidden="true" />
            <div className="cs-hero-media-edge" aria-hidden="true" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CONTENT BODY
          ══════════════════════════════════════════════════════════ */}
      <div className="cs-body">
        
        {/* Sticky Sidebar Navigation */}
        <aside className="cs-sidebar">
          <nav className="cs-sticky-nav" aria-label="Table of contents">
            <a href="#cs-s1" className={`cs-sticky-link ${activeSection === 'cs-s1' ? 'is-active' : ''}`}>01 Overview</a>
            <a href="#cs-s2" className={`cs-sticky-link ${activeSection === 'cs-s2' ? 'is-active' : ''}`}>02 Challenge</a>
            <a href="#cs-s3" className={`cs-sticky-link ${activeSection === 'cs-s3' ? 'is-active' : ''}`}>03 Product</a>
            <a href="#cs-s4" className={`cs-sticky-link ${activeSection === 'cs-s4' ? 'is-active' : ''}`}>04 What I Built</a>
            {project.gallery && project.gallery.length > 0 && (
              <a href="#cs-s5" className={`cs-sticky-link ${activeSection === 'cs-s5' ? 'is-active' : ''}`}>05 Product Experience</a>
            )}
            {project.architecture && project.architecture.length > 0 && (
              <a href="#cs-s6" className={`cs-sticky-link ${activeSection === 'cs-s6' ? 'is-active' : ''}`}>06 Architecture</a>
            )}
            {project.engineeringDecisions && project.engineeringDecisions.length > 0 && (
              <a href="#cs-s7" className={`cs-sticky-link ${activeSection === 'cs-s7' ? 'is-active' : ''}`}>07 Decisions</a>
            )}
            <a href="#cs-s8" className={`cs-sticky-link ${activeSection === 'cs-s8' ? 'is-active' : ''}`}>08 Outcome</a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="cs-main">

          {/* ── 01 Overview ────────────────────────────────────── */}
          <section id="cs-s1" className="cs-section" aria-labelledby="cs-s1-title">
            <div className="cs-section__header">
              <h2 id="cs-s1-title" className="cs-section__title">01 Overview</h2>
            </div>
            <div className="cs-section__content">
              <p className="cs-prose cs-prose--lead">{project.overview}</p>
            </div>
          </section>

          <div className="cs-sep" aria-hidden="true" />

          {/* ── 02 Challenge ───────────────────────────────────── */}
          <section id="cs-s2" className="cs-section" aria-labelledby="cs-s2-title">
            <div className="cs-section__header">
              <h2 id="cs-s2-title" className="cs-section__title">02 Challenge</h2>
            </div>
            <div className="cs-section__content">
              {project.challenge.split('\n').map((paragraph, idx) => (
                paragraph.trim() && <p key={idx} className="cs-prose">{paragraph}</p>
              ))}
            </div>
          </section>

          <div className="cs-sep" aria-hidden="true" />

          {/* ── 03 Product ─────────────────────────────────────── */}
          <section id="cs-s3" className="cs-section" aria-labelledby="cs-s3-title">
            <div className="cs-section__header">
              <h2 id="cs-s3-title" className="cs-section__title">03 Product</h2>
            </div>
            <div className="cs-section__content">
              <figure className="cs-product-fig">
                <img 
                  src={project.coverImage} 
                  alt={project.coverImageAlt}
                  loading="lazy"
                  className="cs-product-img"
                />
                <figcaption className="cs-product-caption">
                  {project.title} — {project.category}
                </figcaption>
              </figure>
            </div>
          </section>

          <div className="cs-sep" aria-hidden="true" />

          {/* ── 04 What I Built ────────────────────────────────── */}
          <section id="cs-s4" className="cs-section" aria-labelledby="cs-s4-title">
            <div className="cs-section__header">
              <h2 id="cs-s4-title" className="cs-section__title">04 What I Built</h2>
            </div>
            <div className="cs-section__content">
              <p className="cs-prose">{project.whatIBuilt}</p>
              
              <div className="cs-capabilities">
                {project.highlights.map((h, i) => (
                  <HighlightCard
                    key={h.title}
                    title={h.title}
                    description={h.description}
                    index={i}
                    accent={project.accent}
                  />
                ))}
              </div>
            </div>
          </section>

          <div className="cs-sep" aria-hidden="true" />

          {/* ── 05 Product Experience ──────────────────────────── */}
          {project.gallery && project.gallery.length > 0 && (
            <section id="cs-s5" className="cs-section" aria-labelledby="cs-s5-title">
              <div className="cs-section__header">
                <h2 id="cs-s5-title" className="cs-section__title">05 Product Experience</h2>
              </div>
              <div className="cs-section__content">
                <div className="cs-gallery-grid">
                  {project.gallery.map((img, i) => (
                    <figure
                      key={img.src + i}
                      className={`cs-gallery-item cs-gallery-item--${img.size || 'medium'}`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                      />
                      {img.caption && (
                        <figcaption>{img.caption}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="cs-sep" aria-hidden="true" />
          )}

          {/* ── 06 Architecture ────────────────────────────────── */}
          {project.architecture && project.architecture.length > 0 && (
            <>
              <section id="cs-s6" className="cs-section" aria-labelledby="cs-s6-title">
                <div className="cs-section__header">
                  <h2 id="cs-s6-title" className="cs-section__title">06 Architecture</h2>
                </div>
                <div className="cs-section__content">
                  <ArchDiagram nodes={project.architecture} accent={project.accent} />
                  <p className="cs-prose cs-prose--sm mt-6">
                    A clean layered architecture designed to cleanly separate UI components from business logic and data fetching, enabling rapid iteration and future extensibility.
                  </p>
                </div>
              </section>
              <div className="cs-sep" aria-hidden="true" />
            </>
          )}

          {/* ── 07 Engineering Decisions ───────────────────────── */}
          {project.engineeringDecisions && project.engineeringDecisions.length > 0 && (
            <>
              <section id="cs-s7" className="cs-section" aria-labelledby="cs-s7-title">
                <div className="cs-section__header">
                  <h2 id="cs-s7-title" className="cs-section__title">07 Engineering Decisions</h2>
                </div>
                <div className="cs-section__content">
                  <div className="cs-decisions">
                    {project.engineeringDecisions.map((d, i) => (
                      <DecisionCard
                        key={d.title}
                        title={d.title}
                        description={d.description}
                        index={i}
                        accent={project.accent}
                      />
                    ))}
                  </div>
                </div>
              </section>
              <div className="cs-sep" aria-hidden="true" />
            </>
          )}

          {/* ── 08 Outcome ─────────────────────────────────────── */}
          <section id="cs-s8" className="cs-section" aria-labelledby="cs-s8-title">
            <div className="cs-section__header">
              <h2 id="cs-s8-title" className="cs-section__title">08 Outcome</h2>
            </div>
            <div className="cs-section__content">
              <div className="cs-outcome-list">
                {project.outcome.split('\n').map((bullet, idx) => (
                  bullet.trim() && (
                    <p key={idx} className="cs-prose">
                      {bullet.trim()}
                    </p>
                  )
                ))}
              </div>
            </div>
          </section>

        </div>{/* end cs-main */}
      </div>{/* end cs-body */}

      {/* ══════════════════════════════════════════════════════════
          09 — CTA
          ══════════════════════════════════════════════════════════ */}
      <section className="cs-cta-section" aria-labelledby="cs-cta-heading">
        <div className="cs-cta-section__glow" aria-hidden="true" />
        <div className="cs-shell cs-cta-inner">
          <p className="cs-cta-section__eyebrow">09 — Let’s build together</p>
          <h2 id="cs-cta-heading" className="cs-cta-section__heading">
            Have a product that<br />needs to be built?
          </h2>
          <p className="cs-cta-section__sub">
            Let’s turn your idea into a polished, production-ready experience.
          </p>
          <a href="/#contact" className="cs-btn cs-btn--primary">
            Start a Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PREV / NEXT NAVIGATION
          ══════════════════════════════════════════════════════════ */}
      <nav className="cs-nav" aria-label="Project navigation">
        <div className="cs-shell cs-nav__inner">
          {prevProject ? (
            <Link to={`/work/${prevProject.slug}`} className="cs-nav__link cs-nav__link--prev">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M16 10H4M9 5l-5 5 5 5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                <span className="cs-nav__label">Previous Project</span>
                <span className="cs-nav__name">{prevProject.title}</span>
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link to={`/work/${nextProject.slug}`} className="cs-nav__link cs-nav__link--next">
              <span>
                <span className="cs-nav__label">Next Project</span>
                <span className="cs-nav__name">{nextProject.title}</span>
              </span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M4 10h12M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ) : (
            <Link to="/#work" className="cs-nav__link cs-nav__link--next">
              <span>
                <span className="cs-nav__label">Back to</span>
                <span className="cs-nav__name">Selected Work</span>
              </span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M4 10h12M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}
