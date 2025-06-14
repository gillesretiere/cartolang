import React, { useEffect, useState, useContext, } from 'react';
import DeckContext from '../../../store/DeckContext.jsx';
import SmallButton from '../../UI/SmallButton.jsx';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link, } from "react-router-dom";
import CyLangDeck from './CyLangDeck.jsx';
import { langdeck_languages } from '../../../assets/data/index.js';
import ReadMore from '../../UI/Media/ReadMore.jsx';


const CyLang = ({ deck }) => {

    let ctx = useContext(DeckContext);
    const {
        country_name_fr,
        country_name_native,
        country_national_flag,
        country_summary,
        country_languages,
        country_iso2,
        country_wfb_languages_fr,
        wfb_facts, } = deck;

    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        // on récupère le corpus langues
        const loadData = () => JSON.parse(JSON.stringify(langdeck_languages));
        setLanguages(loadData);
        ctx.current_deck.language_deck = languages;
    }, []);

    return (
        <>
            <section id="carto_lang">
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: 0,
                        gridTemplateRows: 'auto',
                        gridTemplateAreas: {
                            xs:
                                `
                "cy_capt1 . cy_languages cy_languages cy_languages"
                "cy_lang cy_lang cy_lang cy_lang cy_lang"
                "cy_goto2 . . . ."
                `,
                            md:
                                `
                "cy_capt1 . cy_languages cy_languages ."
                "cy_lang cy_lang cy_lang cy_lang cy_lang"
                "cy_goto2 . . . ."
                `,
                        },
                    }}
                >
                    <Box className={`mx-1 px-4`} sx={{ gridArea: 'cy_lang', }}>
                        <Box sx={{ display: 'flex', width: "100%", gap: 2 }}>
                            <CyLangDeck deck={country_languages} langDeck={languages} />
                        </Box>
                    </Box>
                    <Box className={`mx-0 p-4`} sx={{ gridArea: 'cy_goto2', }}>
                        <a href='#carto_main'>
                            <SmallButton label="Retour niveau supérieur" />
                        </a>
                    </Box>

                </Box>
            </section>
        </>
    )
}

export default CyLang