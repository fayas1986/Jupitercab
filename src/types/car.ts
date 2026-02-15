export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  image: string;
  price: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  seats: number;
  category: 'Sedan' | 'SUV' | 'Sports' | 'Economy' | 'Luxury' | 'Convertible';
  rating: number;
  reviews: number;
  status: 'Available' | 'On Ride';
  features: string[];
  pricePerKm?: number;
  slabPrice0to100?: number;
  slabPrice100to200?: number;
  slabPrice200to300?: number;
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
  location: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  insurance: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
}
