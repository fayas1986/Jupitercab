import { User, Calendar, CreditCard, MapPin, Download, X as XIcon } from 'lucide-react';

interface UserProfileProps {
  onClose: () => void;
}

export function UserProfile({ onClose }: UserProfileProps) {
  const bookings = [
    {
      id: 'BK001',
      car: 'Mercedes-Benz S-Class',
      startDate: '2024-11-15',
      endDate: '2024-11-20',
      location: 'New York, NY',
      total: 1495,
      status: 'confirmed'
    },
    {
      id: 'BK002',
      car: 'BMW X7',
      startDate: '2024-10-10',
      endDate: '2024-10-15',
      location: 'Los Angeles, CA',
      total: 1645,
      status: 'completed'
    },
    {
      id: 'BK003',
      car: 'Porsche 911',
      startDate: '2024-09-05',
      endDate: '2024-09-08',
      location: 'Miami, FL',
      total: 1497,
      status: 'completed'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-3xl font-bold">My Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">John Doe</h3>
                <p className="text-blue-100">john.doe@email.com</p>
                <p className="text-blue-100">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">My Bookings</h3>
            <div className="space-y-4">
              {bookings.map(booking => (
                <div key={booking.id} className="border-2 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xl font-bold mb-2">{booking.car}</div>
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{booking.startDate} to {booking.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{booking.location}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold">Total: ₹{booking.total}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
                        <Download className="w-4 h-4" />
                        Invoice
                      </button>
                      {booking.status === 'confirmed' && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold">
                          <XIcon className="w-4 h-4" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
