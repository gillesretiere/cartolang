import React, { useState, useEffect, useContext, } from 'react';
import Layout from '../components/UI/Layout.jsx';
import GoTopOfPage from './GoTopOfPage.jsx';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { banner_hero_languages, logo_hammer, } from '../assets/img';
import { FiMail, FiPhone, } from 'react-icons/fi'


const AboutPage = () => {
  return (
    <>
      <Layout>
        <GoTopOfPage />

        <div className="min-h-screen min-w-screen">
          <section id="about" sx={{ display: 'flex', justifyContent: 'center', }}>
            <div className="p-4 my-4 items-center">
              <Typography
                sx={{ display: 'flex', justifyContent: 'left', }}
                className={`font-articulat_cf font-thin leading-none tracking-tight text-xl md:text-3xl lg:text-5xl text-slate-800 dark:text-white mb-2`}>
                Cartes &amp; Langues
              </Typography>
              <img src={banner_hero_languages} className="w-[1/2] items-center"></img>
            </div>
            <div className="p-4 my-4 grid grid-cols-5 ">
              <div className="col-start-1 col-end-4">
                <Typography className='font-articulat_cf font-bold text-lg lg:text-xl dark:text-white'>
                  &Agrave; propos
                </Typography>
              </div>
              <div className="col-start-4 col-end-6">
                &nbsp;
              </div>
              <div className="col-start-1 col-end-4">
                <Typography className='font-articulat_cf font-base leading-2 tracking-none text-sm lg:text-lg dark:text-white'>
                  <p>Cartes & Langues est une application interactive et pédagogique, qui permet de faire la correspondance entre un pays et les langues qui y sont parlées.</p>
                  <p>La recherche peut se faire dans les deux sens, à partir d'un pays ou d'une langue. Une fois la région le pays ou la langue sélectionnée, un ensemble d'informations utiles sont fournies sur le pays en question et la situation linguistique.
                  </p>
                  <p>Cartes & Langues peut être utilisée aussi bien pour un usage personnel que dans un cadre professionnel. Par exemple, elle permet d'identifier l'origine d'une personne allophone et, à partir de cette information, connaître les langues qu'elle est susceptible de parler.</p>
                </Typography>
              </div>
              <div className="col-start-4 col-end-6">
                &nbsp;
              </div>
              <div className='col-start-1 col-end-6 relative rounded-2xl bg-background-secondary shadow-lg text-left mx-4 px-4 py-10 w-96'>
                <h1 className='my-3 text-2xl font-semibold'>
                  Contact et informations
                </h1>
                <div className="flex my-4 justify-left items-center gap-2">
                  <img src={logo_hammer} className="w-8" />
                  <Typography className='font-articulat_cf font-bold text-md tracking-tight dark:text-white'>Hammer &amp; Marteau</Typography>

                </div>
                <div className='flex items-center gap-2'><FiMail /><a className='text-sky-500 hover:text-sky-700 text-xs' href="mailto:contact@hammer-marteau.com">contact@hammer-marteau.com</a></div>
                <div className='flex items-center gap-2'><FiPhone /><span className='relative'>06 30 30 13 64</span></div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export default AboutPage