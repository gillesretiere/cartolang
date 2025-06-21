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
import LanguageRegionMapAm5Registry from './LanguageRegionMapAm5Registry.jsx';
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
    const [vkPointSeries, setVkPointSeries] = useState([]);
    const [mapConfig, setMapConfig] = useState({});
    const [geoJsonCtryCode, setGeoJsonCtyCode] = useState('');
    const [regionalStatus, setRegionalStatus] = useState('');

    const closeButtonClickHandler = () => {
        callbackModal();
    }
    useEffect(
        () => {
            if (language.vk_region_name) {
                setVkRegion(JSON5.parse(language.vk_region_name.replace(/'/g, '"')));
            }
            if (language.vk_coordinates) {
                setVkPointSeries(JSON5.parse(language.vk_coordinates));
            }
            if (language.map_config) {
                setMapConfig(JSON5.parse(language.map_config));
            }
            if (language.geo_json) {
                setGeoJsonCtyCode(language.geo_json);
            }
            if (language.regional_status) {
                setRegionalStatus(language.regional_status);
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
                                    display: 'flex flex-col',
                                    flexWrap: 'nowrap',
                                    p: 1,
                                    alignItems: 'center',
                                }}>
                                    <Typography className='text-zinc-700 text-2xl font-bold'>
                                        {language && language.language_name_fr}
                                    </Typography>
                                    <Typography className='text-zinc-500 text-xl'>
                                        {language && language.language_name_native}
                                    </Typography>
                                </Box>

                            </Box>
                            {/* carte */}
                            <Box className={`mx-0 px-0`} sx={{ gridArea: 'map', }}>
                                {/* si la langue n'est pas répertoriée: on affiche une carte neutre (xxx) 
                                <LanguageRegionMapAm5 countryCode="iranLow" vkRegionName={vkRegion} vkPointSeries={vkPointSeries}></LanguageRegionMapAm5>
                                <LanguageRegionMapAm5Registry
                                        countryCode="afghanistanLow"
                                        vkRegionName={['Balkh', 'Jowzjān', 'Fāryāb']}
                                        vkPointSeries={[66.90, 36.89]}
                                        vkMapConfig={{ homeGeoPoint: { longitude: 65, latitude: 33 }, homeZoomLevel: 5 }}
                                    />
                                */}
                                {language.vk_region_name ?
                                    (<LanguageRegionMapAm5Registry
                                        countryCode={geoJsonCtryCode}
                                        vkRegionName={vkRegion}
                                        vkPointSeries={vkPointSeries}
                                        vkMapConfig={mapConfig}
                                    />) :
                                    (<></>)
                                }
                            </Box>
                            <Box className={`mx-1 px-1`} sx={{ gridArea: 'Bloc2', }}>
                                <Typography className={`font-articulat_cf leading-none tracking-wide font-base text-sm`}>
                                    {regionalStatus ? (
                                        <ReadMore
                                            text={regionalStatus}
                                            style={{ fontSize: 'large', marginLeft: '-4px', paddingLeft: '8px', borderTop: '1px solid white', borderLeft: '6px solid rgba(244, 67, 54, 0.4)' }}
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
