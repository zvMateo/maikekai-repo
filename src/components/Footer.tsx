"use client";

import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Inicio", href: "#home" },
    { name: "Paquetes", href: "#packages" },
    { name: "Contacto", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/maikekaisurf",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/maikekaisurf",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/maikekaisurf",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com/maikekaisurf",
    },
  ];

  return (
    <footer
      id="contact"
      className="text-white"
      style={{ backgroundColor: "#061821" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Logo and Name */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <div className="w-12 h-12 relative">
                  <Image
                    src="/images/Mai Ke Kai - Logotipo - Blanco.png"
                    alt="Maikekai Surf Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Maikekai Surf
                  </h3>
                  <p className="text-gray-400 text-sm">Hotel & Surf School</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4 text-white">
                Enlaces Rápidos
              </h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-[#2B96CB] transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media */}
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold mb-4 text-white">
                Síguenos
              </h4>
              <div className="flex justify-center md:justify-end space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#2B96CB] hover:bg-[#2B96CB]/80 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <MapPin className="w-5 h-5 text-[#2B96CB] flex-shrink-0" />
                <span className="text-gray-400">
                  Playa Hermosa, Guanacaste, Costa Rica
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="w-5 h-5 text-[#2B96CB] flex-shrink-0" />
                <span className="text-gray-400">+506 1234-5678</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="w-5 h-5 text-[#2B96CB] flex-shrink-0" />
                <span className="text-gray-400">info@maikekaisurf.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-gray-700">
          <div className="text-center text-gray-400 text-sm">
            <p>
              &copy; {currentYear} Maikekai Surf Hotel. Todos los derechos
              reservados.
            </p>
            <p className="mt-2">Desarrollado con ❤️ para la comunidad surf</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
