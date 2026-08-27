import React from 'react';

export interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

declare const ScrollReveal: React.MemoExoticComponent<React.FC<ScrollRevealProps>>;

export default ScrollReveal;