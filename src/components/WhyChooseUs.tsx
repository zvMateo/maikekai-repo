"use client";

import { MapPin, Award, DollarSign, Waves, Users, Shield } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: MapPin,
      title: "Ubicación frente al mar",
      description:
        "Acceso directo a Playa Hermosa, una de las mejores playas de surf de Costa Rica",
    },
    {
      icon: Award,
      title: "Clases con instructores certificados",
      description:
        "Instructores ISA certificados con más de 15 años de experiencia enseñando surf",
    },
    {
      icon: DollarSign,
      title: "Paquetes accesibles y completos",
      description:
        "Precios competitivos que incluyen hospedaje, clases, equipos y comidas",
    },
  ];

  return (
    <section className="py-20" style={{ backgroundColor: "#0E3244" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            La combinación perfecta de ubicación, experiencia y valor para tu
            aventura de surf
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFDA78] text-[#0E3244] mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-10 h-10" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-[#FFDA78] mb-2">15+</div>
            <div className="text-white/80">Años de experiencia</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#FFDA78] mb-2">500+</div>
            <div className="text-white/80">Estudiantes satisfechos</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#FFDA78] mb-2">365</div>
            <div className="text-white/80">Días de surf al año</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#FFDA78] mb-2">4.9</div>
            <div className="text-white/80">Calificación promedio</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
