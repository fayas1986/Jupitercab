import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { Car as CarType } from '../types/car';
import { Testimonial } from '../types/testimonial';
import { Package } from '../types/package';
import { cars as initialCars } from '../data/cars';
import { moreCars as initialMoreCars } from '../data/moreCars';
import { convertibles as initialConvertibles } from '../data/convertibles';

import { api } from '../lib/api';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  allCars: CarType[];
  setAllCars: React.Dispatch<React.SetStateAction<CarType[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  packages: Package[];
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>;
  refreshPackages: () => Promise<void>;
  addPackage: (pkg: Omit<Package, 'id'>) => Promise<void>;
  updatePackage: (pkg: Package) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  refreshCars: () => Promise<void>;
  addCar: (car: Omit<CarType, 'id'>) => Promise<void>;
  updateCar: (car: CarType) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  refreshTestimonials: () => Promise<void>;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => Promise<void>;
  updateTestimonial: (testimonial: Testimonial) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
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
  refreshPackages: async () => {},
  addPackage: async () => {},
  updatePackage: async () => {},
  deletePackage: async () => {},
  refreshCars: async () => {},
  addCar: async () => {},
  updateCar: async () => {},
  deleteCar: async () => {},
  refreshTestimonials: async () => {},
  addTestimonial: async () => {},
  updateTestimonial: async () => {},
  deleteTestimonial: async () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allCars, setAllCars] = useState<CarType[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  // Cars API methods
  const refreshCars = async () => {
    try {
      const data = await api.getCars();
      setAllCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch cars from server',
        variant: 'destructive',
      });
    }
  };

  const addCar = async (car: Omit<CarType, 'id'>) => {
    try {
      const newCar = await api.createCar(car);
      setAllCars(prev => [newCar, ...prev]);
      toast({
        title: 'Success',
        description: 'Car added successfully',
      });
    } catch (error) {
      console.error('Error adding car:', error);
      toast({
        title: 'Error',
        description: 'Failed to add car',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateCar = async (car: CarType) => {
    try {
      const updatedCar = await api.updateCar(car);
      setAllCars(prev => prev.map(c => c.id === car.id ? updatedCar : c));
      toast({
        title: 'Success',
        description: 'Car updated successfully',
      });
    } catch (error) {
      console.error('Error updating car:', error);
      toast({
        title: 'Error',
        description: 'Failed to update car',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteCar = async (id: string) => {
    try {
      await api.deleteCar(id);
      setAllCars(prev => prev.filter(c => c.id !== id));
      toast({
        title: 'Success',
        description: 'Car deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting car:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete car',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Testimonials API methods
  const refreshTestimonials = async () => {
    try {
      const data = await api.getTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch testimonials from server',
        variant: 'destructive',
      });
    }
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
    try {
      const newTestimonial = await api.createTestimonial(testimonial);
      setTestimonials(prev => [newTestimonial, ...prev]);
      toast({
        title: 'Success',
        description: 'Testimonial added successfully',
      });
    } catch (error) {
      console.error('Error adding testimonial:', error);
      toast({
        title: 'Error',
        description: 'Failed to add testimonial',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateTestimonial = async (testimonial: Testimonial) => {
    try {
      const updatedTestimonial = await api.updateTestimonial(testimonial);
      setTestimonials(prev => prev.map(t => t.id === testimonial.id ? updatedTestimonial : t));
      toast({
        title: 'Success',
        description: 'Testimonial updated successfully',
      });
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast({
        title: 'Error',
        description: 'Failed to update testimonial',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      await api.deleteTestimonial(id);
      setTestimonials(prev => prev.filter(t => t.id !== id));
      toast({
        title: 'Success',
        description: 'Testimonial deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete testimonial',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Packages API methods
  const refreshPackages = async () => {
    try {
      const data = await api.getPackages();
      setPackages(data);
    } catch (error: any) {
      console.error('Error fetching packages:', error);
      toast({
        title: 'Error',
        description: `Failed to fetch packages: ${error.message || 'Unknown error'}`,
        variant: 'destructive',
      });
    }
  };

  const addPackage = async (pkg: Omit<Package, 'id'>) => {
    try {
      const newPkg = await api.createPackage(pkg);
      setPackages(prev => [newPkg, ...prev]);
      toast({
        title: 'Success',
        description: 'Package added successfully',
      });
    } catch (error) {
      console.error('Error adding package:', error);
      toast({
        title: 'Error',
        description: 'Failed to add package',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updatePackage = async (pkg: Package) => {
    try {
      const updatedPkg = await api.updatePackage(pkg);
      setPackages(prev => prev.map(p => p.id === pkg.id ? updatedPkg : p));
      toast({
        title: 'Success',
        description: 'Package updated successfully',
      });
    } catch (error) {
      console.error('Error updating package:', error);
      toast({
        title: 'Error',
        description: 'Failed to update package',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const deletePackage = async (id: string) => {
    try {
      await api.deletePackage(id);
      setPackages(prev => prev.filter(p => p.id !== id));
      toast({
        title: 'Success',
        description: 'Package deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting package:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete package',
        variant: 'destructive',
      });
      throw error;
    }
  };

  useEffect(() => {
    refreshCars();
    refreshTestimonials();
    refreshPackages();
  }, []);

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
        refreshPackages,
        addPackage,
        updatePackage,
        deletePackage,
        refreshCars,
        addCar,
        updateCar,
        deleteCar,
        refreshTestimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
