import { motion } from "motion/react";

/**
 * Shared section label used by both the Capabilities and Stack sections.
 * Includes an `inverse` variant for dark-on-dark contexts.
 */
export function SectionLabel({
  number,
  children,
  inverse = false,
}: {
  number: string;
  children: string;
  inverse?: boolean;
}) {
  return (
    <motion.div
      className={`section-label ${inverse ? "section-label--inverse" : ""}`}
      initial={{ opacity: 0, x: -48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <span>{number}</span>
      <span>{children}</span>
    </motion.div>
  );
}
