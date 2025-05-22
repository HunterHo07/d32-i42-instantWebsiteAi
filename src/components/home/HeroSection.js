'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useWebsiteContext } from '@/hooks/useWebsiteContext';
import ParticleBackground from '../shared/ParticleBackground';
import GlassmorphicCard from '../shared/GlassmorphicCard';
import Link from 'next/link';

const HeroSection = () => {
  const { updateBusinessName, updateLogo } = useWebsiteContext();
  const [businessName, setBusinessName] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Animate when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Handle logo file selection
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result);
      updateLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle business name change
  const handleNameChange = (e) => {
    setBusinessName(e.target.value);
    updateBusinessName(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to demo page with query params
      window.location.href = `/demo?name=${encodeURIComponent(businessName)}`;
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Particle options
  const particleOptions = {
    particles: {
      color: {
        value: ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"],
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 60,
      },
      opacity: {
        value: 0.5,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground options={particleOptions} />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={containerRef}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left Column - Text */}
          <motion.div className="lg:w-1/2" variants={itemVariants}>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-400 to-emerald-400"
              variants={itemVariants}
            >
              From name to website in 30 seconds
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-xl"
              variants={itemVariants}
            >
              Just enter your business name, upload a logo, and see your site live on a free subdomain in seconds. No builders, no code, no drag-and-drop.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-300">AI-Powered Design</span>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-300">Human Quality Control</span>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-300">Free Subdomain</span>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-300">7-Day Design Guarantee</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div className="lg:w-1/2" variants={itemVariants}>
            <GlassmorphicCard className="w-full max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">Create Your Website</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="businessName" className="block text-gray-300 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    value={businessName}
                    onChange={handleNameChange}
                    placeholder="e.g. Acme Inc"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="logo" className="block text-gray-300 mb-2">
                    Logo (optional)
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300">Upload Logo</span>
                      <input
                        type="file"
                        id="logo"
                        onChange={handleLogoChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>

                    {logoPreview && (
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating your website...
                    </span>
                  ) : (
                    'Create My Website'
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/templates" className="text-blue-400 hover:text-blue-300 text-sm">
                  Browse templates first
                </Link>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
