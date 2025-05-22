'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import { templates } from '@/data/templates';
import GlassmorphicCard from '../shared/GlassmorphicCard';

const TemplateCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  // Animate when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % templates.length);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  // Handle template selection
  const handleTemplateClick = (index) => {
    setActiveIndex(index);
    setAutoplay(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-gray-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Beautiful Templates
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose from our collection of professionally designed templates for any industry or purpose.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Featured Template */}
          <motion.div
            className="lg:col-span-2 relative overflow-hidden rounded-xl"
            variants={itemVariants}
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-xl overflow-hidden">
              <motion.img
                src={`/images/templates/${templates[activeIndex].id}.webp`}
                alt={templates[activeIndex].name}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x450?text=Template+Preview";
                }}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">{templates[activeIndex].name}</h3>
              <p className="text-gray-300 mb-4">
                {templates[activeIndex].category} Template
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {templates[activeIndex].features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 bg-opacity-70 rounded-full text-sm text-gray-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <Link href={`/demo?template=${templates[activeIndex].id}`}>
                <motion.button
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try This Template
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Template Selection */}
          <motion.div variants={itemVariants}>
            <GlassmorphicCard className="h-full">
              <h3 className="text-xl font-semibold text-white mb-4">Choose a Template</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {templates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeIndex === index ? 'bg-gray-800 ring-2 ring-blue-500' : 'bg-gray-800 bg-opacity-50 hover:bg-opacity-70'
                    }`}
                    onClick={() => handleTemplateClick(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-700 flex-shrink-0">
                        <img
                          src={`/images/templates/${template.id}.webp`}
                          alt={template.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/64?text=Template";
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-white">{template.name}</h4>
                        <p className="text-sm text-gray-400">{template.category}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/templates">
                  <motion.button
                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View All Templates
                  </motion.button>
                </Link>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </motion.div>

        {/* Template Indicators */}
        <div className="flex justify-center space-x-2">
          {templates.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'bg-blue-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => handleTemplateClick(index)}
              aria-label={`View template ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateCarousel;
