'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageLayout from '@/components/shared/PageLayout';
import GlassmorphicCard from '@/components/shared/GlassmorphicCard';
import ParticleBackground from '@/components/shared/ParticleBackground';
import Link from 'next/link';

export default function AboutPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Team members data
  const teamMembers = [
    {
      name: 'Alex Morgan',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Former tech lead at a major design agency, Alex founded instantWebsiteAi to solve the frustrations he saw clients experiencing with traditional website builders.',
    },
    {
      name: 'Sarah Chen',
      role: 'Chief Design Officer',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'With over a decade of UX/UI experience at top tech companies, Sarah ensures every template meets our high design standards.',
    },
    {
      name: 'Marcus Johnson',
      role: 'CTO',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      bio: 'AI researcher and full-stack developer who built our core template generation engine and oversees all technical aspects of the platform.',
    },
    {
      name: 'Priya Patel',
      role: 'Head of Customer Success',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'Passionate about helping customers succeed, Priya leads our human-in-the-loop quality control and customer support team.',
    },
  ];
  
  // Company values
  const companyValues = [
    {
      title: 'Speed Without Sacrifice',
      description: 'We believe you shouldn\'t have to choose between getting online quickly and having a professional website.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Human-Centered AI',
      description: 'We use AI to automate the tedious parts of website creation, but always keep humans in the loop for quality control.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Transparency',
      description: 'No hidden fees, no confusing pricing tiers, and no surprise limitations. What you see is what you get.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: 'Community First',
      description: 'We open-source our templates and believe in giving back to the web development community.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                About instantWebsiteAi
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We're on a mission to make professional website creation instant, effortless, and accessible to everyone.
              </p>
            </div>
            
            {/* Our Story */}
            <GlassmorphicCard className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">Our Story</h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p>
                  instantWebsiteAi was born out of frustration with the current website creation landscape. We saw too many small businesses and entrepreneurs struggling with complex website builders, expensive agencies, or underwhelming DIY solutions.
                </p>
                <p>
                  Our founder, Alex, spent years watching clients get stuck in the "website builder loop" — endlessly tweaking templates, getting lost in design decisions, and ultimately ending up with sites that didn't meet their expectations.
                </p>
                <p>
                  We asked: What if creating a website could be as simple as entering your business name and uploading your logo? What if you could see a professional website, live on a real domain, in seconds instead of weeks?
                </p>
                <p>
                  By combining the speed of AI with human quality control, we've created a solution that delivers instant results without sacrificing quality. No more builders, no more code, no more drag-and-drop — just your website, instantly.
                </p>
              </div>
            </GlassmorphicCard>
            
            {/* Our Values */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Values</h2>
              <motion.div
                ref={sectionRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {companyValues.map((value, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <GlassmorphicCard className="h-full">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">{value.icon}</div>
                        <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                        <p className="text-gray-300">{value.description}</p>
                      </div>
                    </GlassmorphicCard>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Team Section */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Meet Our Team</h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {teamMembers.map((member, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <GlassmorphicCard className="h-full">
                      <div className="flex flex-col items-center text-center h-full">
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-700">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/96?text=Team+Member";
                            }}
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                        <p className="text-emerald-400 mb-4">{member.role}</p>
                        <p className="text-gray-300">{member.bio}</p>
                      </div>
                    </GlassmorphicCard>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Call to Action */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to experience the future of website creation?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Try instantWebsiteAi today and see how we're revolutionizing the way websites are created.
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
