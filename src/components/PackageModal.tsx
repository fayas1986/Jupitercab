import React, { useState, useEffect } from 'react';
import { Package } from '../types/package';
import { v4 as uuidv4 } from 'uuid';

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pkg: Package) => void;
  packageToEdit?: Package | null;
}

export function PackageModal({ isOpen, onClose, onSave, packageToEdit }: PackageModalProps) {
  const [formData, setFormData] = useState<Partial<Package>>({
    title: '',
    price: '',
    pax: '',
    vehicle: '',
    organizer: '',
    image: '',
    description: '',
    locations: [],
    vehicleOptions: [],
  });

  useEffect(() => {
    if (packageToEdit) {
      setFormData(packageToEdit);
    } else {
      setFormData({
        title: '',
        price: '',
        pax: '',
        vehicle: '',
        organizer: '',
        image: '',
        description: '',
        locations: [],
        vehicleOptions: [],
      });
    }
  }, [packageToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const locations = e.target.value.split(',').map(loc => loc.trim());
    setFormData(prev => ({
      ...prev,
      locations: locations,
    }));
  };

  const addVehicleOption = () => {
    setFormData(prev => ({
      ...prev,
      vehicleOptions: [...(prev.vehicleOptions || []), { vehicle: '', price: '' }],
    }));
  };

  const updateVehicleOption = (index: number, field: 'vehicle' | 'price', value: string) => {
    setFormData(prev => {
      const newOptions = [...(prev.vehicleOptions || [])];
      newOptions[index] = { ...newOptions[index], [field]: value };
      return { ...prev, vehicleOptions: newOptions };
    });
  };

  const removeVehicleOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      vehicleOptions: (prev.vehicleOptions || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.price && formData.pax && formData.vehicle && formData.organizer && formData.image) {
      const savedPackage: Package = {
        id: packageToEdit ? packageToEdit.id : uuidv4(),
        title: formData.title || '',
        price: formData.price || '',
        pax: formData.pax || '',
        vehicle: formData.vehicle || '',
        organizer: formData.organizer || '',
        image: formData.image || '',
        description: formData.description || '',
        locations: formData.locations || [],
      };
      onSave(savedPackage);
      onClose();
    } else {
        alert("Please fill in all fields")
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold">{packageToEdit ? 'Edit Package' : 'Add Package'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="e.g. Rameshwaram Sightseeing Tour"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="e.g. Starting @ Rs.2,999"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                <input
                type="text"
                name="pax"
                value={formData.pax}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g. Upto 4 Passengers"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g. Sedan Cab"
                required
                />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organizer</label>
            <input
              type="text"
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="e.g. OneDay.travel"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter package description..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
             <input type="file" name="image" onChange={handleImageChange} className="w-full p-2 border rounded-lg" accept="image/*" />
             {formData.image && (
                 <div className="mt-2">
                     <p className="text-xs text-gray-500 mb-1">Preview:</p>
                     <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                 </div>
             )}
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
