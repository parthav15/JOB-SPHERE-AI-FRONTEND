import React from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageCircle, ChevronRight, User } from 'lucide-react';

const Feature_4 = () => {
  const testimonials = [
    {
      name: "Emily Rodriguez",
      role: "Recent Graduate",
      feedback: "Job Sphere AI completely transformed my job search! The resume analysis pointed out improvements I never would have considered. Landed 3 interviews in 2 weeks!",
      rating: 5,
      likes: 128,
      comments: 15
    },
    {
      name: "David Chen",
      role: "Career Changer",
      feedback: "The community insights helped me negotiate a 20% higher salary. This platform is worth its weight in gold for anyone serious about their career.",
      rating: 5,
      likes: 245,
      comments: 29
    },
    {
      name: "Sarah Johnson",
      role: "HR Professional",
      feedback: "As a recruiter, I'm impressed by how well-prepared Job Sphere AI users are. Their resumes are always optimized and application strategies are on point.",
      rating: 4.5,
      likes: 189,
      comments: 22
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Hear From Our
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover how Job Sphere AI has transformed careers and empowered professionals worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all"
            >
              {/* User Profile */}
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                  />
                ))}
                <span className="ml-2 text-gray-400">
                  ({testimonial.rating})
                </span>
              </div>

              {/* Feedback Text */}
              <p className="text-gray-300 mb-6 italic">"{testimonial.feedback}"</p>

              {/* Interaction Stats */}
              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <ThumbsUp className="w-5 h-5 mr-2" />
                    {testimonial.likes}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {testimonial.comments}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-lg rounded-2xl border border-white/10 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Join thousands of successful professionals who've accelerated their career growth with Job Sphere AI
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all"
          >
            Share Your Success Story
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_4;