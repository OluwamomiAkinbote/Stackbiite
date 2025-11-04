'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '@/components/home/ThemeContext';

export default function HeroSection() {
  const { currentTheme, theme } = useTheme();

  const isDefault = currentTheme === 'default';

  return (
    <section
      className={`relative flex flex-col items-center justify-center text-center min-h-[90vh] transition-colors duration-500 overflow-hidden border-t-4 ${theme.accent} px-6 sm:px-12 py-12 ${theme.secondary}`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div
          className={`absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-3xl ${
            isDefault || currentTheme === 'dark' ? 'animate-float-slow' : ''
          } ${theme.primary}/20`}
        ></div>
        <div
          className={`absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl ${
            isDefault || currentTheme === 'dark' ? 'animate-float-medium' : ''
          } ${theme.accent}/20`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${
            isDefault || currentTheme === 'dark' ? 'animate-pulse-slow' : ''
          } ${theme.accent}/10`}
        ></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl">
        {/* Tagline */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full text-sm font-medium border ${theme.badge} text-white animate-fade-in`}
        >
          <Sparkles size={16} className="text-white" />
          <span>Next Generation Web Experiences</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4 mb-6">
          <h1 className="font-extrabold leading-tight tracking-tight text-center">
            <span
              className={`block text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-slide-up ${
                isDefault
                  ? `bg-clip-text text-transparent ${theme.primary}`
                  : theme.text
              }`}
            >
              We Build Modern
            </span>
            <span
              className={`block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 animate-slide-up ${
                theme.text
              }`}
            >
              Websites & Digital Solutions
            </span>
            <span
              className={`block text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-slide-up ${
                isDefault ? 'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent' : theme.text
              }`}
            >
              That Drive Growth
            </span>

          </h1>

          {/* Professional Paragraph */}
          <p
            className={`mt-4 text-base sm:text-lg lg:text-xl text-center ${theme.text} max-w-2xl mx-auto`}
          >
            As a professional web design agency, we craft responsive, user-friendly, and high-performing websites. 
            Our digital solutions help businesses scale, improve conversions, and create memorable online experiences.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6 animate-fade-in-up">
          <Link
            href="/contact"
            className={`group px-8 py-4 font-semibold rounded-full shadow-lg flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-xl ${theme.button}`}
          >
            <span className={theme.text}>Start a Project</span>
            <ArrowRight
              size={18}
              className={`transition-transform group-hover:translate-x-1 ${theme.text}`}
            />
          </Link>

          <Link
            href="/portfolio"
            className={`group px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 hover:shadow-lg border ${theme.accent} ${theme.text} hover:${theme.button}`}
          >
            <span className="group-hover:scale-105 transition-transform block">
              View Our Work
            </span>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${theme.accent}`}>
          <div className={`w-1 h-3 rounded-full mt-2 animate-pulse ${theme.primary}`}></div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float-slow {0%,100%{transform:translateY(0) rotate(0);} 50%{transform:translateY(-20px) rotate(180deg);}}
        @keyframes float-medium {0%,100%{transform:translateY(0) rotate(0);} 50%{transform:translateY(-15px) rotate(90deg);}}
        @keyframes pulse-slow {0%,100%{opacity:0.1;} 50%{opacity:0.15;}}
        @keyframes slide-up {0%{transform:translateY(30px);opacity:0;} 100%{transform:translateY(0);opacity:1;}}
        @keyframes fade-in {0%{opacity:0;transform:scale(0.9);} 100%{opacity:1;transform:scale(1);}}
        @keyframes fade-in-up {0%{opacity:0;transform:translateY(20px);} 100%{opacity:1;transform:translateY(0);}}
        .animate-float-slow {animation: float-slow 8s ease-in-out infinite;}
        .animate-float-medium {animation: float-medium 6s ease-in-out infinite;}
        .animate-pulse-slow {animation: pulse-slow 4s ease-in-out infinite;}
        .animate-slide-up {animation: slide-up 0.8s ease-out;}
        .animate-fade-in {animation: fade-in 0.6s ease-out;}
        .animate-fade-in-up {animation: fade-in-up 0.8s ease-out both;}
      `}</style>
    </section>
  );
}
