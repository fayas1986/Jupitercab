import React, { useState, useEffect } from 'react';
import { Car as CarType } from '../types/car';
import { ImageCropper } from './ImageCropper';

interface EditCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditCar: (updatedCar: Car) => void;
  carToEdit: CarType | null;
}

export function EditCarModal({ isOpen, onClose, onEditCar, carToEdit }: EditCarModalProps) {
  const [carDetails, setCarDetails] = useState<CarType>({
    id: '',
    name: '',
    brand: '',
    model: '',
    year: 2024,
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
    pricePerKm: 0,
    slabPrice0to100: 0,
    slabPrice100to200: 0,
    slabPrice200to300: 0,
  });

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  useEffect(() => {
    if (carToEdit) {
      setCarDetails(carToEdit);
    } else {
      setCarDetails({
        id: '',
        name: '',
        brand: '',
        model: '',
        year: 2024,
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
        pricePerKm: 0,
        slabPrice0to100: 0,
        slabPrice100to200: 0,
        slabPrice200to300: 0,
      });
    }
  }, [carToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setCarDetails(prevDetails => ({
      ...prevDetails,
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
    console.log('Submitting car details from EditCarModal:', carDetails); // Add this line
    if (carDetails) {
      onEditCar(carDetails);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{carToEdit ? 'Edit Car Details' : 'Add New Car'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={carDetails.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={carDetails.brand}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              value={carDetails.model}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={carDetails.year}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">Color</label>
            <input
              type="text"
              id="color"
              name="color"
              value={carDetails.color}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={carDetails.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={carDetails.status}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="Available">Available</option>
              <option value="On Ride">On Ride</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image URL or Upload</label>
            <input
              type="text"
              id="image"
              name="image"
              value={carDetails.image}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
              placeholder="Enter Image URL"
            />
            <input 
              type="file" 
              onChange={handleImageChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              accept="image/*" 
            />
            {carDetails.image && (
              <div className="mt-2 relative h-40 w-full rounded-lg overflow-hidden border border-gray-200">
                <img src={carDetails.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerKm">Price per Km</label>
            <input
              type="number"
              id="pricePerKm"
              name="pricePerKm"
              value={carDetails.pricePerKm || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slabPrice0to100">0-100 Km Price</label>
              <input
                type="number"
                id="slabPrice0to100"
                name="slabPrice0to100"
                value={carDetails.slabPrice0to100 || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slabPrice100to200">100-200 Km Price</label>
              <input
                type="number"
                id="slabPrice100to200"
                name="slabPrice100to200"
                value={carDetails.slabPrice100to200 || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slabPrice200to300">200-300 Km Price</label>
              <input
                type="number"
                id="slabPrice200to300"
                name="slabPrice200to300"
                value={carDetails.slabPrice200to300 || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {carToEdit ? 'Save Changes' : 'Add Car'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
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