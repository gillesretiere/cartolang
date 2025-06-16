import React from 'react'
import { useParams } from "react-router-dom";
import SmallButton from '../../UI/SmallButton.jsx';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import CountryMapCard from './CyMapAm5.jsx';
import { Link, } from "react-router-dom";
import CyLang from './CyLang.jsx';
import CyData from './CyData.jsx';
import CyDataLang from './CyDataLang.jsx';

export const CyDeck = ({ deck, callBackFunction, }) => {
    let { id } = useParams();
    const {
        country_name_fr,
        country_name_native,
        country_national_flag,
        country_summary,
        country_languages,
        country_iso2,
        wfb_facts, } = deck;

    const handleClick = (event) => {
        callBackFunction(event.currentTarget.id);
    };

    const setUpdatedCountry = (updatedCountry) => {
        {/*
            on récupère le code alpha2 et on le remonte
        */}
        id = updatedCountry._dataItem._settings.id;
        callBackFunction(id);
    }

    return (
        <>
            <CyData deck={deck}></CyData>
            <CyDataLang deck={deck}></CyDataLang>
            <CyLang deck={deck}></CyLang>
        </>
    )
}
