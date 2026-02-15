import { ArrowRight, Phone } from 'lucide-react';

export function Hero() {
  const scrollToCars = () => {
    document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url(https://d64gsuwffb70l.cloudfront.net/69019f02b9bee6cc9953e115_1761714044641_8698dec1.webp)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight drop-shadow-lg">
            Find Your <span className="text-blue-500">Perfect</span> Ride
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Premium car rentals at unbeatable prices. Experience the freedom of the road with our diverse fleet of luxury and economy vehicles.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button 
              onClick={scrollToCars}
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2"
            >
              Explore Fleet
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-lg"
            >
              View Packages
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-lg font-medium">Contact Us:</span>
            <a 
              href="tel:+919791289822" 
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <Phone className="w-5 h-5 text-blue-400" />
              <span className="text-xl font-bold tracking-wide">+91 97912 89822</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
    </section>
  );
}
