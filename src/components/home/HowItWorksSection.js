'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const steps = timelineRef.current.querySelectorAll('.step-item');
      const progressLine = timelineRef.current.querySelector('.progress-line');

      if (!steps.length || !progressLine) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1,
        1 - (rect.bottom - window.innerHeight) / (rect.height + window.innerHeight)
      ));

      // Update progress line
      progressLine.style.height = `${scrollProgress * 100}%`;

      // Update steps
      steps.forEach((step, index) => {
        const stepProgress = Math.max(0, Math.min(1,
          (scrollProgress * steps.length) - index
        ));

        const circle = step.querySelector('.step-circle');
        const content = step.querySelector('.step-content');

        if (circle) {
          circle.style.backgroundColor = stepProgress > 0.5 ? '#10B981' : '';
          circle.style.borderColor = stepProgress > 0.5 ? '#10B981' : '';
        }

        if (content) {
          content.style.opacity = stepProgress;
          content.style.transform = `translateY(${(1 - stepProgress) * 20}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Steps data
  const steps = [
    {
      number: '01',
      title: 'Enter Your Business Details',
      description: 'Provide your business name and upload your logo to get started.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Choose Your Template',
      description: 'Browse our library of professionally designed templates and select your favorite.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Customize Your Site',
      description: 'Personalize colors, fonts, and content to match your brand identity.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Preview Your Website',
      description: 'See your live website instantly with all your customizations applied.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      number: '05',
      title: 'Publish Your Site',
      description: 'Launch your website on our free subdomain or connect your custom domain.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
  ];

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
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Creating your professional website is simple and takes just minutes with our streamlined process.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative" ref={timelineRef}>
          {/* Progress Line */}
          <div className="absolute left-[28px] top-0 bottom-0 w-1 bg-gray-700 z-0">
            <div className="progress-line absolute left-0 top-0 w-full bg-gradient-to-b from-blue-500 to-emerald-500 h-0"></div>
          </div>

          {/* Steps */}
          <motion.div
            className="relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="step-item flex mb-12 last:mb-0"
                variants={itemVariants}
              >
                <div className="step-circle w-14 h-14 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center flex-shrink-0 z-10">
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>

                <div className="step-content ml-6 pt-2 opacity-50 translate-y-4">
                  <div className="text-sm font-semibold text-emerald-400 mb-1">{step.number}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
