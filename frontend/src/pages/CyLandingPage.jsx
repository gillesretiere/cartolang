import React, { useState, useEffect, useContext, } from 'react';
import Layout from '../components/UI/Layout.jsx';
import GoTopOfPage from './GoTopOfPage.jsx';
import { CylgSearchPage } from '../components/decks/Cartolang/CylgSearchPage.jsx';
import { langdeck_regions, langdeck_countries, langdeck_languages, } from '../assets/data/index.js';
import { UserContext } from '../store/user_context.jsx';


const CyLandingPage = () => {

  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const ctx = useContext(UserContext);

  useEffect(() => {
    const loadRegions = () => JSON.parse(JSON.stringify(langdeck_regions));
    setRegions(loadRegions);
    const loadCountries = () => JSON.parse(JSON.stringify(langdeck_countries));
    setCountries(loadCountries);
    const loadLanguages = () => JSON.parse(JSON.stringify(langdeck_languages));
    setLanguages(loadLanguages);
  }, []);

  return (
    <>
      <Layout>
        <GoTopOfPage />
        {countries && languages &&
          <CylgSearchPage regions={regions} countries={countries} languages={languages} />
        }
      </Layout>
    </>
  )
}

export default CyLandingPage