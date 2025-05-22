'use client';

import { useEffect, useRef } from 'react';

/**
 * Aurora lights background effect using canvas
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {Array} props.colors - Array of colors for the aurora
 * @param {number} props.speed - Animation speed (1-10)
 * @param {number} props.intensity - Effect intensity (1-10)
 * @returns {JSX.Element} Aurora background component
 */
const AuroraBackground = ({
  className = '',
  colors = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b'],
  speed = 3,
  intensity = 5,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Aurora parameters
    const auroraParams = {
      waves: 3 + Math.floor(intensity / 2),
      waveHeight: 0.2 + (intensity * 0.05),
      waveSpeed: 0.01 * speed,
      colorOffset: 0,
    };
    
    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Create gradient from colors
    const createGradient = (ctx, colors, y) => {
      const gradient = ctx.createLinearGradient(0, y - 200, 0, y + 200);
      
      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
      });
      
      return gradient;
    };
    
    // Animation function
    const animate = (time) => {
      ctx.clearRect(0, 0, width, height);
      
      // Update color offset for shifting colors
      auroraParams.colorOffset = (auroraParams.colorOffset + 0.0003 * speed) % 1;
      
      // Draw each wave
      for (let w = 0; w < auroraParams.waves; w++) {
        const waveOffset = w * (Math.PI * 2) / auroraParams.waves;
        const waveHeight = height * 0.3 * auroraParams.waveHeight;
        const baseY = height * 0.5;
        
        // Shift colors for each wave
        const shiftedColors = [...colors];
        if (w % 2 === 1) {
          shiftedColors.push(shiftedColors.shift());
        }
        
        ctx.beginPath();
        
        // Draw wave path
        for (let x = 0; x <= width; x += 5) {
          const normalizedX = x / width;
          const phase = time * auroraParams.waveSpeed + waveOffset;
          
          // Calculate wave y position with multiple sine waves for complexity
          const y = baseY + 
            Math.sin(normalizedX * 5 + phase) * waveHeight * 0.5 +
            Math.sin(normalizedX * 10 + phase * 0.8) * waveHeight * 0.3 +
            Math.sin(normalizedX * 20 + phase * 1.2) * waveHeight * 0.2;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Complete the path to the bottom of the canvas
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        // Fill with gradient
        const gradient = createGradient(ctx, shiftedColors, baseY);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.2 + (0.05 * w);
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, speed, intensity]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 ${className}`}
    />
  );
};

export default AuroraBackground;
