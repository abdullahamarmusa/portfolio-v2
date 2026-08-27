import React from 'react';

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Pricing Card types
export interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  pricePeriod: string;
  description: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
  buttonAction: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  gradient?: string;
  delay?: number;
  bestFor?: string;
  valueAnchor?: string;
  secondaryCTAText?: string;
  secondaryCTAAction?: string;
  microProof?: string[];
  priceLabel?: string;
  scope?: string;
  delivery?: string;
  ctaHint?: string;
  accent?: 'violet' | 'featured' | 'blue';
}

// FAQ types
export interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

// Case Study types
export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyProps {
  title: string;
  metrics: CaseStudyMetric[];
  description: string;
  techStack: string[];
  architecturalDecision: string;
  image: string;
  link: string;
}

// Contact Form types
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  budget: string;
  message: string;
}

// Tech Stack types
export interface TechStackItem {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'design';
}
