'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import GlassmorphicCard from '../shared/GlassmorphicCard';

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
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

  // Manual carousel animation
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId;
    let position = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      position -= speed;

      // Get all testimonial cards
      const cards = carousel.querySelectorAll('.testimonial-card');
      if (!cards.length) return;

      // Calculate total width
      let totalWidth = 0;
      cards.forEach(card => {
        totalWidth += card.offsetWidth + 24; // width + gap
      });

      // Reset position when we've scrolled one full width
      if (Math.abs(position) >= totalWidth / 2) {
        position = 0;
      }

      // Apply position to all cards
      cards.forEach(card => {
        card.style.transform = `translateX(${position}px)`;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      company: 'Bloom Boutique',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      quote: 'I was up and running with a professional website in literally minutes. The templates are gorgeous and the whole process was incredibly simple.',
    },
    {
      name: 'Michael Chen',
      role: 'Freelance Designer',
      company: 'Chen Creative',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      quote: 'As someone who designs websites for a living, I was skeptical. But instantWebsiteAi delivered a site that I was proud to show clients, with zero effort.',
    },
    {
      name: 'Priya Patel',
      role: 'Restaurant Owner',
      company: 'Spice Fusion',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      quote: 'Our restaurant needed a website fast. We tried other builders but got stuck in design decisions. This was instant and looked better than anything we could have made ourselves.',
    },
    {
      name: 'David Wilson',
      role: 'Real Estate Agent',
      company: 'Prime Properties',
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      quote: 'I needed individual websites for each property listing. Now I can spin up a new site in seconds. Game changer for my business.',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Startup Founder',
      company: 'EcoTech Solutions',
      image: 'https://randomuser.me/api/portraits/women/17.jpg',
      quote: 'We were preparing for a pitch and needed a professional web presence overnight. instantWebsiteAi delivered exactly what we needed when we needed it.',
    },
    {
      name: 'James Thompson',
      role: 'Photographer',
      company: 'Thompson Visuals',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      quote: 'The templates showcase my photography perfectly. I was able to get my portfolio online in minutes instead of days.',
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
    <section ref={sectionRef} className="py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have launched their websites with instantWebsiteAi.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div
            ref={carouselRef}
            className="flex space-x-6 overflow-hidden py-8"
          >
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`testimonial-${index}`}
                className="testimonial-card flex-shrink-0 w-80 md:w-96"
                variants={itemVariants}
                custom={index}
              >
                <GlassmorphicCard className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <svg className="h-8 w-8 text-emerald-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-gray-300 italic">{testimonial.quote}</p>
                    </div>
                    <div className="mt-auto flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/48?text=User";
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}

            {/* Duplicate testimonials for seamless looping */}
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={`testimonial-dup-${index}`}
                className="testimonial-card flex-shrink-0 w-80 md:w-96"
                variants={itemVariants}
                custom={index + testimonials.length}
              >
                <GlassmorphicCard className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <svg className="h-8 w-8 text-emerald-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-gray-300 italic">{testimonial.quote}</p>
                    </div>
                    <div className="mt-auto flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/48?text=User";
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>

          {/* Gradient overlays for fade effect */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
