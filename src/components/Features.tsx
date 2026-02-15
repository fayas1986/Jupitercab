import { Shield, Clock, DollarSign, Headphones } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'All vehicles come with comprehensive insurance coverage for your peace of mind.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer service to assist you whenever you need help.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: DollarSign,
      title: 'Best Prices',
      description: 'Competitive rates with no hidden fees. What you see is what you pay.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Headphones,
      title: 'Easy Booking',
      description: 'Simple and fast booking process. Reserve your car in just a few clicks.',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Why Choose Jupiter Tours & Travels?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience hassle-free car rentals with premium service designed for your comfort and safety.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center group"
            >
              <div className={`w-20 h-20 ${feature.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
