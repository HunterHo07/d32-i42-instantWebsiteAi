'use client';

import { motion } from 'framer-motion';

/**
 * A reusable glassmorphism card component with hover effects
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Card content
 * @param {number} props.blurStrength - Blur strength (1-20)
 * @param {number} props.opacity - Background opacity (0-1)
 * @param {boolean} props.hoverEffect - Enable hover effect
 * @param {string} props.borderColor - Border color
 * @param {string} props.backgroundColor - Background color (with opacity)
 * @returns {JSX.Element} Glassmorphic card component
 */
const GlassmorphicCard = ({
  className = '',
  children,
  blurStrength = 10,
  opacity = 0.2,
  hoverEffect = true,
  borderColor = 'rgba(255, 255, 255, 0.1)',
  backgroundColor = 'rgba(255, 255, 255, 0.05)',
}) => {
  // Base styles for the glassmorphic effect
  const baseStyles = {
    backgroundColor,
    backdropFilter: `blur(${blurStrength}px)`,
    WebkitBackdropFilter: `blur(${blurStrength}px)`,
    borderRadius: '16px',
    border: `1px solid ${borderColor}`,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  };

  // Hover animation variants
  const hoverVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className={`p-6 ${className}`}
      style={baseStyles}
      initial="initial"
      whileHover={hoverEffect ? 'hover' : 'initial'}
      variants={hoverVariants}
    >
      {children}
    </motion.div>
  );
};

export default GlassmorphicCard;
