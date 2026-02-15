import { Car } from '../types/car';

export const convertibles: Car[] = [
  {
    id: '13',
    name: 'BMW Z4',
    brand: 'BMW',
    model: 'Z4',
    year: 2024,
    image: 'https://d64gsuwffb70l.cloudfront.net/69019f02b9bee6cc9953e115_1761714063269_48890e6e.webp',
    price: 189,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 2,
    category: 'Convertible',
    rating: 4.8,
    reviews: 145,
    status: 'Available',
    features: ['Convertible Top', 'Sport Seats', 'Premium Audio', 'GPS']
  },
  {
    id: '14',
    name: 'Mercedes-Benz SL',
    brand: 'Mercedes-Benz',
    model: 'SL-Class',
    year: 2024,
    image: 'https://d64gsuwffb70l.cloudfront.net/69019f02b9bee6cc9953e115_1761714065002_b91b2237.webp',
    price: 249,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 2,
    category: 'Convertible',
    rating: 4.9,
    reviews: 178,
    status: 'Available',
    features: ['Retractable Hardtop', 'Leather Interior', 'Heated Seats', 'Surround Sound']
  },
  {
    id: '15',
    name: 'Porsche Boxster',
    brand: 'Porsche',
    model: 'Boxster',
    year: 2024,
    image: 'https://d64gsuwffb70l.cloudfront.net/69019f02b9bee6cc9953e115_1761714066730_165fd92c.webp',
    price: 229,
    transmission: 'Manual',
    fuelType: 'Petrol',
    seats: 2,
    category: 'Convertible',
    rating: 4.9,
    reviews: 156,
    status: 'Available',
    features: ['Mid-Engine', 'Sport Chrono', 'PASM Suspension', 'Bose Audio']
  }
];
