import { Car } from '../types/car';
import { Star, Users, Fuel, Settings } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onBook: (car: Car) => void;
}

export function CarCard({ car, onBook }: CarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img src={car.image} alt={car.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
        {car.status === 'Available' && (
          <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Available
          </span>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
            <p className="text-gray-600 text-sm">{car.brand} • {car.year}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{car.rating}</span>
            <span className="text-gray-500 text-sm">({car.reviews})</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="w-4 h-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            <span>{car.fuelType}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="flex flex-col">
            <div>
              <span className="text-3xl font-bold text-blue-600">₹{car.pricePerKm || car.price}</span>
              <span className="text-gray-600">/km</span>
            </div>
            {(car.slabPrice0to100 || car.slabPrice100to200 || car.slabPrice200to300) && (
              <div className="text-xs text-gray-500 mt-1">
                {car.slabPrice0to100 && <p>0-100km: ₹{car.slabPrice0to100}/km</p>}
                {car.slabPrice100to200 && <p>100-200km: ₹{car.slabPrice100to200}/km</p>}
                {car.slabPrice200to300 && <p>200-300km: ₹{car.slabPrice200to300}/km</p>}
              </div>
            )}
          </div>
          <button
            onClick={() => onBook(car)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors self-end"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
