import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ThumbsUp, Clock, Users, Briefcase, BarChart } from 'lucide-react';

const Feature_2 = () => {
  const reasons = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Get instant, intelligent feedback on your resume and career strategy"
    },
    {
      icon: <ThumbsUp className="w-8 h-8" />,
      title: "95% Satisfaction Rate",
      description: "Join thousands of successful job placements and career advancements"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time-Saving Tools",
      description: "Automate job search tasks and focus on what matters most"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Active Community",
      description: "Connect with HR professionals and fellow job seekers"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Job Match Guarantee",
      description: "Smart algorithms that match you with ideal opportunities"
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Track your application progress and improve success rates"
    }
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
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Students
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}Choose Us?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover how Job Sphere AI becomes your ultimate career companion, transforming
            job search anxiety into career success confidence
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Animated icon container */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="mb-4 inline-block p-3 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600"
              >
                {reason.icon}
              </motion.div>

              <h3 className="text-xl font-semibold text-white mb-2">{reason.title}</h3>
              <p className="text-gray-300">{reason.description}</p>

              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-30 transition-opacity"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float ${5 + Math.random() * 5}s infinite`
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Stats Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-lg border border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                50K+
              </div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                85%
              </div>
              <div className="text-gray-300">Interview Success</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                4.9/5
              </div>
              <div className="text-gray-300">User Rating</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_2;