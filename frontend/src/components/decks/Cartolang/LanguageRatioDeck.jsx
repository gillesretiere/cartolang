import React, { useEffect, useState, useContext, } from 'react';
import DeckContext from '../../../store/DeckContext';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgressChart } from './CircularProgressChart';

import LanguageRatioCard from './LanguageRatioCard';


const LanguageRatioDeck = ({ deck, langDeck, }) => (

    <>
        {deck && deck.sort((a, b) => (a.popularity_as_float > b.popularity_as_float ? -1 : 1))
            .map(
                (el) => {
                    return (
                        <>
                            <LanguageRatioCard
                                card={el} langDeck={langDeck}>
                            </LanguageRatioCard>
                        </>
                    )
                }
            )}

    </>
);

export default LanguageRatioDeck