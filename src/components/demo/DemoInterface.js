'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWebsiteContext } from '@/hooks/useWebsiteContext';
import { templates, getTemplateById } from '@/data/templates';
import GlassmorphicCard from '../shared/GlassmorphicCard';
import ParticleBackground from '../shared/ParticleBackground';

const DemoInterface = ({ initialTemplate = 'modern-business', initialName = '' }) => {
  const { customization, updateBusinessName, updateLogo, selectTemplate, updateColor } = useWebsiteContext();
  const [activeTab, setActiveTab] = useState('template');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [businessName, setBusinessName] = useState(initialName || 'Your Business');
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate);
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [secondaryColor, setSecondaryColor] = useState('#10B981');
  const [logoPreview, setLogoPreview] = useState('');
  const iframeRef = useRef(null);

  // Initialize with query params or defaults
  useEffect(() => {
    updateBusinessName(businessName);
    selectTemplate(selectedTemplate);

    // Get template colors
    const template = getTemplateById(selectedTemplate);
    setPrimaryColor(template.colors.primary);
    setSecondaryColor(template.colors.secondary);
    updateColor('primary', template.colors.primary);
    updateColor('secondary', template.colors.secondary);
  }, []);

  // Handle business name change
  const handleNameChange = (e) => {
    const name = e.target.value;
    setBusinessName(name);
    updateBusinessName(name);
  };

  // Handle template selection
  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    selectTemplate(templateId);

    // Update colors based on template
    const template = getTemplateById(templateId);
    setPrimaryColor(template.colors.primary);
    setSecondaryColor(template.colors.secondary);
    updateColor('primary', template.colors.primary);
    updateColor('secondary', template.colors.secondary);

    // Simulate loading
    setIsPreviewLoading(true);
    setTimeout(() => {
      setIsPreviewLoading(false);
    }, 1500);
  };

  // Handle color change
  const handleColorChange = (colorKey, value) => {
    if (colorKey === 'primary') {
      setPrimaryColor(value);
    } else {
      setSecondaryColor(value);
    }
    updateColor(colorKey, value);
  };

  // Handle logo upload
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result);
      updateLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle preview refresh
  const handleRefreshPreview = () => {
    setIsPreviewLoading(true);
    setTimeout(() => {
      setIsPreviewLoading(false);
    }, 1000);
  };

  // Animation variants
  const tabVariants = {
    inactive: { opacity: 0.7, y: 0 },
    active: { opacity: 1, y: 0 },
    hover: { opacity: 1, y: -2 },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      }
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
    <div className="min-h-screen py-20">
      <ParticleBackground options={particleOptions} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              Website Demo
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Customize your website and see it live in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Controls */}
            <div className="lg:col-span-1">
              <GlassmorphicCard className="mb-6">
                <div className="flex border-b border-gray-700 mb-4">
                  <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'template' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setActiveTab('template')}
                  >
                    Template
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'colors' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setActiveTab('colors')}
                  >
                    Colors
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'content' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                    onClick={() => setActiveTab('content')}
                  >
                    Content
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'template' && (
                    <motion.div
                      key="template"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={contentVariants}
                    >
                      <h3 className="text-lg font-semibold text-white mb-4">Choose a Template</h3>
                      <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {templates.map((template) => (
                          <motion.div
                            key={template.id}
                            className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                              selectedTemplate === template.id ? 'border-blue-500' : 'border-transparent'
                            }`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleTemplateChange(template.id)}
                          >
                            <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                              <img
                                src={`/images/templates/${template.id}.webp`}
                                alt={template.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/300x169?text=Template";
                                }}
                              />
                            </div>
                            <div className="p-2 bg-gray-800">
                              <h4 className="text-sm font-medium text-white truncate">{template.name}</h4>
                              <p className="text-xs text-gray-400">{template.category}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'colors' && (
                    <motion.div
                      key="colors"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={contentVariants}
                    >
                      <h3 className="text-lg font-semibold text-white mb-4">Customize Colors</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Primary Color
                          </label>
                          <div className="flex items-center">
                            <div
                              className="w-10 h-10 rounded-lg mr-3"
                              style={{ backgroundColor: primaryColor }}
                            />
                            <input
                              type="color"
                              value={primaryColor}
                              onChange={(e) => handleColorChange('primary', e.target.value)}
                              className="h-10 w-full bg-gray-800 border border-gray-700 rounded-lg cursor-pointer"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Secondary Color
                          </label>
                          <div className="flex items-center">
                            <div
                              className="w-10 h-10 rounded-lg mr-3"
                              style={{ backgroundColor: secondaryColor }}
                            />
                            <input
                              type="color"
                              value={secondaryColor}
                              onChange={(e) => handleColorChange('secondary', e.target.value)}
                              className="h-10 w-full bg-gray-800 border border-gray-700 rounded-lg cursor-pointer"
                            />
                          </div>
                        </div>

                        <div className="pt-4">
                          <button
                            className="w-full py-2 px-4 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                            onClick={handleRefreshPreview}
                          >
                            Apply Colors
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'content' && (
                    <motion.div
                      key="content"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={contentVariants}
                    >
                      <h3 className="text-lg font-semibold text-white mb-4">Business Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Business Name
                          </label>
                          <input
                            type="text"
                            value={businessName}
                            onChange={handleNameChange}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your business name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Logo
                          </label>
                          <div className="flex items-center space-x-3">
                            <label className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-300">Upload Logo</span>
                              <input
                                type="file"
                                onChange={handleLogoChange}
                                accept="image/*"
                                className="hidden"
                              />
                            </label>

                            {logoPreview && (
                              <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-700">
                                <img
                                  src={logoPreview}
                                  alt="Logo preview"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="pt-4">
                          <button
                            className="w-full py-2 px-4 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                            onClick={handleRefreshPreview}
                          >
                            Update Preview
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassmorphicCard>

              <GlassmorphicCard>
                <h3 className="text-lg font-semibold text-white mb-4">Preview Options</h3>
                <div className="flex justify-center space-x-4 mb-6">
                  <motion.button
                    className={`p-2 rounded-lg ${previewMode === 'desktop' ? 'bg-gray-700' : 'bg-gray-800'}`}
                    variants={tabVariants}
                    initial="inactive"
                    animate={previewMode === 'desktop' ? 'active' : 'inactive'}
                    whileHover="hover"
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.button>

                  <motion.button
                    className={`p-2 rounded-lg ${previewMode === 'tablet' ? 'bg-gray-700' : 'bg-gray-800'}`}
                    variants={tabVariants}
                    initial="inactive"
                    animate={previewMode === 'tablet' ? 'active' : 'inactive'}
                    whileHover="hover"
                    onClick={() => setPreviewMode('tablet')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </motion.button>

                  <motion.button
                    className={`p-2 rounded-lg ${previewMode === 'mobile' ? 'bg-gray-700' : 'bg-gray-800'}`}
                    variants={tabVariants}
                    initial="inactive"
                    animate={previewMode === 'mobile' ? 'active' : 'inactive'}
                    whileHover="hover"
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <motion.button
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Publish Website
                  </motion.button>

                  <motion.button
                    className="w-full py-3 px-4 bg-transparent border border-gray-600 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Template
                  </motion.button>
                </div>
              </GlassmorphicCard>
            </div>

            {/* Right Column - Preview */}
            <div className="lg:col-span-2">
              <GlassmorphicCard className="h-full p-0 overflow-hidden">
                <div className="bg-gray-800 p-3 border-b border-gray-700 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm text-gray-400">
                      {businessName || 'Your Business'} - {getTemplateById(selectedTemplate).name} Template
                    </span>
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-300"
                    onClick={handleRefreshPreview}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>

                <div className={`relative ${
                  previewMode === 'desktop' ? 'w-full' :
                  previewMode === 'tablet' ? 'w-[768px] mx-auto' :
                  'w-[375px] mx-auto'
                } transition-all duration-300`}>
                  {isPreviewLoading ? (
                    <div className="flex items-center justify-center h-[600px]">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <div className="bg-white h-[600px] w-full overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-800">
                        <div className="text-center p-6">
                          <div className="mb-4">
                            {logoPreview ? (
                              <img src={logoPreview} alt="Logo" className="h-16 mx-auto" />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                                {businessName.charAt(0)}
                              </div>
                            )}
                          </div>
                          <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
                            {businessName || 'Your Business'}
                          </h1>
                          <p className="text-lg mb-6">Welcome to our website</p>
                          <div className="flex justify-center space-x-4">
                            <button
                              className="px-6 py-2 rounded-lg text-white font-medium"
                              style={{ backgroundColor: primaryColor }}
                            >
                              Learn More
                            </button>
                            <button
                              className="px-6 py-2 rounded-lg text-white font-medium"
                              style={{ backgroundColor: secondaryColor }}
                            >
                              Contact Us
                            </button>
                          </div>
                          <div className="mt-8 text-sm text-gray-500">
                            This is a preview of your website. The actual template will have more content and features.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoInterface;
