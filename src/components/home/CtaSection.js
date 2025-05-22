'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import AuroraBackground from '../shared/AuroraBackground';

const CtaSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

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
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Aurora Background */}
      <AuroraBackground
        colors={['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B']}
        speed={2}
        intensity={8}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-emerald-400"
            variants={itemVariants}
          >
            Ready to launch your website?
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            From name to website in 30 seconds. No builders, no code, no drag-and-drop. Just your professional website, instantly.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <Link href="/demo">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-medium rounded-full text-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 w-full sm:w-auto"
                whileHover={{ scale: 1.05, boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                Try It Now
              </motion.button>
            </Link>

            <Link href="/templates">
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-full text-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Templates
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-8"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-2">30+</div>
              <div className="text-gray-400">Templates</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-2">5,000+</div>
              <div className="text-gray-400">Websites Created</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-2">99%</div>
              <div className="text-gray-400">Satisfaction Rate</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
