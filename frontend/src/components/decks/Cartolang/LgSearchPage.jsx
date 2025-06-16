import React, { useState, useEffect, useContext, } from 'react';
import { Box } from '@mui/material';

import LayoutCartolang from '../../UI/Layout';
import LgDeck from "./LgDeck";
import LgMap from './LgMap';
import DeckContext from '../../../store/DeckContext';

const LgSearchPage = ({ uid }) => {

  let ctx = useContext(DeckContext);
  console.log(ctx.current_deck);

  return (
    <>
      <LayoutCartolang>
        <LgMap langdeck={ctx.current_deck.language_deck[0]} />
        <LgDeck langdeck={ctx.current_deck.language_deck[0]} />
      </LayoutCartolang>
    </>

  )
}

export default LgSearchPage