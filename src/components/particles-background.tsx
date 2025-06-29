"use client";

import React, { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount = 50;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = '2px';
      particle.style.height = '2px';
      particle.style.backgroundColor = 'hsl(var(--primary))';
      particle.style.borderRadius = '50%';
      particle.style.opacity = '0.6';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      // Define animation
      particle.animate([
        { transform: `translate(0, 0)`, opacity: 0.1 },
        { transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px)`, opacity: 0.8 },
        { transform: `translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px)`, opacity: 0.1 }
      ], {
        duration: Math.random() * 15000 + 10000,
        iterations: Infinity,
        delay: Math.random() * -25000,
        direction: 'alternate',
        easing: 'ease-in-out'
      });
      
      fragment.appendChild(particle);
    }
    container.appendChild(fragment);

    return () => {
        if (container) {
            container.innerHTML = '';
        }
    }
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};

export default ParticlesBackground;
