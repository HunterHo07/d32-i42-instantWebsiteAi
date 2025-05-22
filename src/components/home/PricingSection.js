'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GlassmorphicCard from '../shared/GlassmorphicCard';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Pricing data
  const pricingPlans = [
    {
      name: 'Free',
      description: 'Perfect for exploring our templates',
      price: {
        monthly: 0,
        annual: 0,
      },
      features: [
        'Browse all templates',
        'Generate live preview',
        'Download static HTML',
        'No login required',
      ],
      cta: 'Get Started',
      ctaLink: '/demo',
      highlighted: false,
    },
    {
      name: 'Launch',
      description: 'Everything you need to launch your site',
      price: {
        monthly: 14,
        annual: 9,
      },
      features: [
        'Host on yourname.instantweb.ai',
        '7-day unlimited design tweaks',
        'Live deployment handled by us',
        'Simple admin dashboard',
        'Basic analytics',
      ],
      cta: 'Choose Launch',
      ctaLink: '/demo?plan=launch',
      highlighted: true,
      badge: 'Most Popular',
    },
    {
      name: 'Pro',
      description: 'For businesses that need more customization',
      price: {
        monthly: 89,
        annual: 79,
      },
      features: [
        'Everything in Launch plan',
        'Custom layout & visual polish',
        'Priority support',
        'Advanced analytics',
        'Custom domain included',
      ],
      cta: 'Choose Pro',
      ctaLink: '/demo?plan=pro',
      highlighted: false,
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
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the plan that works best for your needs. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-3 text-sm ${!isAnnual ? 'text-white font-medium' : 'text-gray-400'}`}>
              Monthly
            </span>
            <motion.button
              className="relative w-14 h-7 bg-gray-700 rounded-full p-1 transition-colors duration-300"
              onClick={() => setIsAnnual(!isAnnual)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full"
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span className={`ml-3 text-sm ${isAnnual ? 'text-white font-medium' : 'text-gray-400'}`}>
              Annual <span className="text-emerald-400 font-medium">(Save 35%)</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants} custom={index}>
              <GlassmorphicCard
                className={`h-full ${plan.highlighted ? 'border-2 border-blue-500' : ''}`}
                blurStrength={plan.highlighted ? 15 : 10}
                opacity={plan.highlighted ? 0.15 : 0.1}
                backgroundColor={plan.highlighted ? 'rgba(59, 130, 246, 0.05)' : 'rgba(0, 0, 0, 0.3)'}
              >
                <div className="flex flex-col h-full">
                  {plan.badge && (
                    <div className="absolute -top-3 -right-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${isAnnual ? plan.price.annual : plan.price.monthly}</span>
                    {plan.price.monthly > 0 && (
                      <span className="text-gray-400 ml-2">
                        {isAnnual ? '/year' : '/one-time'}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-emerald-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    href={plan.ctaLink}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-center transition-all duration-300 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:from-blue-600 hover:to-emerald-600'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {plan.cta}
                  </motion.a>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Need something more custom?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            We offer custom solutions for businesses with specific requirements. Contact us to discuss your project.
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Sales
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
