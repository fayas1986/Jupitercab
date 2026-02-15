export interface VehicleOption {
  vehicle: string;
  price: string;
}

export interface Package {
  id: string;
  title: string;
  price: string;
  pax: string;
  vehicle: string;
  organizer: string;
  image: string;
  description?: string;
  locations?: string[];
  vehicleOptions?: VehicleOption[];
}
