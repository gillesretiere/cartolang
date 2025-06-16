import React, { useState, } from 'react';

import CyMapAm5 from './CyMapAm5.jsx';
import { Box } from '@mui/material';



const CyMap = ({ deck, callBackFunction, }) => {

    const setUpdatedCountry = (updatedCountry) => {
        {/*
            on récupère le code alpha2 et on le remonte
        */}
        callBackFunction(updatedCountry._dataItem._settings.id);
    }

    return (
        <>
            <Box>
                <CyMapAm5 sx={{ height: '400px' }} country={deck} setUpdatedCountry={setUpdatedCountry}></CyMapAm5>
            </Box>
        </>
    )
}

export default CyMap