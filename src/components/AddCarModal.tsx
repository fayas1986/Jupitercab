import React, { useState } from 'react';
import { X as XIcon } from 'lucide-react';
import { Car } from '../types/car';
import { v4 as uuidv4 } from 'uuid';
import { ImageCropper } from './ImageCropper';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCar: (newCar: Car) => void;
}

export function AddCarModal({ isOpen, onClose, onAddCar }: AddCarModalProps) {
  const [carDetails, setCarDetails] = useState<Partial<Car>>({
    id: '',
    name: '',
    brand: '',
    model: '',
    year: 2023,
    image: '',
    price: 0,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    category: 'Sedan',
    rating: 0,
    reviews: 0,
    status: 'Available',
    features: [],
    pricePerKm: 15,
    slabPrice0to100: 25,
    slabPrice100to200: 20,
    slabPrice200to300: 15,
  });

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setCarDetails(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : parseFloat(value)) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToCrop(reader.result as string);
        setIsCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    setCarDetails(prev => ({
      ...prev,
      image: croppedImage,
    }));
    setImageToCrop(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (carDetails.name && carDetails.brand && carDetails.model && carDetails.image) {
      const newCar: Car = {
        ...carDetails as Car,
        id: uuidv4(),
        rating: carDetails.rating || 4.5, // Default rating
        reviews: carDetails.reviews || 0, // Default reviews
      };
      onAddCar(newCar);
      onClose();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold">Add New Car</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Name</label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <input type="text" name="name" value={carDetails.name} onChange={handleChange} placeholder="e.g. Swift Dzire" className="w-full p-3 border rounded-lg" required />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The name of the car (e.g., Swift Dzire).</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <input type="text" name="brand" value={carDetails.brand} onChange={handleChange} placeholder="e.g. Maruti Suzuki" className="w-full p-3 border rounded-lg" required />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The brand or manufacturer of the car (e.g., Maruti Suzuki).</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <input type="text" name="model" value={carDetails.model} onChange={handleChange} placeholder="e.g. VXI" className="w-full p-3 border rounded-lg" required />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The specific model of the car (e.g., VXI).</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <input type="number" name="year" value={carDetails.year} onChange={handleChange} placeholder="e.g. 2023" className="w-full p-3 border rounded-lg" required />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The manufacturing year of the car.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Car Image</label>
            <Tooltip>
              <TooltipTrigger asChild>
                <input type="file" name="image" onChange={handleImageChange} className="w-full p-3 border rounded-lg" accept="image/*" required />
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload an image of the car.</p>
              </TooltipContent>
            </Tooltip>
            {carDetails.image && (
              <div className="mt-2 relative h-40 w-full rounded-lg overflow-hidden border border-gray-200">
                <img src={carDetails.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <select name="transmission" value={carDetails.transmission} onChange={handleChange} className="w-full p-3 border rounded-lg">
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the transmission type (Automatic or Manual).</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <select name="fuelType" value={carDetails.fuelType} onChange={handleChange} className="w-full p-3 border rounded-lg">
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the fuel type.</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seats</label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <input type="number" name="seats" value={carDetails.seats} onChange={handleChange} placeholder="e.g. 5" className="w-full p-3 border rounded-lg" required />
                </TooltipTrigger>
                <TooltipContent>
                  <p>The total number of seats in the car.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Price field removed as per request */}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price per Km</label>
            <Tooltip>
              <TooltipTrigger asChild>
                <input type="number" name="pricePerKm" value={carDetails.pricePerKm} onChange={handleChange} placeholder="e.g. 15" className="w-full p-3 border rounded-lg" />
              </TooltipTrigger>
              <TooltipContent>
                <p>The standard price charged per kilometer.</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col h-full">
              <label className="block text-sm font-medium text-gray-700 mb-1 md:min-h-[40px] md:flex md:items-end">0-100 Km Price</label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <input type="number" name="slabPrice0to100" value={carDetails.slabPrice0to100} onChange={handleChange} placeholder="e.g. 25" className="w-full p-3 border rounded-lg mt-auto" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Price per kilometer for the first 100 kilometers.</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex flex-col h-full">
              <label className="block text-sm font-medium text-gray-700 mb-1 md:min-h-[40px] md:flex md:items-end">100-200 Km Price</label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <input type="number" name="slabPrice100to200" value={carDetails.slabPrice100to200} onChange={handleChange} placeholder="e.g. 20" className="w-full p-3 border rounded-lg mt-auto" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Price per kilometer for distance between 100 and 200 kilometers.</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex flex-col h-full">
              <label className="block text-sm font-medium text-gray-700 mb-1 md:min-h-[40px] md:flex md:items-end">200-300 Km Price</label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <input type="number" name="slabPrice200to300" value={carDetails.slabPrice200to300} onChange={handleChange} placeholder="e.g. 15" className="w-full p-3 border rounded-lg mt-auto" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Price per kilometer for distance between 200 and 300 kilometers.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg rounded-xl mt-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
            Add Car
          </button>
        </form>
      </div>

      {imageToCrop && (
        <ImageCropper
          imageSrc={imageToCrop}
          isOpen={isCropperOpen}
          onClose={() => setIsCropperOpen(false)}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
}