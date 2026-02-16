import React, { useState, useEffect } from 'react';
import { Car, Users, DollarSign, TrendingUp, Plus, Edit, Trash2, MessageSquare, Package as PackageIcon } from 'lucide-react';
import { Car as CarType } from '../types/car';
import { Testimonial } from '../types/testimonial';
import { Package } from '../types/package';
import { AddCarModal } from './AddCarModal';
import { EditCarModal } from './EditCarModal';
import { TestimonialModal } from './TestimonialModal';
import { PackageModal } from './PackageModal';
import { cars as initialCars } from '../data/cars';
import { moreCars as initialMoreCars } from '../data/moreCars';
import { convertibles as initialConvertibles } from '../data/convertibles';
import { useAppContext } from '../contexts/AppContext';

interface AdminDashboardProps {}

export function AdminDashboard() {
  const { 
    allCars, setAllCars, 
    testimonials, setTestimonials, 
    packages, setPackages, 
    addPackage, updatePackage, deletePackage,
    addCar, updateCar, deleteCar,
    addTestimonial, updateTestimonial, deleteTestimonial
  } = useAppContext();

  // Placeholder for booking data to calculate revenue
  const [bookings, setBookings] = useState<any[]>([
    { id: 'b1', carId: 'car-1', startDate: '2023-10-01', endDate: '2023-10-05', totalPrice: 250 },
    { id: 'b2', carId: 'car-2', startDate: '2023-10-03', endDate: '2023-10-07', totalPrice: 300 },
    { id: 'b3', carId: 'car-1', startDate: '2023-10-10', endDate: '2023-10-12', totalPrice: 100 },
    { id: 'b4', carId: 'car-3', startDate: '2023-10-15', endDate: '2023-10-20', totalPrice: 400 },
    { id: 'b5', carId: 'car-2', startDate: '2023-11-01', endDate: '2023-11-04', totalPrice: 200 },
    { id: 'b6', carId: 'car-4', startDate: '2023-11-05', endDate: '2023-11-10', totalPrice: 350 },
    { id: 'b7', carId: 'car-3', startDate: '2023-11-12', endDate: '2023-11-15', totalPrice: 180 },
    { id: 'b8', carId: 'car-1', startDate: '2023-11-20', endDate: '2023-11-25', totalPrice: 280 },
  ]);

  // Calculate revenue
  const calculateRevenue = (timeframe: 'monthly' | 'weekly') => {
    const now = new Date();
    let totalRevenue = 0;

    bookings.forEach(booking => {
      const bookingEndDate = new Date(booking.endDate);
      if (timeframe === 'monthly') {
        if (bookingEndDate.getMonth() === now.getMonth() && bookingEndDate.getFullYear() === now.getFullYear()) {
          totalRevenue += booking.totalPrice;
        }
      } else if (timeframe === 'weekly') {
        const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        if (bookingEndDate >= oneWeekAgo && bookingEndDate <= now) {
          totalRevenue += booking.totalPrice;
        }
      }
    });
    return totalRevenue;
  };

  const monthlyRevenue = calculateRevenue('monthly');
  const weeklyRevenue = calculateRevenue('weekly');
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [isEditCarModalOpen, setIsEditCarModalOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState<CarType | null>(null);

  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [testimonialToEdit, setTestimonialToEdit] = useState<Testimonial | null>(null);

  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [packageToEdit, setPackageToEdit] = useState<Package | null>(null);

  const handleAddCar = async (newCar: CarType) => {
    await addCar(newCar);
    setIsAddCarModalOpen(false);
  };

  const handleEditCar = async (editedCar: CarType) => {
    await updateCar(editedCar);
    setIsEditCarModalOpen(false);
  };

  const handleOpenEditModal = (car: CarType) => {
    setCarToEdit(car);
    setIsEditCarModalOpen(true);
  };

  const handleDeleteCar = async (carId: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      await deleteCar(carId);
    }
  };

  const handleSaveTestimonial = async (testimonial: Testimonial) => {
    if (testimonialToEdit) {
      await updateTestimonial(testimonial);
    } else {
      await addTestimonial(testimonial);
    }
    setIsTestimonialModalOpen(false);
  };

  const handleOpenAddTestimonialModal = () => {
    setTestimonialToEdit(null);
    setIsTestimonialModalOpen(true);
  };

  const handleOpenEditTestimonialModal = (testimonial: Testimonial) => {
    setTestimonialToEdit(testimonial);
    setIsTestimonialModalOpen(true);
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      await deleteTestimonial(id);
    }
  };

  const handleSavePackage = async (pkg: Package) => {
    if (packageToEdit) {
      await updatePackage(pkg);
    } else {
      await addPackage(pkg);
    }
    setIsPackageModalOpen(false);
  };

  const handleOpenAddPackageModal = () => {
    setPackageToEdit(null);
    setIsPackageModalOpen(true);
  };

  const handleOpenEditPackageModal = (pkg: Package) => {
    setPackageToEdit(pkg);
    setIsPackageModalOpen(true);
  };

  const handleDeletePackage = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      await deletePackage(id);
    }
  };

  const stats = [
    { icon: Car, label: 'Total Cars', value: allCars.length, color: 'bg-blue-500' },
    { icon: DollarSign, label: 'Monthly Revenue', value: `₹${monthlyRevenue.toFixed(2)}`, color: 'bg-green-500' },
    { icon: TrendingUp, label: 'Weekly Revenue', value: `₹${weeklyRevenue.toFixed(2)}`, color: 'bg-yellow-500' },
    { icon: MessageSquare, label: 'Testimonials', value: testimonials.length, color: 'bg-purple-500' },
    { icon: PackageIcon, label: 'Packages', value: packages.length, color: 'bg-orange-500' },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.color} text-white p-6 rounded-lg shadow-md flex items-center space-x-4`}>
              <stat.icon size={36} />
              <div>
                <div className="text-sm font-medium">{stat.label}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Car Management</h2>
            <button
              onClick={() => setIsAddCarModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add New Car
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allCars.map((car: any) => (
                  <tr key={car.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{car.brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.model}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.color}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{car.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${car.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {car.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenEditModal(car)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteCar(car.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Testimonials Management</h2>
            <button
              onClick={handleOpenAddTestimonialModal}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            >
              Add New Testimonial
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {testimonial.avatar && (testimonial.avatar.startsWith('data:') || testimonial.avatar.startsWith('http')) ? (
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {testimonial.avatar || testimonial.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{testimonial.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testimonial.rating} Stars</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{testimonial.text}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenEditTestimonialModal(testimonial)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Package Management</h2>
            <button
              onClick={handleOpenAddPackageModal}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
            >
              Add New Package
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passengers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {packages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-xs truncate">{pkg.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.pax}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.vehicle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenEditPackageModal(pkg)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddCarModal
        isOpen={isAddCarModalOpen}
        onClose={() => setIsAddCarModalOpen(false)}
        onAddCar={handleAddCar}
      />
      <EditCarModal
        isOpen={isEditCarModalOpen}
        onClose={() => setIsEditCarModalOpen(false)}
        onEditCar={handleEditCar}
        carToEdit={carToEdit}
      />
      <TestimonialModal
        isOpen={isTestimonialModalOpen}
        onClose={() => setIsTestimonialModalOpen(false)}
        onSave={handleSaveTestimonial}
        testimonialToEdit={testimonialToEdit}
      />
      <PackageModal
        isOpen={isPackageModalOpen}
        onClose={() => setIsPackageModalOpen(false)}
        onSave={handleSavePackage}
        packageToEdit={packageToEdit}
      />
    </>
  );
}
