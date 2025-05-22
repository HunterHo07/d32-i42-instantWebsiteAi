'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageLayout from '@/components/shared/PageLayout';
import ParticleBackground from '@/components/shared/ParticleBackground';

export default function NotFound() {
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
      <div className="min-h-screen flex items-center justify-center py-20">
        <ParticleBackground options={particleOptions} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-9xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                404
              </h1>
              
              <h2 className="text-3xl font-bold text-white mb-6">
                Page Not Found
              </h2>
              
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                The page you're looking for doesn't exist or has been moved. Let's get you back on track.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/">
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-medium rounded-full text-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05, boxShadow: '0 5px 20px rgba(0, 0, 0, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back to Home
                  </motion.button>
                </Link>
                
                <Link href="/demo">
                  <motion.button
                    className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-full text-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try the Demo
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
