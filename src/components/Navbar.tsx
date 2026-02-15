import { useState, useEffect } from 'react';
import { Car, Menu, X, Shield } from 'lucide-react';
import { UserButton, SignedIn, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../lib/admin';
import { cn } from '../lib/utils';

interface NavbarProps {
  onProfileClick: () => void;
}

export function Navbar({ onProfileClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const showAdmin = isAdminUser(user?.primaryEmailAddress?.emailAddress);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Browse Cars', href: '#cars' },
    { name: 'Packages', href: '#packages' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className={cn(
              "p-2 rounded-xl transition-all duration-500 ease-in-out group-hover:rotate-12 group-hover:scale-110", 
              scrolled ? "bg-blue-50" : "bg-white/10 backdrop-blur-sm"
            )}>
              <Car className={cn("w-8 h-8 transition-colors duration-300", scrolled ? "text-blue-600" : "text-white")} />
            </div>
            <span className={cn(
              "text-2xl font-bold transition-all duration-300 bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 group-hover:tracking-wider", 
              scrolled ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600" : "text-white"
            )}>
              Jupiter
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105",
                  scrolled 
                    ? "text-gray-700 hover:bg-blue-50 hover:text-blue-600" 
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {showAdmin && (
              <button
                onClick={handleAdminClick}
                className={cn(
                  "flex items-center gap-2 font-medium transition-colors px-4 py-2 rounded-full border",
                  scrolled
                    ? "text-gray-700 border-gray-200 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                    : "text-white border-white/20 hover:bg-white/10"
                )}
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
            )}

            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border-2 border-white/20"
                  }
                }}
              />
            </SignedIn>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn("md:hidden p-2 rounded-lg transition-colors", scrolled ? "text-gray-700" : "text-white")}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t absolute top-full left-0 right-0 shadow-lg animate-fade-in-down">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-700 hover:text-blue-600 font-medium text-lg px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            {showAdmin && (
              <button 
                onClick={() => {
                  handleAdminClick();
                  setIsMenuOpen(false);
                }} 
                className="w-full text-left flex items-center gap-2 text-gray-700 hover:text-orange-600 font-medium px-2 py-1"
              >
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </button>
            )}
            <SignedIn>
              <div className="px-2 pt-2">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  );
}
