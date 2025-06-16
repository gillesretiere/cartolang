import React, { useEffect, useState, useContext, } from 'react';
import DeckContext from '../../../store/DeckContext.jsx';
import SmallButton from '../../UI/SmallButton.jsx';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link, } from "react-router-dom";
import { langdeck_languages } from '../../../assets/data/index.js';
import ReadMore from '../../UI/Media/ReadMore.jsx';

const CyDataLang = ({ deck }) => {
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
      <section id='language_cty_pct'>
        <div className='grid grid-cols-5 auto-rows-min gap-4 text-zinc-700 dark:text-white my-4'>
          <>
            <div className="col-start-1 col-end-6 px-4">
              <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm lg:text-lg text-milano-500 `}>
                Langues
              </Typography>
              <Typography className={`font-articulat_cf leading-none tracking-wide font-base text-sm lg:text-xl`}>
                {country_wfb_languages_fr &&
                  <ReadMore text={country_wfb_languages_fr}
                    style={{ marginLeft: '-4px', paddingLeft: '8px', borderTop: '1px solid white', borderLeft: '6px solid rgba(244, 67, 54, 0.4)' }}
                    limit='500' />
                }
              </Typography>
            </div>
          </>
        </div>
      </section>
    </>
  )
}

export default CyDataLang