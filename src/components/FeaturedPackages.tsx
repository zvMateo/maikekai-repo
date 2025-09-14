"use client";

import {
  Check,
  Star,
  Users,
  Calendar,
  Waves,
  MapPin,
  Home,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const FeaturedPackages = () => {
  const packages = [
    {
      id: "1",
      title: "Hospedaje",
      subtitle: "Frente al mar",
      price: "$120",
      period: "/noche",
      description:
        "Habitaciones cómodas con vista al océano, desayuno incluido y acceso directo a la playa.",
      features: [
        "Vista al océano",
        "Desayuno incluido",
        "WiFi gratuito",
        "Acceso directo a la playa",
      ],
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Home,
      color: "blue",
    },
    {
      id: "2",
      title: "Surf",
      subtitle: "Clases profesionales",
      price: "$80",
      period: "/clase",
      description:
        "Aprende a surfear con instructores certificados en las mejores olas de Costa Rica.",
      features: [
        "Instructor certificado",
        "Equipo incluido",
        "Teoría del surf",
        "Seguridad en el agua",
      ],
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Waves,
      color: "teal",
    },
    {
      id: "3",
      title: "Paquete completo",
      subtitle: "Todo incluido",
      price: "$350",
      period: "/día",
      description:
        "La experiencia completa: hospedaje, clases de surf, comidas y actividades.",
      features: [
        "Hospedaje + Surf",
        "3 comidas diarias",
        "Transporte incluido",
        "Actividades extra",
      ],
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Zap,
      color: "yellow",
    },
  ];

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0E3244] mb-4">
            Nuestros Paquetes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elige la experiencia perfecta para tu aventura de surf en Costa Rica
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-medium ${
                      pkg.color === "blue"
                        ? "bg-[#2B96CB]"
                        : pkg.color === "teal"
                        ? "bg-teal-500"
                        : "bg-[#FFDA78] text-[#0E3244]"
                    }`}
                  >
                    <pkg.icon className="w-4 h-4" />
                    {pkg.subtitle}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#0E3244] mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#FFDA78]">
                      {pkg.price}
                    </span>
                    <span className="text-gray-500">{pkg.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    pkg.color === "blue"
                      ? "bg-[#2B96CB] hover:bg-[#2B96CB]/90 text-white"
                      : pkg.color === "teal"
                      ? "bg-teal-500 hover:bg-teal-600 text-white"
                      : "bg-[#FFDA78] hover:bg-[#FFDA78]/90 text-[#0E3244]"
                  } font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105`}
                >
                  Más info
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
