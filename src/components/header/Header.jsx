'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutGrid,
  Briefcase,
  Users,
  FileText,
  Mail,
  ArrowRight,
  Palette,
} from 'lucide-react';
import { useTheme } from '@/components/home/ThemeContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('');

  // Theme context
  const { currentTheme, setCurrentTheme, theme } = useTheme();

  const navItems = [
    { name: 'Services', href: '/services', icon: <LayoutGrid className="w-4 h-4 lg:w-5 lg:h-5" /> },
    { name: 'Work', href: '/work', icon: <Briefcase className="w-4 h-4 lg:w-5 lg:h-5" /> },
    { name: 'About', href: '/about', icon: <Users className="w-4 h-4 lg:w-5 lg:h-5" /> },
    { name: 'Blog', href: '/blog', icon: <FileText className="w-4 h-4 lg:w-5 lg:h-5" /> },
    { name: 'Contact', href: '/contact', icon: <Mail className="w-4 h-4 lg:w-5 lg:h-5" /> },
  ];

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cycle through Twitter themes: default, dark, dim
  const themes = ['default', 'dark', 'dim'];
  const handleThemeToggle = () => {
    const nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  return (
    <>
      {/* Top Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${theme.header.bg} ${
          isScrolled ? 'shadow-md' : 'shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-5">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 group" onMouseEnter={() => setActiveNav('')}>
              <div className="relative w-36 h-8 lg:w-44 lg:h-10 transition-transform duration-300 group-hover:scale-[1.03] group-hover:opacity-90">
                <Image
                  src="/images/Stackbiite-logo.png"
                  alt="Stackbiite"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-0">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-5 py-3 font-medium transition-all duration-300 relative group rounded-xl hover:rounded-2xl ${
                    activeNav === item.name
                      ? `${theme.accent} bg-opacity-10`
                      : `${theme.text} ${theme.header.hover}`
                  }`}
                  onMouseEnter={() => setActiveNav(item.name)}
                  onMouseLeave={() => setActiveNav('')}
                >
                  <span
                    className={`transition-transform duration-300 group-hover:scale-110 ${
                      activeNav === item.name ? theme.accent : `${theme.text} opacity-70`
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="tracking-wide">{item.name}</span>

                  {/* Active underline */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-[2px] ${theme.badge} rounded-full transition-all duration-300 origin-center ${
                      activeNav === item.name ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  ></div>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Switcher */}
              <button
                onClick={handleThemeToggle}
                title="Change Theme"
                className={`p-3 rounded-full shadow-md transition-all duration-300 active:scale-95 ${theme.button}`}
              >
                <Palette className="w-4 h-4 text-white" />
              </button>

              {/* Desktop CTA */}
              <div className="hidden lg:block flex-shrink-0">
                <Link
                  href="/get-started"
                  className={`group relative ${theme.button} text-white px-6 py-3 rounded-lg font-medium overflow-hidden hover:opacity-90 transition-all duration-300 flex items-center space-x-2`}
                >
                  <span className="relative z-10">Get Started</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation (Mobile) */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden ${theme.header.bg} backdrop-blur-xl border-t border-gray-600`}
      >
        <div className="max-w-7xl mx-auto px-2">
          <div className="flex justify-between items-center py-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center space-y-1 flex-1 py-2 rounded-xl transition-all duration-300 active:scale-95 ${
                  activeNav === item.name
                    ? `${theme.accent} bg-opacity-10`
                    : `${theme.text} opacity-80`
                }`}
                onClick={() => setActiveNav(item.name)}
              >
                <div
                  className={`p-2 rounded-lg transition-transform duration-300 group-hover:scale-110 ${
                    activeNav === item.name ? theme.accent : theme.text
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-xs font-medium tracking-tight">{item.name}</span>
                <div
                  className={`w-1 h-1 ${theme.badge} rounded-full transition-all duration-300 ${
                    activeNav === item.name ? 'scale-100' : 'scale-0'
                  }`}
                ></div>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom padding for mobile nav */}
      <div className="lg:hidden pb-20"></div>
    </>
  );
};

export default Header;
