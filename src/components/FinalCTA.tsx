"use client";

import { Waves, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const FinalCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #2B96CB 0%, #0E3244 100%)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Text */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            ¿Listo para tu próxima aventura en Costa Rica?
          </h2>

          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
            Únete a cientos de surfistas que han vivido la experiencia Maikekai
            Surf. Reserva ahora y descubre por qué somos la mejor opción en
            Playa Hermosa.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="xl"
              className="group bg-[#FFDA78] hover:bg-[#FFDA78]/90 text-[#0E3244] px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Waves className="w-6 h-6 mr-3" />
              Reserva ahora
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="group border-2 border-white text-white hover:bg-white hover:text-[#0E3244] px-12 py-6 text-xl font-bold backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Ver paquetes
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FFDA78] mb-2">15+</div>
              <div className="text-lg">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FFDA78] mb-2">500+</div>
              <div className="text-lg">Estudiantes satisfechos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FFDA78] mb-2">4.9</div>
              <div className="text-lg">Calificación promedio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-16 h-16 border border-white/20 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-20 w-12 h-12 border border-white/20 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </section>
  );
};

export default FinalCTA;
