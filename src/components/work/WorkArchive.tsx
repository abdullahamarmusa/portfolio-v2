import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { PROJECTS, type Project } from "../reusable/projects-data";
import { SectionLabel } from "../reusable/SectionLabel";
import { TechRadioGroup } from "./TechRadioGroup";

import "./WorkArchive.css";

/* ─────────────────────────────────────────────────────────────────────────────
   WORK ARCHIVE
   Layout: Left 40% = static header panel | Right 60% = scrolling card track
   ───────────────────────────────────────────────────────────────────────────── */

/* ── Radio-style info toggle (Stack ↔ Overview) ─────────────────────────── */
function ProjectCardInfo({ project }: { project: Project }) {
  const [view, setView] = useState<"stack" | "overview">("stack");
  return (
    <div className="wa-card-info">
      <div
        className="wa-card-info__toggle"
        role="radiogroup"
        aria-label={`${project.title} — choose what to show`}
      >
        <button
          type="button"
          role="radio"
          aria-checked={view === "stack"}
          onClick={() => setView("stack")}
          className={`wa-card-info__radio ${view === "stack" ? "is-active" : ""}`}
        >
          <span className="wa-card-info__dot" aria-hidden="true" />
          Stack
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={view === "overview"}
          onClick={() => setView("overview")}
          className={`wa-card-info__radio ${view === "overview" ? "is-active" : ""}`}
        >
          <span className="wa-card-info__dot" aria-hidden="true" />
          Overview
        </button>
      </div>

      {view === "stack" ? (
        <TechRadioGroup
          items={project.stack}
          label={`${project.title} — technologies used`}
          accent={project.accent}
        />
      ) : (
        <div className="wa-card-info__overview">
          <p className="wa-card-tokens__problem">{project.story?.problem}</p>
          {project.story?.outcome && (
            <p className="wa-card-tokens__outcome">{project.story.outcome}</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Static card (mobile fallback) ─────────────────────────────────────────── */
function StaticCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className="wa-static-card"
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <div className="wa-static-card__link">
        <Link to={`/work/${project.slug}`} className="wa-static-card__visual-anchor" aria-label={`${project.title} — case study`}>
          <div className="wa-static-card__visual">
            <img
              src={project.coverImage}
              alt={project.coverImageAlt}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              width={1400}
              height={875}
            />
          </div>
        </Link>
        <div className="wa-static-card__body">
          <div className="wa-card-tokens__meta-top">
            <span className="wa-card-tokens__number">{project.number}</span>
            <span className="wa-card-tokens__category">{project.category}</span>
          </div>
          <Link to={`/work/${project.slug}`} className="wa-film-card__title-anchor">
            <h3 className="wa-card-tokens__title">{project.title}</h3>
          </Link>
          {/* Info block — radio toggle between Stack and Overview */}
          <ProjectCardInfo project={project} />

          {/* CTA row — case study + live preview */}
          <div className="wa-card-tokens__cta-row">
            <Link to={`/work/${project.slug}`} className="wa-card-tokens__cta">
              View case study
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-card-tokens__cta wa-card-tokens__cta--live"
              aria-label={`${project.title} — live preview`}
            >
              Live preview
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 10L13 3M13 3H8M13 3v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Film card (desktop horizontal track) ─────────────────────────────────── */
function FilmCard({
  project,
  index,
  activeIndex,
}: {
  project: Project;
  index: number;
  activeIndex: number;
}) {
  const isActive = index === activeIndex;
  const isNext = index === activeIndex + 1;

  return (
    <article
      className={[
        "wa-film-card",
        isActive ? "is-active" : "",
        isNext ? "is-next" : "",
      ].join(" ")}
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <div className="wa-film-card__link">
        {/* Screenshot — clickable through to the case study */}
        <Link to={`/work/${project.slug}`} className="wa-film-card__visual-anchor" aria-label={`${project.title} — case study`}>
          <div className="wa-film-card__visual">
            <img
              src={project.coverImage}
              alt={project.coverImageAlt}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              width={1400}
              height={875}
            />
            <div className="wa-film-card__edge" />
            <div className="wa-film-card__glow" />
          </div>
        </Link>

        {/* Metadata strip below screenshot */}
        <div className="wa-film-card__meta">
          <div className="wa-film-card__meta-left">
            <div className="wa-card-tokens__meta-top">
              <span className="wa-card-tokens__number">{project.number}</span>
              <span className="wa-card-tokens__category">{project.category}</span>
            </div>
            <Link to={`/work/${project.slug}`} className="wa-film-card__title-anchor">
              <h3 className="wa-card-tokens__title">{project.title}</h3>
            </Link>
          </div>
          <div className="wa-film-card__meta-right">
            {/* Info block — radio toggle between Stack and Overview */}
            <ProjectCardInfo project={project} />

            {/* CTA row — case study + live preview */}
            <div className="wa-card-tokens__cta-row">
              <Link to={`/work/${project.slug}`} className="wa-card-tokens__cta">
                View case study
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-card-tokens__cta wa-card-tokens__cta--live"
                aria-label={`${project.title} — live preview`}
              >
                Live preview
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 10L13 3M13 3H8M13 3v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export function WorkArchive({ projects = PROJECTS }: { projects?: Project[] }) {
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Each project gets 100vh of scroll space
  // scroll 0→1 drives the track from 0 to -(n-1) card widths
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Card width = 55vw (of the full viewport, within the 60% right panel)
  // Step = card width + gap
  const CARD_VW = 55;   // vw — card is 55vw wide
  const GAP_VW  = 4;    // vw gap between cards
  const stepVw  = CARD_VW + GAP_VW;
  const totalSteps = projects.length - 1;

  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${totalSteps * stepVw}vw`]
  );

  // Update active index from scroll
  scrollYProgress.on("change", (v) => {
    const idx = Math.round(v * totalSteps);
    setActiveIndex(Math.max(0, Math.min(idx, projects.length - 1)));
  });

  /* ── Reduced-motion: plain vertical list ────────────────────────────── */
  if (reducedMotion) {
    return (
      <section id="work" className="wa-section">
        <div className="wa-static-wrapper">
          <header className="wa-static-header">
            <SectionLabel number="03">SELECTED WORK</SectionLabel>
            <h2 className="wa-static-header__heading">
              Selected <span className="wa-static-header__accent">Product Builds</span>
            </h2>
            <p className="wa-static-header__sub">
              Products I’ve designed and built — from SaaS dashboards to developer toolkits.
            </p>
          </header>
          <div className="wa-static-list">
            {projects.map((p, i) => <StaticCard key={p.slug} project={p} index={i} />)}
          </div>
        </div>
      </section>
    );
  }

  /* ── Desktop: split-panel horizontal scroll ─────────────────────────── */
  return (
    <section
      id="work"
      ref={sectionRef}
      className="wa-section"
      style={{ height: `${projects.length * 100}vh` }}
    >
      {/* Sticky container — pinned for the entire scroll duration */}
      <div className="wa-viewport">

        {/* Atmosphere */}
        <div className="wa-atmosphere" aria-hidden="true">
          <div className="wa-atmosphere__glow wa-atmosphere__glow--purple" />
          <div className="wa-atmosphere__glow wa-atmosphere__glow--pink" />
          <div className="wa-atmosphere__grain" />
        </div>

        {/* ── Left panel: 40% — header stays fixed ── */}
        <div className="wa-panel-left">
          <div className="wa-panel-left__inner">
            <SectionLabel number="03">SELECTED WORK</SectionLabel>

            <h2 className="wa-left-heading">
              Selected<br />
              <span className="wa-left-heading__accent">Product<br />Builds</span>
            </h2>

            <p className="wa-left-sub">
              Products I’ve designed and built — from SaaS dashboards and analytics
              platforms to digital marketplaces and developer systems.
            </p>

            {/* Progress */}
            <div className="wa-progress">
              <div className="wa-progress__dots">
                {projects.map((_, i) => (
                  <span
                    key={i}
                    className={`wa-progress__dot ${i === activeIndex ? "is-active" : ""}`}
                  />
                ))}
              </div>
              <span className="wa-progress__label">
                {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            <p className="wa-scroll-hint" aria-hidden="true">
              <svg width="12" height="16" viewBox="0 0 12 20" fill="none">
                <rect x="1" y="1" width="10" height="14" rx="5" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="6" cy="5" r="1.5" fill="currentColor" />
              </svg>
              Scroll to explore
            </p>
          </div>
        </div>

        {/* ── Right panel: 60% — clips the scrolling track ── */}
        <div className="wa-panel-right">
          <motion.div
            className="wa-track"
            style={{ x: translateX }}
          >
            {projects.map((p, i) => (
              <FilmCard
                key={p.slug}
                project={p}
                index={i}
                activeIndex={activeIndex}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile fallback — hidden on desktop */}
      <div className="wa-mobile-only">
        <div className="wa-static-wrapper">
          <header className="wa-static-header">
            <SectionLabel number="03">SELECTED WORK</SectionLabel>
            <h2 className="wa-static-header__heading">
              Selected <span className="wa-static-header__accent">Product Builds</span>
            </h2>
          </header>
          <div className="wa-static-list">
            {projects.map((p, i) => <StaticCard key={p.slug} project={p} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkArchive;
