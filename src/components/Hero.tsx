import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from '../Public/hero section/thar-night4.jpeg';
import img2 from '../Public/hero section/roboticwelding.webp'
import img3 from '../Public/hero section/scroller.png'
import img4 from '../Public/hero section/trees.jpg'
const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "Precision Auto",
      subtitle: "For Automotive Excellence",
      description:
        "Leading manufacturer of fuel tanks and sheet metal components, delivering quality and innovation to the automotive industry.",
      image: img1,
    },
    {
      id: 2,
      title: "Innovation & Quality",
      subtitle: "Setting New Standards",
      description:
        "State-of-the-art manufacturing facilities equipped with the latest technology for superior product quality.",
      image: img2,
    },
    {
      id: 3,
      title: "Global Excellence",
      subtitle: "Trusted by Industry Leaders",
      description:
        "Serving major automotive manufacturers with precision-engineered components and innovative solutions.",
      image: img3,
    },
    {
      id: 4,
      title: "Sustainable Solutions",
      subtitle: "Eco-Friendly Manufacturing",
      description:
        "Committed to environmentally responsible production processes and sustainable automotive solutions.",
      image: img4,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      scale: direction > 0 ? 1.1 : 0.9,
      opacity: 0,
      zIndex: 0,
    }),
    center: {
      scale: 1,
      opacity: 1,
      zIndex: 1,
      transition: {
        opacity: { duration: 0.8, ease: "easeOut" },
        scale: { duration: 1, ease: "easeOut" },
      },
    },
    exit: (direction) => ({
      scale: direction < 0 ? 1.1 : 0.9,
      opacity: 0,
      zIndex: 0,
      transition: {
        opacity: { duration: 0.5, ease: "easeOut" },
        scale: { duration: 0.7, ease: "easeOut" },
      },
    }),
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.6 },
    },
  };

  return (
    <div className="relative h-[90vh] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Image with darker overlay for better text visibility */}
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            {/* Stronger gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-full">
              <div className="max-w-2xl text-white space-y-4">
                <motion.h1 
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                
                <motion.span 
                  variants={subtitleVariants}
                  initial="hidden"
                  animate="visible"
                  className="block text-3xl sm:text-4xl font-semibold text-[#00adef]"
                >
                  {slides[currentSlide].subtitle}
                </motion.span>
                
                <motion.p 
                  variants={descriptionVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-lg sm:text-xl text-white/90 max-w-lg"
                >
                  {slides[currentSlide].description}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom footer content - Progress indicators and navigation buttons */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-5 z-20">
        {/* Slide indicators */}
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className="group relative"
            >
              <div className="w-12 h-1.5 bg-white/40 rounded-full overflow-hidden">
                {index === currentSlide && (
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="absolute left-0 top-0 h-full bg-white rounded-full"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex space-x-2">
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#00adef] text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-sm bg-[#00adef] text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
