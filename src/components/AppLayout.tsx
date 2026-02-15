import { useState, useMemo } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { PackageCarousel } from './PackageCarousel';
import { Features } from './Features';
import { Testimonials } from './Testimonials';
import { CarCard } from './CarCard';
import { BookingModal } from './BookingModal';
import { UserProfile } from './UserProfile';
import { WhatsAppButton } from './WhatsAppButton';
import { Footer } from './Footer';
import { Car } from '../types/car';
import { ArrowUpDown } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

export default function AppLayout() {
  const { allCars } = useAppContext();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const handleBookCar = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const filteredCars = useMemo(() => {
    let result = allCars.filter(car => {
      if (car.status !== 'Available') return false;
      return true;
    });

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [allCars, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onProfileClick={() => setIsProfileOpen(true)}
      />
      <Hero />
      <section id="packages">
        <PackageCarousel />
      </section>
      <Features />

      <section id="cars" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Available Cars</h2>
              <p className="text-gray-600 mt-2">{filteredCars.length} vehicles available</p>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-5 h-5 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} onBook={handleBookCar} />
            ))}
          </div>
          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No cars match your filters. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </section>

      <Testimonials />
      <Footer />
      
      <BookingModal car={selectedCar} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {isProfileOpen && <UserProfile onClose={() => setIsProfileOpen(false)} />}
      <WhatsAppButton />
    </div>
  );
}
