import React, { useState } from 'react';
import DrillDownMap from './DrillDownMap';
import Box from '@mui/material/Box';

import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
    // Ici, tu peux passer le code pays à ExpressionSelector ou autre composant
    console.log('Pays sélectionné :', countryCode);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Sélectionner un pays
      </h1>
      <DrillDownMap onCountrySelect={handleCountrySelect} />
      {selectedCountry && (
        <div className="mt-4 text-center">
          <p className="text-xl">
            Vous avez sélectionné : <strong>{selectedCountry}</strong>
          </p>
          {/* Intégration avec ExpressionSelector */}
          {/* <ExpressionSelector country={selectedCountry} /> */}
          <Box>
            <Link to={`/cy_search_page/PL`}>
              <Button className="ml-4" variant="contained" size="large" sx={{ display: 'flex', }}>
                Rechercher
              </Button>
            </Link>
          </Box>

        </div>
      )}
    </div>
  );
};

export default HomePage;