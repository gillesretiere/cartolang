import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CircularProgressChartLanguages } from './CircularProgressChartLanguages';

import { withStyles } from '@material-ui/core/styles';


export const LgCyCard = ({ card, langdeck }) => {
    const { country_uid, country_iso2, country_name_native, country_name_fr, popularity_as_float, national_flag, } = card;
    const handleClick = (event) => {
        return;
    }
    return (
        <>
            <Card className='bg-stone-50 dark:bg-stone-800' sx={{ margin: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                        <CardContent>
                            <Typography gutterBottom component="div" className='font-bold tracking-tight text-zinc-800 dark:text-white text-2xl'>
                                {country_name_fr}
                            </Typography>
                            <Typography className="font-base text-zinc-500 dark:text-white text-lg">
                                {country_uid}
                            </Typography>
                            <img className='h-12 mt-2' src={national_flag} />
                        </CardContent>

                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <CardContent>
                            <CircularProgressChartLanguages value={popularity_as_float * 100} size="6rem" />
                        </CardContent>
                        <CardActions>
                            <Link to={`/cy_search_page/${country_iso2}`}>
                                <Button id={country_uid} className="mx-2 text-xs dark:text-[#FC6D50] dark:border-[#FC6D50]" variant="outlined" size="small">
                                    Voir carte {country_iso2}
                                </Button>
                            </Link>
                        </CardActions>
                    </Box>


                </Box>

            </Card>
        </>
    )
}
