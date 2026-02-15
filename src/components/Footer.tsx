import { Car, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">Jupiter Tours & Travels</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for premium car rentals. Experience luxury and comfort on every journey.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-blue-500 transition-colors">Home</a></li>
              <li><a href="#cars" className="hover:text-blue-500 transition-colors">Browse Cars</a></li>
              <li><a href="#about" className="hover:text-blue-500 transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
              <li><Link to="/sign-in" className="hover:text-blue-500 transition-colors">Admin Sign In</Link></li>
            </ul>
          </div>



          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>JJ Car Parking, VOC Nagar, Rameswaram</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+91 97912 89822</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>support@jupiter.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Jupiter Tours & Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
