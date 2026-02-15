import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types/testimonial';
import { v4 as uuidv4 } from 'uuid';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (testimonial: Testimonial) => void;
  testimonialToEdit?: Testimonial | null;
}

export function TestimonialModal({ isOpen, onClose, onSave, testimonialToEdit }: TestimonialModalProps) {
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    rating: 5,
    text: '',
    avatar: '',
  });

  useEffect(() => {
    if (testimonialToEdit) {
      setFormData(testimonialToEdit);
    } else {
      setFormData({
        name: '',
        rating: 5,
        text: '',
        avatar: '',
      });
    }
  }, [testimonialToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.text) {
      const savedTestimonial: Testimonial = {
        id: testimonialToEdit ? testimonialToEdit.id : uuidv4(),
        name: formData.name || '',
        rating: formData.rating || 5,
        text: formData.text || '',
        avatar: formData.avatar || (formData.name ? formData.name.substring(0, 2).toUpperCase() : 'UR'),
      };
      onSave(savedTestimonial);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{testimonialToEdit ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg h-32"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
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
