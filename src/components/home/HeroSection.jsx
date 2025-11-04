'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '@/components/home/ThemeContext';

export default function HeroSection() {
  const { theme } = useTheme();

  const isDark = theme.name === 'dark';

  return (
    <section
      className={`relative flex flex-col items-center justify-center text-center min-h-[90vh] transition-colors duration-500 overflow-hidden ${
        isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div
          className={`absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-3xl animate-float-slow ${
            isDark ? 'bg-indigo-500/10' : 'bg-indigo-400/20'
          }`}
        ></div>
        <div
          className={`absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl animate-float-medium ${
            isDark ? 'bg-purple-500/10' : 'bg-purple-400/20'
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl animate-pulse-slow ${
            isDark ? 'bg-pink-400/5' : 'bg-pink-400/10'
          }`}
        ></div>

        <div
          className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:64px_64px] ${
            isDark
              ? '[mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,black,transparent)] opacity-5'
              : '[mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-40'
          }`}
        ></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl px-6 mx-auto">
        {/* Tagline */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full text-sm font-medium border ${
            isDark
              ? 'bg-gray-900 border-gray-700 text-indigo-300'
              : 'bg-indigo-50 border-indigo-100 text-indigo-700'
          } animate-fade-in`}
        >
          <Sparkles size={16} className="text-indigo-500" />
          <span>Next Generation Web Experiences</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4 mb-8">
          <h1 className="font-extrabold leading-tight tracking-tight">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x">
              Build Dynamic
            </span>
            <span
              className={`block text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 animate-slide-up ${
                isDark ? 'text-gray-100' : 'text-gray-800'
              }`}
            >
              Websites That Grow
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x-reverse">
              Your Business
            </span>
          </h1>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
          <Link
            href="/contact"
            className={`group px-8 py-4 text-white font-semibold rounded-full shadow-lg ${theme.button} flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 hover:shadow-xl`}
          >
            <span>Start a Project</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/portfolio"
            className={`group px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 hover:shadow-lg ${
              isDark
                ? 'border-gray-700 text-gray-300 hover:bg-indigo-600 hover:text-white'
                : 'border-gray-300 text-gray-700 hover:bg-indigo-500 hover:text-white'
            }`}
          >
            <span className="group-hover:scale-105 transition-transform block">
              View Our Work
            </span>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div
          className={`mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          } animate-fade-in-up`}
          style={{ animationDelay: '400ms' }}
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-white ${
                    isDark
                      ? 'bg-gradient-to-r from-indigo-700 to-purple-700'
                      : 'bg-gradient-to-r from-indigo-400 to-purple-400'
                  }`}
                ></div>
              ))}
            </div>
            <span>Trusted by 500+ brands</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="text-yellow-400">★</div>
              ))}
            </div>
            <span>5.0 Rating</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div
          className={`w-6 h-10 border-2 rounded-full flex justify-center ${
            isDark ? 'border-gray-600' : 'border-gray-300'
          }`}
        >
          <div
            className={`w-1 h-3 rounded-full mt-2 animate-pulse ${
              isDark ? 'bg-gray-500' : 'bg-gray-400'
            }`}
          ></div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-x-reverse {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
        }
        @keyframes slide-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
        .animate-gradient-x-reverse { background-size: 200% 200%; animation: gradient-x-reverse 3s ease infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out both; }
      `}</style>
    </section>
  );
}
