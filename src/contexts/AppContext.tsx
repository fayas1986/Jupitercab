import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { Car as CarType } from '../types/car';
import { Testimonial } from '../types/testimonial';
import { Package } from '../types/package';
import { cars as initialCars } from '../data/cars';
import { moreCars as initialMoreCars } from '../data/moreCars';
import { convertibles as initialConvertibles } from '../data/convertibles';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  allCars: CarType[];
  setAllCars: React.Dispatch<React.SetStateAction<CarType[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  packages: Package[];
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  allCars: [],
  setAllCars: () => {},
  testimonials: [],
  setTestimonials: () => {},
  packages: [],
  setPackages: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allCars, setAllCars] = useState<CarType[]>(() => {
    const savedCars = localStorage.getItem('allCars');
    if (savedCars) {
      const parsedCars = JSON.parse(savedCars);
      // Migration: Add missing pricing fields if they don't exist, and force update old defaults
      return parsedCars.map((car: any) => {
        // Check if the car has the old defaults (10, 50, 45, 40) or missing values
        const hasOldDefaults = car.pricePerKm === 10 && car.slabPrice0to100 === 50;
        
        if (hasOldDefaults || car.pricePerKm === undefined) {
          return {
            ...car,
            pricePerKm: 15,
            slabPrice0to100: 25,
            slabPrice100to200: 20,
            slabPrice200to300: 15,
          };
        }
        
        return car;
      });
    } else {
      return [...initialCars, ...initialMoreCars, ...initialConvertibles].map(car => ({
        ...car,
        id: uuidv4(),
        status: 'Available',
        pricePerKm: car.pricePerKm || 15,
        slabPrice0to100: car.slabPrice0to100 || 25,
        slabPrice100to200: car.slabPrice100to200 || 20,
        slabPrice200to300: car.slabPrice200to300 || 15,
      }));
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const savedTestimonials = localStorage.getItem('testimonials');
    if (savedTestimonials) {
      return JSON.parse(savedTestimonials);
    } else {
      return [
        {
          id: uuidv4(),
          name: 'Sarah Johnson',
          rating: 5,
          text: 'Absolutely fantastic service! The booking process was seamless and the car was in perfect condition. Will definitely use again.',
          avatar: 'SJ'
        },
        {
          id: uuidv4(),
          name: 'Michael Chen',
          rating: 5,
          text: 'Best car rental experience ever. Great prices, amazing customer support, and the luxury car made our trip unforgettable.',
          avatar: 'MC'
        },
        {
          id: uuidv4(),
          name: 'Emily Rodriguez',
          rating: 5,
          text: 'I rent from Jupiter regularly for weekend trips. Always reliable, clean cars, and the staff is incredibly helpful.',
          avatar: 'ER'
        },
        {
          id: uuidv4(),
          name: 'David Thompson',
          rating: 5,
          text: 'We use Jupiter for all our corporate rentals. Professional service, competitive rates, and a great fleet selection.',
          avatar: 'DT'
        }
      ];
    }
  });

  const [packages, setPackages] = useState<Package[]>(() => {
    const savedPackages = localStorage.getItem('packages');
    if (savedPackages) {
      return JSON.parse(savedPackages);
    } else {
      return [
        {
          id: '1',
          title: 'Rameshwaram Sightseeing Tour by Car',
          price: 'Starting @ Rs.2,999',
          pax: 'Upto 4 Pax',
          vehicle: 'Sedan Cab',
          organizer: 'OneDay.travel',
          image: 'https://rameshwaramtourism.co.in/images/places-to-visit/header/lakshmana-tirtham-rameshwaram-tourism-entry-fee-timings-holidays-reviews-header.jpg'
        },
        {
          id: '2',
          title: 'One Day Madurai to Rameshwaram Tour by Car',
          price: 'Starting @ Rs.5,799',
          pax: 'Upto 4 Pax',
          vehicle: 'Sedan Cab',
          organizer: 'OneDay.travel',
          image: 'https://rameshwaramtourism.co.in/images/places-to-visit/header/dhanushkodi-beach-rameshwaram-tourism-entry-fee-timings-holidays-reviews-header.jpg'
        },
        {
          id: '3',
          title: 'Madurai Sightseeing Tour by Car',
          price: 'Starting @ Rs.2,499',
          pax: 'Upto 4 Pax',
          vehicle: 'Sedan Cab',
          organizer: 'OneDay.travel',
          image: 'https://rameshwaramtourism.co.in/images/places-to-visit/header/pamban-bridge-rameshwaram-tourism-entry-fee-timings-holidays-reviews-header.jpg'
        }
      ];
    }
  });

  useEffect(() => {
    console.log('allCars state changed:', allCars);
    localStorage.setItem('allCars', JSON.stringify(allCars));
    console.log('localStorage after update:', localStorage.getItem('allCars'));
  }, [allCars]);

  useEffect(() => {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('packages', JSON.stringify(packages));
  }, [packages]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        allCars,
        setAllCars,
        testimonials,
        setTestimonials,
        packages,
        setPackages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
