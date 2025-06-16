import React, { useState, createContext } from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider, } from '@mui/material/styles';
import { useParams } from 'react-router';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

import CyLandingPage from './pages/CyLandingPage';
import CountryLanguagesPage from './components/decks/Cartolang/CountryLanguagesPage';
import CtSearchPage from './components/decks/Cartolang/CtSearchPage';
import LgSearchPage from './components/decks/Cartolang/LgSearchPage';
import CySearchPage from './components/decks/Cartolang/CySearchPage';
import App from './App';

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

function ComponentGetID() {
  const { id } = useParams();
  return <div>{id}</div>
}

root.render(

  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme} defaultMode="dark">
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<CyLandingPage />} />
            <Route path="cartolang" element={<CyLandingPage />} />
            <Route path="ct_search_page/:id" element={<CtSearchPage />} />
            <Route path="cy_search_page/:id" element={<CySearchPage />} />
            <Route path="lg_search_page/:id" element={<LgSearchPage uid={<ComponentGetID />} />} />
            <Route component={CyLandingPage} />
            <Route path="*" element={
              <main style={{ padding: "1rem" }}>
                <p>Mauvaise piste!</p>
                <App/>
              </main>
            } />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  </StyledEngineProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
