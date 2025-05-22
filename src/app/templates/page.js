'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageLayout from '@/components/shared/PageLayout';
import GlassmorphicCard from '@/components/shared/GlassmorphicCard';
import ParticleBackground from '@/components/shared/ParticleBackground';
import { templates, getTemplateCategories } from '@/data/templates';
import Link from 'next/link';

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Get all template categories
  const categories = getTemplateCategories();
  
  // Filter templates by category
  const filteredTemplates = activeCategory === 'All'
    ? templates
    : templates.filter(template => template.category === activeCategory);
  
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
  
  // Particle options
  const particleOptions = {
    particles: {
      color: {
        value: ["#3B82F6", "#10B981", "#8B5CF6"],
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      number: {
        value: 40,
      },
      opacity: {
        value: 0.3,
      },
    },
  };
  
  return (
    <PageLayout>
      <div className="min-h-screen py-20">
        <ParticleBackground options={particleOptions} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Website Templates
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Browse our collection of professionally designed templates for any industry or purpose.
              </p>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
            
            {/* Templates Grid */}
            <motion.div
              ref={sectionRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {filteredTemplates.map((template) => (
                <motion.div key={template.id} variants={itemVariants}>
                  <GlassmorphicCard className="h-full overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9 -mx-6 -mt-6 mb-6 bg-gray-800 overflow-hidden">
                      <img
                        src={`/images/templates/${template.id}.webp`}
                        alt={template.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/800x450?text=Template+Preview";
                        }}
                      />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                    <p className="text-gray-400 mb-4">{template.category}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {template.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto flex gap-3">
                      <Link href={`/demo?template=${template.id}`} className="flex-1">
                        <motion.button
                          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Try Template
                        </motion.button>
                      </Link>
                      
                      <motion.button
                        className="py-2 px-4 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Preview
                      </motion.button>
                    </div>
                  </GlassmorphicCard>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Call to Action */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Don't see what you're looking for?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                We're constantly adding new templates to our collection. Contact us if you need a custom template for your specific industry or purpose.
              </p>
              <Link href="/demo">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-medium rounded-full text-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try the Demo
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
