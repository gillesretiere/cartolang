import React, { useState, useEffect, useContext, } from 'react';
import DeckContext from '../../../store/DeckContext.jsx';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/material';
import { Link, } from "react-router-dom";
import SmallButton from '../../UI/SmallButton.jsx';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import LgSmallMapAm5 from './LgSmallMapAm5.jsx';
import ReadMore from '../../UI/Media/ReadMore.jsx';
import LanguageRegionMapAm5 from './LanguageRegionMapAm5.jsx';
import JSON5 from 'json5';

const useStyles = makeStyles(theme => ({
    rightIcon: {
        marginLeft: theme.spacing(1)
    }
}));

export const CyLangMap = ({ language, langDeck, callbackModal, }) => {
    let ctx = useContext(DeckContext);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [vkRegion, setVkRegion] = useState([]);
    const [dictPointSeries, setDictPointSeries] = useState (null);

    const closeButtonClickHandler = () => {
        callbackModal();
    }
    useEffect(
        () => {
            console.log(language);
            if (language.vk_region_name) {
                setVkRegion(JSON5.parse(language.vk_region_name.replace(/'/g, '"')));
            }
            if (language.vk_coordinates) {
                setDictPointSeries (JSON5.parse(language.vk_coordinates));
            }

        }, [language]
    );

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    return (
        <>
            {/* Carte largeur selon la taille du media */}
            <Card sx={{
                width: {
                    xs: 350, // 100%
                    sm: 640,
                    md: 720,
                },
            }}>
                <CardActionArea sx={{ flexGrow: 1, }}>
                    <CardContent>

                        {/* Box Grid 1 ou 2 colonnes selon la taille du media */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(5, 1fr)',
                                gap: 1,
                                gridTemplateRows: 'auto',
                                gridTemplateAreas: {
                                    xs:
                                        `
                                "map map map map map"
                                "Bloc1 Bloc1 Bloc1 Bloc1 Bloc1"
                                "Bloc2 Bloc2 Bloc2 Bloc2 Bloc2"
                                "flag flag flag flag flag"
                                "action action action action action"
                                `,
                                    sm:
                                        `
                                "map map map map map"
                                "Bloc1 Bloc2 Bloc2 Bloc2 Bloc2"
                                "flag flag flag flag flag"
                                "action action action action action"
                                `,
                                },
                            }}
                        >
                            <Box className={`mx-1 px-1`} sx={{ gridArea: 'Bloc1', }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexWrap: 'nowrap',
                                    p: 1,
                                    alignItems: 'center',
                                }}>
                                    <Typography className='text-zinc-500 text-xl'>
                                        {langDeck && langDeck.language_name_fr && langDeck.language_name_fr}
                                    </Typography>
                                </Box>

                            </Box>
                            {/* carte */}
                            <Box className={`mx-0 px-0`} sx={{ gridArea: 'map', }}>
                                {/* si la langue n'est pas répertoriée: on affiche une carte neutre (xxx) */}
                                {langDeck && language.vk_region_name ?
                                    (<LanguageRegionMapAm5 vkRegionName={vkRegion} dictPointSeries={dictPointSeries}></LanguageRegionMapAm5>) :
                                    (<></>)
                                }
                            </Box>
                            <Box className={`mx-1 px-1`} sx={{ gridArea: 'Bloc2', }}>
                                <Typography className={`font-articulat_cf leading-none tracking-wide font-base text-sm`}>
                                    {langDeck && langDeck.language_summary ? (
                                        <ReadMore
                                            text={langDeck.language_summary}
                                            style={{ fontSize: 'small', marginLeft: '-4px', paddingLeft: '8px', borderTop: '1px solid white', borderLeft: '6px solid rgba(244, 67, 54, 0.4)' }}
                                            limit='200' />
                                    ) : (
                                        <Typography>
                                            &nbsp;
                                        </Typography>
                                    )
                                    }
                                </Typography>
                            </Box>
                            {/* 
                            */
                            }
                            <Box className={`mx-1 px-1`} sx={{ gridArea: 'action', }}>
                                <CardActions sx={{ flexGrow: 1, }}>
                                    {
                                        langDeck && langDeck.language_uid &&
                                        <Link to={{ pathname: `/lg_search_page/${langDeck.language_uid}` }}>
                                            <SmallButton label={`Voir page : ${langDeck.language_name_fr}`} />
                                        </Link>
                                    }

                                    <div onClick={closeButtonClickHandler} >
                                        <SmallButton label="Fermer" />
                                    </div>
                                </CardActions>
                            </Box>
                        </Box>
                    </CardContent>
                </CardActionArea>

            </Card>

        </>
    )
}
