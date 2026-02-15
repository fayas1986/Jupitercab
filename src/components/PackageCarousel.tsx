import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { MapPin, Users, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

export function PackageCarousel() {
  const { packages } = useAppContext();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 3000, stopOnMouseEnter: true })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleContact = (pkg: any) => {
    const phoneNumber = "919042273543";
    const message = `Hello, I am interested in the "${pkg.title}" package (${pkg.price}). Please provide more details.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Popular Tour Packages</h2>
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={scrollNext}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 min-w-0">
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full border border-gray-100">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback image if the specific ones fail to load
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white text-sm font-medium">{pkg.organizer}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">{pkg.title}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                        {pkg.pax}
                      </div>
                      {pkg.vehicleOptions && pkg.vehicleOptions.length > 0 ? (
                        <div className="space-y-1 mt-2">
                          {pkg.vehicleOptions.map((opt, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <span className="text-gray-600 font-medium flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {opt.vehicle}
                              </span>
                              <span className="text-blue-600 font-bold">{opt.price}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          {pkg.vehicle}
                        </div>
                      )}
                      {pkg.locations && pkg.locations.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {pkg.locations.map((loc, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {loc}
                            </span>
                          ))}
                        </div>
                      )}
                      {pkg.description && (
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{pkg.description}</p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      {!pkg.vehicleOptions || pkg.vehicleOptions.length === 0 ? (
                        <p className="text-blue-600 font-bold text-lg">{pkg.price}</p>
                      ) : null}
                      <button 
                        onClick={() => handleContact(pkg)}
                        className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Book via WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
