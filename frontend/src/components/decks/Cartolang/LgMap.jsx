import React from 'react'
import { Box } from '@mui/material';
import LgMapAm5 from './LgMapAm5';

const LgMap = ( {langdeck} ) => {
  return (
    <Box>
         <LgMapAm5 language={langdeck}></LgMapAm5>
    </Box>
  )
}

export default LgMap;