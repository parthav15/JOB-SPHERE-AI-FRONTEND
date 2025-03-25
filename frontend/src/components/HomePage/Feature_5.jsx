import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Rocket, Smartphone, UserCheck, Globe, Mail } from 'lucide-react';

const Feature_5 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const faqs = [
    {
      question: "How does the AI resume analysis work?",
      answer: "Our advanced ML models scan your resume for 50+ key factors including keyword optimization, ATS compatibility, and industry-specific requirements, providing actionable insights in seconds."
    },
    {
      question: "Is my personal data secure?",
      answer: "We employ enterprise-grade encryption and strict privacy controls. Your data is never shared or sold to third parties."
    },
    {
      question: "Can I contact HR professionals directly?",
      answer: "Our community features allow verified communication with HR experts while maintaining professional boundaries and privacy standards."
    },
    {
      question: "What makes Job Sphere AI different?",
      answer: "We combine AI precision with human expertise and community wisdom for a holistic career development approach."
    },
    {
      question: "How often should I update my profile?",
      answer: "We recommend updating after any major career development or every 3 months for optimal algorithm performance."
    },
    {
      question: "Do you offer mobile access?",
      answer: "Yes! Our progressive web app works seamlessly across all devices with full feature parity."
    }
  ];

  const stats = [
    { icon: <Rocket />, value: "2.3s", label: "Avg. Analysis Time" },
    { icon: <Smartphone />, value: "99.9%", label: "Uptime" },
    { icon: <UserCheck />, value: "4.8M", label: "Active Users" },
    { icon: <Globe />, value: "50+", label: "Countries" }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Answers to
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}Your Questions
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our comprehensive knowledge hub - from technical details to career strategies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Items */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative overflow-hidden"
              >
                {/* Hover effect layer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 0.95
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl"
                />

                <div 
                  className={`p-6 backdrop-blur-lg rounded-xl border cursor-pointer transition-all ${
                    activeIndex === index 
                      ? 'border-white/20 bg-white/5' 
                      : 'border-white/10 hover:border-white/15'
                  }`}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <MessageCircle className="w-5 h-5 text-purple-400" />
                      <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 text-gray-300"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Stats Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 h-fit sticky top-24"
          >
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 text-center bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="flex justify-center mb-3 text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Support CTA */}
            <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl text-center">
              <div className="text-lg font-bold text-white mb-2">
                Still Have Questions?
              </div>
              <p className="text-gray-300 mb-4">
                Our support team is ready to help 24/7
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Support
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                scale: 0,
                x: Math.random() * 100 - 50 + '%',
                y: Math.random() * 100 - 50 + '%'
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature_5;