import React, { useEffect, useState, useContext, } from 'react';
import DeckContext from '../../../store/DeckContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Popper from "@mui/material/Popper";
import { CyLangMap } from './CyLangMap';
import { CircularProgressChart } from './CircularProgressChart';
import VerifiedIcon from '@mui/icons-material/Verified';

import Chart from './Chart';
import { formHelperTextClasses } from '@mui/material';

const CyLangCard = ({ card, langDeck, }) => {
    let { language_name_fr, language_name_native, language_uid, popularity_as_float, speakers, is_official, } = card;
    let ctx = useContext(DeckContext);
    const [currentLanguage, setCurrentLanguage] = useState([]);

    useEffect(() => {
        let query = langDeck.filter(
            e => e.language_uid === language_uid);
        setCurrentLanguage(query);
    }, [langDeck]);

    const [language, setLanguage] = useState(null);
    const [arrowRef, setArrowRef] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const callbackModal = () => {
        setLanguage(null);
        setAnchorEl(null);
    }

    const handleClick = (event) => {
        setLanguage(event.target.id);
        const query = langDeck.filter(
            e => e.language_uid === event.target.id);
        ctx.current_deck.language_deck = query;
        setCurrentLanguage(query);
        setArrowRef(event.currentTarget);
        setAnchorEl(anchorEl ? null : event.currentTarget);
        return;
    }
    const openPopup = Boolean(anchorEl);
    const id = openPopup ? "simple-popper" : undefined;


    return (
        <>
            <div>

                <Popper id={id}
                    open={openPopup}
                    anchorEl={anchorEl}
                    placement="top"
                    disablePortal={false}
                    modifiers={[
                        {
                            name: 'arrow',
                            enabled: true,
                            options: {
                                element: arrowRef,
                            }
                        }
                    ]}
                >
                    {currentLanguage &&
                        <>
                            <CyLangMap
                                language={card}
                                langDeck={currentLanguage[0]}
                                callbackModal={callbackModal}>

                            </CyLangMap>
                        </>
                    }

                </Popper>
            </div>

            <Card className='bg-stone-50 dark:bg-stone-800' sx={{ margin: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', }}>
                {
                    /*
                <CardMedia
                sx={{ minHeight: 340 }}
                image={phrase_illustration}
                title={story_name}
            />
            */
                }
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', }}>
                    <CardContent>
                        <Typography gutterBottom component="div" className='font-bold tracking-tight text-zinc-800 dark:text-white text-2xl'>
                            {language_name_fr}
                        </Typography>
                        <Typography gutterBottom component="div" className='font-semibold tracking-tight text-zinc-600 dark:text-white text-xl'>
                            {language_name_native}
                        </Typography>
                        <Typography className="font-semibold border border-1 text-zinc-500 dark:text-white text-md px-2 w-fit">
                            {language_uid}
                        </Typography>
                        <div className='my-4'></div>
                        <hr />
                        <div className='my-4'></div>
                        <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm md:text-md text-milano-500 `}>
                            Nombre de locuteurs
                        </Typography>
                        <Typography gutterBottom component="div" className='font-semibold tracking-tight text-zinc-700 dark:text-white text-xl'>
                            {parseInt(speakers).toLocaleString()}
                        </Typography>
                        <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm md:text-md text-milano-500 `}>
                            Langue officielle
                        </Typography>
                        <div>
                            {is_official === 'TRUE' ? (<>
                                <Typography className={`font-semibold bg-milano-500  border border-1 text-white text-xs w-fit px-2 my-2`}>
                                    Oui
                                </Typography>
                            </>
                            ) : (<>
                                <Typography className={`font-semibold text-zinc-700 border border-1 dark:text-white text-xs w-fit px-2 my-2`}>
                                    Non
                                </Typography>
                            </>)}
                        </div>
                    </CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                        <CardContent>
                            <CircularProgressChart value={popularity_as_float * 100} size="7rem" />
                        </CardContent>
                        <CardActions>
                            <Button id={language_uid} onClick={handleClick} className="mt-2 text-xs dark:text-[#FC6D50] dark:border-[#FC6D50]" variant="outlined" size="small" sx={{ display: 'flex', }}>Voir carte</Button>
                        </CardActions>
                    </Box>

                </Box>

            </Card>
        </>
    )
}

export default CyLangCard