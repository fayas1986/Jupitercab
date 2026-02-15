import { Package } from '../types/package';
import { Car } from '../types/car';
import { Testimonial } from '../types/testimonial';

const API_URL = 'http://localhost:5000/api';

export const api = {
  // Packages
  getPackages: async (): Promise<Package[]> => {
    const response = await fetch(`${API_URL}/packages`);
    if (!response.ok) throw new Error('Failed to fetch packages');
    return response.json();
  },

  createPackage: async (pkg: Omit<Package, 'id'>): Promise<Package> => {
    const response = await fetch(`${API_URL}/packages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pkg),
    });
    if (!response.ok) throw new Error('Failed to create package');
    return response.json();
  },

  updatePackage: async (pkg: Package): Promise<Package> => {
    const response = await fetch(`${API_URL}/packages/${pkg.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pkg),
    });
    if (!response.ok) throw new Error('Failed to update package');
    return response.json();
  },

  deletePackage: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/packages/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete package');
  },

  // Cars
  getCars: async (): Promise<Car[]> => {
    const response = await fetch(`${API_URL}/cars`);
    if (!response.ok) throw new Error('Failed to fetch cars');
    return response.json();
  },

  createCar: async (car: Omit<Car, 'id'>): Promise<Car> => {
    const response = await fetch(`${API_URL}/cars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });
    if (!response.ok) throw new Error('Failed to create car');
    return response.json();
  },

  updateCar: async (car: Car): Promise<Car> => {
    const response = await fetch(`${API_URL}/cars/${car.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });
    if (!response.ok) throw new Error('Failed to update car');
    return response.json();
  },

  deleteCar: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/cars/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete car');
  },

  // Testimonials
  getTestimonials: async (): Promise<Testimonial[]> => {
    const response = await fetch(`${API_URL}/testimonials`);
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    return response.json();
  },

  createTestimonial: async (testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> => {
    const response = await fetch(`${API_URL}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial),
    });
    if (!response.ok) throw new Error('Failed to create testimonial');
    return response.json();
  },

  updateTestimonial: async (testimonial: Testimonial): Promise<Testimonial> => {
    const response = await fetch(`${API_URL}/testimonials/${testimonial.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial),
    });
    if (!response.ok) throw new Error('Failed to update testimonial');
    return response.json();
  },

  deleteTestimonial: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/testimonials/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete testimonial');
  },
};
