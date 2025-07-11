import React, { useState } from 'react';
import DrillDownMap5 from './DrillDownMap5';

const HomePage2 = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
    console.log('Pays sélectionné :', countryCode);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Sélectionner un pays
      </h1>
      <DrillDownMap5 onCountrySelect={handleCountrySelect} />
      {selectedCountry && (
        <div className="mt-4 text-center">
          <p className="text-xl">
            Vous avez sélectionné : <strong>{selectedCountry}</strong>
          </p>
          {/* Intégration avec ExpressionSelector */}
          {/* <ExpressionSelector country={selectedCountry} /> */}
        </div>
      )}
    </div>
  );
};

export default HomePage2;