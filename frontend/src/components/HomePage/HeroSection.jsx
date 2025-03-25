import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, Rocket } from 'lucide-react';

const HeroSection = () => {
  const stats = [
    { number: '95', label: 'Success Rate' },
    { number: '1M', label: 'Users Helped' },
    { number: '50k', label: 'Jobs Matched' },
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/videos/particles.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-purple-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Empower Your Career
              <br />
              with <span className="text-white">AI Intelligence</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Transform your job search with AI-powered resume analysis, smart 
            matching, and community-powered insights. Land your dream job faster.
          </motion.p>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Rocket className="w-6 h-6 mr-3 animate-pulse" />
              Get Started Free
              <div className="absolute inset-0 rounded-xl border-2 border-white/20 mix-blend-overlay group-hover:border-white/40 transition-all" />
            </button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {stat.number}
                <span className="text-purple-400">+</span>
              </div>
              <div className="text-gray-200 text-lg">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Animated Upload Section */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 max-w-2xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all"
        >
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <UploadCloud className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-xl text-white mb-2">
              Upload Your Resume to Get Started
            </h3>
            <p className="text-gray-300 mb-4">
              Supported formats: PDF, DOCX, TXT (Max 5MB)
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-blue-600/30 border border-blue-400 rounded-lg text-blue-100 hover:bg-blue-600/50 transition-all">
              <FileText className="w-5 h-5 mr-2" />
              Browse Files
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles Effect (using CSS) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s infinite`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;