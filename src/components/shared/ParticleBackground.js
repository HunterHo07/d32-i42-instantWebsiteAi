'use client';

import { useEffect, useRef } from 'react';

/**
 * Simple particle background component using canvas
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.options - Custom particle options to override defaults
 * @returns {JSX.Element} Particle background component
 */
const ParticleBackground = ({
  className = '',
  options = {}
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Particle settings
    const particleCount = options.particles?.number?.value || 60;
    const particleSize = options.particles?.size?.value || { min: 1, max: 3 };
    const particleSpeed = options.particles?.move?.speed || 1;
    const particleColors = options.particles?.color?.value || ['#ffffff'];
    const particleOpacity = options.particles?.opacity?.value || 0.3;
    const enableLinks = options.particles?.links?.enable !== false;
    const linkDistance = options.particles?.links?.distance || 150;
    const linkOpacity = options.particles?.links?.opacity || 0.2;
    const linkColor = options.particles?.links?.color || '#ffffff';

    // Create particles
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const size = typeof particleSize === 'object'
        ? Math.random() * (particleSize.max - particleSize.min) + particleSize.min
        : particleSize;

      const color = Array.isArray(particleColors)
        ? particleColors[Math.floor(Math.random() * particleColors.length)]
        : particleColors;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        color,
        speedX: (Math.random() - 0.5) * particleSpeed,
        speedY: (Math.random() - 0.5) * particleSpeed,
        opacity: particleOpacity
      });
    }

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction
    let mouse = { x: null, y: null, radius: 100 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        // Mouse repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;

            p.x -= Math.cos(angle) * force * 2;
            p.y -= Math.sin(angle) * force * 2;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw links between particles
      if (enableLinks) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < linkDistance) {
              ctx.beginPath();
              ctx.strokeStyle = linkColor;
              ctx.globalAlpha = linkOpacity * (1 - distance / linkDistance);
              ctx.lineWidth = 1;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [options]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 ${className}`}
    />
  );
};

export default ParticleBackground;
