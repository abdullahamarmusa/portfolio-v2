import React, { useState } from 'react';
import { TechLogo } from './TechLogo';
import './TechRadioGroup.css';

/* ─────────────────────────────────────────────────────────────────────────────
   TECH RADIO GROUP — radio-style technology pills
   Shared by the Work Archive cards and Case Study pages so every
   technology list in a project context renders identically.
   One option is always selected (radio semantics); clicking a pill moves it.
   ───────────────────────────────────────────────────────────────────────────── */
function TechRadioGroup({
  items,
  label,
  accent,
}: {
  items: string[];
  label: string;
  accent?: string;
}) {
  const [selected, setSelected] = useState<string>(items[0] ?? '');

  return (
    <div
      className="trg"
      role="radiogroup"
      aria-label={label}
      style={accent ? ({ '--project-accent': accent } as React.CSSProperties) : undefined}
    >
      {items.map(tech => {
        const isActive = selected === tech;
        return (
          <button
            key={tech}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => setSelected(tech)}
            className={`trg__radio ${isActive ? 'is-active' : ''}`}
          >
            <span className="trg__logo" aria-hidden="true">
              <TechLogo name={tech} />
            </span>
            {tech}
          </button>
        );
      })}
    </div>
  );
}

export { TechRadioGroup };
