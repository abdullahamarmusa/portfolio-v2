import React, { useEffect } from "react";
import { useMotionValue, useSpring, motion } from "motion/react";
import type { Project } from "../reusable/projects-data";

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECT CURSOR PREVIEW
   A small floating image card that follows the cursor on desktop when hovering
   a project row. Disabled on touch / coarse pointer devices.
   ───────────────────────────────────────────────────────────────────────────── */

type Props = {
  project: Project | null;
  position: { x: number; y: number };
};

export default function ProjectCursorPreview({ project, position }: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Spring physics for smooth cursor following
  const springX = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.5 });
  const springY = useSpring(my, { stiffness: 180, damping: 22, mass: 0.5 });

  useEffect(() => {
    // Offset so the preview doesn't sit directly under the cursor
    mx.set(position.x + 24);
    my.set(position.y - 80);
  }, [position.x, position.y, mx, my]);

  const visible = project !== null;

  return (
    <motion.div
      className="wcp-preview"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x: springX,
        y: springY,
        pointerEvents: "none",
        zIndex: 9000,
        "--preview-accent": project?.accent ?? "#a855f7",
      } as React.CSSProperties}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.88,
      }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {project && (
        <figure className="wcp-figure">
          <img
            src={project.coverImage}
            alt={project.coverImageAlt}
            width={220}
            height={138}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="wcp-caption">
            <span className="wcp-caption__number">{project.number}</span>
            <span className="wcp-caption__title">{project.title}</span>
          </figcaption>
        </figure>
      )}
    </motion.div>
  );
}
