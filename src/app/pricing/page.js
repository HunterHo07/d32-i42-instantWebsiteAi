'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageLayout from '@/components/shared/PageLayout';
import GlassmorphicCard from '@/components/shared/GlassmorphicCard';
import AuroraBackground from '@/components/shared/AuroraBackground';
import Link from 'next/link';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [activeTab, setActiveTab] = useState('plans');
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
  
  // Add-on plans
  const addonPlans = [
    {
      name: 'Starter Support',
      price: '$5/day',
      description: 'Perfect for urgent tweaks or launch-day polish.',
      features: [
        '1-day access to unlimited minor edit requests',
        'Includes text changes, image swaps, color tweaks',
        'Section rearranging',
        'Turnaround typically within 12–24 hours',
      ],
    },
    {
      name: 'Flex Week',
      price: '$19/week',
      description: 'For when you want more flexibility and hands-off editing.',
      features: [
        'Unlimited reasonable change requests for 7 days',
        'Text and image updates',
        'Simple layout modifications (within template scope)',
        'Visual polish and content formatting',
        'Ideal for launch prep or early-stage feedback loops',
      ],
    },
    {
      name: 'Monthly Partner',
      price: '$39/month',
      description: 'Hands-off peace of mind for ongoing updates.',
      features: [
        'Ongoing change support (up to 5 active requests at a time)',
        'Priority turnaround (same or next business day)',
        'Ideal for freelancers, local businesses, or small teams',
      ],
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
    <PageLayout>
      <div className="min-h-screen py-20">
        <AuroraBackground 
          colors={['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B']} 
          speed={2}
          intensity={5}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Choose the plan that works best for your needs. No hidden fees, no surprises.
              </p>
              
              {/* Tabs */}
              <div className="flex justify-center mt-8 mb-8">
                <div className="inline-flex p-1 bg-gray-800 rounded-full">
                  <button
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === 'plans' ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white' : 'text-gray-300'
                    }`}
                    onClick={() => setActiveTab('plans')}
                  >
                    Website Plans
                  </button>
                  <button
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === 'addons' ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white' : 'text-gray-300'
                    }`}
                    onClick={() => setActiveTab('addons')}
                  >
                    Support Add-ons
                  </button>
                </div>
              </div>
              
              {/* Billing Toggle (only for plans) */}
              {activeTab === 'plans' && (
                <div className="flex items-center justify-center mt-4 mb-8">
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
              )}
            </div>
            
            {/* Website Plans */}
            {activeTab === 'plans' && (
              <motion.div
                ref={sectionRef}
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
                        
                        <Link href={plan.ctaLink}>
                          <motion.button
                            className={`w-full py-3 px-4 rounded-lg font-medium text-center transition-all duration-300 ${
                              plan.highlighted
                                ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:from-blue-600 hover:to-emerald-600'
                                : 'bg-gray-800 text-white hover:bg-gray-700'
                            }`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {plan.cta}
                          </motion.button>
                        </Link>
                      </div>
                    </GlassmorphicCard>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {/* Add-on Plans */}
            {activeTab === 'addons' && (
              <motion.div
                ref={sectionRef}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {addonPlans.map((plan, index) => (
                  <motion.div key={index} variants={itemVariants} custom={index}>
                    <GlassmorphicCard className="h-full">
                      <div className="flex flex-col h-full">
                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="mb-2">
                          <span className="text-3xl font-bold text-white">{plan.price}</span>
                        </div>
                        <p className="text-gray-400 mb-6">{plan.description}</p>
                        
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
                        
                        <Link href="/demo">
                          <motion.button
                            className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            Try with Demo
                          </motion.button>
                        </Link>
                      </div>
                    </GlassmorphicCard>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {/* FAQ Section */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Frequently Asked Questions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <GlassmorphicCard>
                  <h3 className="text-xl font-semibold text-white mb-3">What's included in the free plan?</h3>
                  <p className="text-gray-300">
                    The free plan allows you to browse all templates, generate a live preview with your business name and logo, and download the static HTML to host yourself.
                  </p>
                </GlassmorphicCard>
                
                <GlassmorphicCard>
                  <h3 className="text-xl font-semibold text-white mb-3">How does the 7-day design guarantee work?</h3>
                  <p className="text-gray-300">
                    After you purchase the Launch plan, you'll have 7 days of unlimited design tweak requests. Our team will make adjustments until you're completely satisfied with your website.
                  </p>
                </GlassmorphicCard>
                
                <GlassmorphicCard>
                  <h3 className="text-xl font-semibold text-white mb-3">Can I use my own domain name?</h3>
                  <p className="text-gray-300">
                    Yes! You can either use our free subdomain (yourname.instantweb.ai) or connect your own custom domain. We offer domain management services or you can manage it yourself.
                  </p>
                </GlassmorphicCard>
                
                <GlassmorphicCard>
                  <h3 className="text-xl font-semibold text-white mb-3">What if I need more customization?</h3>
                  <p className="text-gray-300">
                    Our Pro plan offers more customization options, including custom layouts and visual polish. For advanced projects with CMS, eCommerce, or custom functionality, contact us for a custom quote.
                  </p>
                </GlassmorphicCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
