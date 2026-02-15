import { useState } from 'react';
import { X, Calendar, MapPin, Shield, CreditCard } from 'lucide-react';
import { Car } from '../types/car';
import { useAppContext } from '../contexts/AppContext'; // Import useAppContext

interface BookingModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ car, isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const { setAllCars } = useAppContext(); // Access setAllCars from context
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    location: '',
    insurance: false,
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  if (!isOpen || !car) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert(`Booking confirmed for ${car.name}! Booking ID: BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
      // Update car status to 'On Ride'
      setAllCars(prevCars =>
        prevCars.map(c => (c.id === car.id ? { ...c, status: 'On Ride' } : c))
      );
      onClose();
      setStep(1);
    }
  };

  const days = formData.startDate && formData.endDate 
    ? Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = days * car.price + (formData.insurance ? days * 15 : 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Book {car.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 h-2 rounded ${s <= step ? 'bg-blue-600' : 'bg-gray-200'} ${s < 3 ? 'mr-2' : ''}`} />
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" /> Rental Details
                </h3>
                <div>
                  <label className="block font-semibold mb-2">Pick-up Date</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Return Date</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Pick-up Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Enter city or address"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Insurance & Add-ons
                </h3>
                <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.insurance}
                    onChange={(e) => setFormData({...formData, insurance: e.target.checked})}
                    className="w-5 h-5 mt-1"
                  />
                  <div>
                    <div className="font-semibold">Premium Insurance</div>
                                     <div className="text-sm text-gray-600">Full coverage with zero deductible - ₹15/day</div>
                  </div>
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Payment
                </h3>
                <div>
                  <label className="block font-semibold mb-2">Card Number</label>
                  <input type="text" required placeholder="1234 5678 9012 3456" className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Cardholder Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">Expiry</label>
                    <input type="text" required placeholder="MM/YY" className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">CVV</label>
                    <input type="text" required placeholder="123" className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Daily Rate:</span>
                <span className="font-semibold">₹{car.price}/day</span>
              </div>
              {days > 0 && (
                <>
                  <div className="flex justify-between mb-2">
                    <span>Duration:</span>
                    <span className="font-semibold">{days} days</span>
                  </div>
                  {formData.insurance && (
                    <div className="flex justify-between mb-2">
                      <span>Insurance:</span>
                     <span className="font-semibold">₹{days * 15}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold border-t pt-2 mt-2">
                    <span>Total:</span>
                    <span className="font-semibold text-lg">₹{totalPrice}</span>
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg"
            >
              {step === 3 ? 'Confirm Booking' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
