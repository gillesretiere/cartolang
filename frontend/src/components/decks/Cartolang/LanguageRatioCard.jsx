import React, { useEffect, useState, useContext, } from 'react';
import DeckContext from '../../../store/DeckContext';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CartoCountryLanguageCard from './CartoCountryLanguageCard';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    card: {
        margin: 'auto',
    }
});

const LanguageRatioCard = withStyles(styles)(({ classes, justify, deck, langDeck, }) => (

    <div className={classes.root}>
        <Grid container spacing={4} justifyContent={justify}>
            {deck && deck.sort((a, b) => (a.popularity_as_float > b.popularity_as_float ? -1 : 1))
                .map(
                    (el) => {
                        return (
                            <div>
                                Langue : {el.language_name_fr}
                            </div>
                        )
                    }
                )}
        </Grid>

    </div>
));

export default LanguageRatioCard