"use client";

import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const reviews = [
    {
      id: "1",
      name: "Sarah Johnson",
      country: "Estados Unidos",
      comment:
        "¡Increíble experiencia! Los instructores son profesionales y el lugar es perfecto para aprender a surfear. Definitivamente volveré.",
      rating: 5,
      package: "Paquete Completo",
    },
    {
      id: "2",
      name: "Marco Silva",
      country: "Brasil",
      comment:
        "La ubicación frente al mar es espectacular. Las clases son muy buenas y el personal es súper amable. Pura vida!",
      rating: 5,
      package: "Hospedaje + Surf",
    },
    {
      id: "3",
      name: "Emma Thompson",
      country: "Reino Unido",
      comment:
        "Perfecto para principiantes. Los instructores tienen mucha paciencia y el ambiente es muy relajado. Lo recomiendo 100%.",
      rating: 5,
      package: "Clases de Surf",
    },
    {
      id: "4",
      name: "Carlos Rodriguez",
      country: "España",
      comment:
        "Excelente relación calidad-precio. El paquete incluye todo lo necesario y la playa es perfecta para surfear.",
      rating: 5,
      package: "Paquete Completo",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, reviews.length]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
    setAutoPlay(false);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
    setAutoPlay(false);
  };

  return (
    <section
      id="reviews"
      className="py-20"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0E3244] mb-4">
            Testimonios de nuestros clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre lo que dicen nuestros huéspedes sobre su experiencia con
            nosotros
          </p>
        </div>

        {/* Reviews Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Review Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            {/* Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(reviews[currentReview].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-[#FFDA78] fill-current" />
              ))}
            </div>

            {/* Review Text */}
            <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              "{reviews[currentReview].comment}"
            </blockquote>

            {/* Reviewer Info */}
            <div className="mb-6">
              <h4 className="text-2xl font-bold text-[#0E3244] mb-2">
                {reviews[currentReview].name}
              </h4>
              <p className="text-gray-600 mb-2">
                {reviews[currentReview].country}
              </p>
              <span className="inline-block bg-[#2B96CB] text-white px-4 py-2 rounded-full text-sm font-medium">
                {reviews[currentReview].package}
              </span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevReview}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-[#0E3244]" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentReview(index);
                    setAutoPlay(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentReview
                      ? "bg-[#FFDA78] scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-[#0E3244]" />
            </button>
          </div>
        </div>

        {/* Auto-play Toggle */}
        <div className="text-center mt-8">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="text-sm text-gray-500 hover:text-[#0E3244] transition-colors duration-300"
          >
            {autoPlay ? "Pausar" : "Reproducir"} slider automático
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
