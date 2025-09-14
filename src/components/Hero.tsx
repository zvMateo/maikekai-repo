"use client";

import { Play, MapPin, Star, Waves, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Surf waves in Costa Rica"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Dark Blue Overlay - 70% opacity */}
      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: "rgba(14, 50, 68, 0.7)" }}
      ></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="space-y-8">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all duration-500 cursor-pointer group">
            <MapPin className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">
              Playa Hermosa, Costa Rica
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold font-serif tracking-wider text-white">
              Vive el Surf en Costa Rica
            </h1>
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white">
              Hospedaje frente al mar + clases de surf profesionales
            </h2>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-lg font-semibold">4.9</span>
            <span className="text-white/70">(180+ reviews)</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="xl"
              className="group bg-[#2B96CB] hover:bg-[#2B96CB]/90 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Waves className="w-5 h-5 mr-2" />
              Reserva tu lugar
            </Button>

            <Button
              size="xl"
              className="group bg-[#FFDA78] hover:bg-[#FFDA78]/90 text-[#0E3244] px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 mr-2" />
              Ver paquetes
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300 cursor-pointer group">
            <ChevronDown className="w-6 h-6 group-hover:animate-bounce" />
            <span className="text-xs mt-2">Scroll to explore</span>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
