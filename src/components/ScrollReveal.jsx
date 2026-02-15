import React, { useEffect, useRef, useState, useMemo } from 'react';

const ScrollReveal = React.memo(({ children, delay = 0, className = '', once = true }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const combinedClasses = useMemo(() =>
    `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    } ${className}`,
    [visible, className]
  );

  const inlineStyle = useMemo(() =>
    ({ transitionDelay: visible ? `${delay}ms` : '0ms' }),
    [visible, delay]
  );

  return (
    <div ref={ref} className={combinedClasses} style={inlineStyle}>
      {children}
    </div>
  );
});

ScrollReveal.displayName = 'ScrollReveal';

export default ScrollReveal;
