import React, { useEffect, useState, useContext, } from 'react';
import DeckContext from '../../../store/DeckContext';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CyLangCard from './CyLangCard';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    card: {
        margin: 'auto',
    }
});


const CyLangDeck = withStyles(styles)(({ classes, justify, deck, langDeck, }) => (

    <div className={classes.root}>
        <Grid container spacing={4} justifyContent={justify}>
            {deck && deck.sort ( (a,b) => (a.popularity_as_float > b.popularity_as_float ? -1 : 1))
            .map(
                (el) => {
                    return (
                        <Grid item xs={12} md={6} xl={3}>
                            <div className={classes.card}>
                                <CyLangCard
                                    className={classes.card} card={el} langDeck={langDeck} alignItems={justify}>
                                </CyLangCard>
                            </div>
                        </Grid>
                    )
                }
            )}
        </Grid>
        
    </div>
));

export default CyLangDeck;