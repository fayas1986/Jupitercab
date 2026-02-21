
import React from 'react';
import { Helmet } from 'react-helmet-async';
import AppLayout from '@/components/AppLayout';
import { AppProvider } from '@/contexts/AppContext';

const Index: React.FC = () => {
  return (
    <AppProvider>
      <Helmet>
        <title>Rental Booking - Home</title>
        <meta name="description" content="Find and book your perfect rental car with ease." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Rental Booking",
              "image": "URL_TO_YOUR_LOGO",
              "url": "YOUR_WEBSITE_URL",
              "telephone": "+1-555-123-4567",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Rental Car Lane",
                "addressLocality": "City",
                "addressRegion": "State",
                "postalCode": "12345",
                "addressCountry": "US"
              },
              "priceRange": "$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                  ],
                  "opens": "09:00",
                  "closes": "17:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "10:00",
                  "closes": "14:00"
                }
              ]
            }
          `}
        </script>
      </Helmet>
      <AppLayout />
    </AppProvider>
  );
};

export default Index;
