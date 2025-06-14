import React, { useState, useEffect, useContext, } from "react";
import DeckContext from "../../../store/DeckContext";
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import ReadMore from '../../UI/Media/ReadMore';
import SmallButton from '../../UI/SmallButton';

const CyData = ({ deck }) => {

    const {
        country_name_fr,
        country_name_native,
        country_wfb_name_native,
        country_wfb_name_native_fr,
        country_wfb_capital_name_fr,
        country_wfb_capital_etymology_fr,
        country_wfb_nationality_adjective_fr,
        country_wfb_ethnic_groups_fr,
        country_wfb_religions_fr,
        country_wfb_economic_overview_fr,
        country_wfb_location_fr,
        country_national_flag,
        country_summary,
        country_languages,
        country_iso2,
        wfb_facts, } = deck;

    const [hdefCountryFlag, setFdefCountryFlag] = useState('');

    let ctx = useContext(DeckContext);

    useEffect(
        () => {
            const s = country_national_flag.split('/').pop();
            setFdefCountryFlag(ctx.public_urls.vps_prod_https + "assets/img/flags/hdef/" + s);
        }, [country_national_flag]
    )


    return (
        <>
            <section id='cty_data' className='min-h-screen max-container'>
                <div className='grid grid-cols-5 auto-rows-min gap-4 text-zinc-700 dark:text-white my-4'>
                    <>
                        <div className="col-start-1 col-end-3 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-bold text-2xl lg:text-5xl`}>
                                {country_name_fr}
                            </Typography>
                        </div>
                        <div className="col-start-3 col-end-6 row-start-1 row-end-6 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-wide font-base text-sm lg:text-xl`}>
                                {country_summary &&
                                    <ReadMore
                                        text={country_summary}
                                        style={{ marginLeft: '-4px', paddingLeft: '8px', borderTop: '1px solid white', borderLeft: '6px solid rgba(244, 67, 54, 0.4)' }}
                                        limit='500' />
                                }
                            </Typography>
                        </div>
                    </>
                    <>
                        <div className="col-start-1 col-end-3 row-start-2 row-end-2 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-semibold text-xl lg:text-4xl`}>
                                {country_name_native}
                            </Typography>
                        </div>

                        <div className="col-start-1 col-end-3 px-4 mt-2">
                            <img src={hdefCountryFlag} className='w-32 object-cover shadow-lg' />
                        </div>
                    </>
                    <>
                        <div className="col-start-1 col-end-3 row-start-4 row-end-6 px-4">

                        </div>
                    </>
                </div>
                <hr />
                <div className='grid grid-cols-5 auto-rows-min gap-4 text-zinc-700 dark:text-white my-4'>
                    <>
                        <div className="col-start-1 col-end-3 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm lg:text-lg text-milano-500 `}>
                                Nom officiel
                            </Typography>
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-semibold text-xl lg:text-2xl`}>
                                {country_wfb_name_native_fr}
                            </Typography>
                        </div>
                        <div className="col-start-3 col-end-6 row-start-1 row-end-3 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm lg:text-lg text-milano-500 pl-3`}>
                                Ethnies
                            </Typography>
                            <Typography className={`font-articulat_cf leading-none tracking-wide font-base text-sm lg:text-xl`}>
                                {country_wfb_ethnic_groups_fr &&
                                    <ReadMore
                                        text={country_wfb_ethnic_groups_fr}
                                        style={{ marginLeft: '-4px', paddingLeft: '8px', borderTop: '1px solid white', borderLeft: '6px solid rgba(244, 67, 54, 0.4)' }}
                                        limit='500' />
                                }
                            </Typography>
                        </div>
                    </>
                    <>
                        <div className="col-start-1 col-end-3 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm lg:text-lg text-milano-500`}>
                                Capitale
                            </Typography>
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-semibold text-xl lg:text-2xl`}>
                                {country_wfb_capital_name_fr}
                            </Typography>
                        </div>
                        <div className="col-start-1 col-end-3 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm lg:text-lg text-milano-500`}>
                                Adjectif
                            </Typography>
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-semibold text-xl lg:text-2xl`}>
                                {country_wfb_nationality_adjective_fr}
                            </Typography>
                        </div>
                    </>
                    <>
                        <div className="col-start-1 col-end-3 row-start-4 row-end-6 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm lg:text-lg text-milano-500`}>
                            </Typography>
                        </div>
                        <div className="col-start-3 col-end-6 row-start-3 row-end-6 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm lg:text-lg text-milano-500 pl-3`}>
                                Religions
                            </Typography>
                            <Typography className={`font-articulat_cf leading-none tracking-wide font-base text-sm lg:text-xl`}>
                                {country_wfb_religions_fr &&
                                    <ReadMore
                                        text={country_wfb_religions_fr}
                                        style={{ marginLeft: '-4px', paddingLeft: '8px', borderTop: '1px solid white', borderLeft: '6px solid rgba(244, 67, 54, 0.4)' }}
                                        limit='500' />
                                }
                            </Typography>
                        </div>
                    </>
                </div>
                <hr />
                <div className='grid grid-cols-5 auto-rows-min gap-4 text-zinc-700 dark:text-white my-4'>
                    <>
                        <div className="col-start-1 col-end-3 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm lg:text-lg text-milano-500 `}>
                                Population
                            </Typography>
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-semibold text-xl lg:text-2xl`}>
                                {wfb_facts.Population}
                            </Typography>
                        </div>
                        <div className="col-start-3 col-end-6 row-start-1 row-end-3 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm lg:text-lg text-milano-500 pl-3`}>
                                Localisation
                            </Typography>
                            <Typography className={`font-articulat_cf leading-none tracking-wide font-base text-sm lg:text-xl`}>
                                {country_wfb_location_fr &&
                                    <ReadMore
                                        text={country_wfb_location_fr}
                                        style={{ marginLeft: '-4px', paddingLeft: '8px', borderTop: '1px solid white', borderLeft: '6px solid rgba(244, 67, 54, 0.4)' }}
                                        limit='500' />
                                }
                            </Typography>
                        </div>
                    </>
                    <>
                        <div className="col-start-1 col-end-3 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm lg:text-lg text-milano-500`}>
                                Superficie
                            </Typography>
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-semibold text-xl lg:text-2xl`}>
                                {wfb_facts.Area.total}
                            </Typography>
                        </div>
                        <div className="col-start-1 col-end-3 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm lg:text-lg text-milano-500`}>
                                
                            </Typography>
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-semibold text-xl lg:text-2xl`}>
                                
                            </Typography>
                        </div>
                    </>
                    <>
                        <div className="col-start-1 col-end-3 row-start-4 row-end-6 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm lg:text-lg text-milano-500`}>
                            </Typography>
                        </div>
                        <div className="col-start-3 col-end-6 row-start-3 row-end-6 px-4">
                            <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm lg:text-lg text-milano-500 pl-3`}>
                                Economie
                            </Typography>
                            <Typography className={`font-articulat_cf leading-none tracking-wide font-base text-sm lg:text-xl`}>
                                {country_wfb_economic_overview_fr &&
                                    <ReadMore
                                        text={country_wfb_economic_overview_fr}
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

export default CyData