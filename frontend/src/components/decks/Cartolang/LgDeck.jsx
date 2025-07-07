import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@material-ui/core/Grid';
import ReadMore from '../../UI/Media/ReadMore';
import { LgCyCard } from './LgCyCard';


import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    margin: 'auto',
  }
});

const LgDeck = ({ langdeck }) => {
  console.log(langdeck);
  return (
    <>
      {langdeck ? (
        <div className='grid container mt-2'>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 0,
              gridTemplateRows: 'auto',
              gridTemplateAreas: {
                xs:
                  `
            "lg_name_fr lg_name_fr . . ."
            "lg_summary lg_summary lg_summary lg_summary ."
            "lg_rndchrt lg_rndchrt lg_rndchrt lg_rndchrt lg_rndchrt"
            `,
                md:
                  `
            "lg_name_fr lg_name_fr lg_summary lg_summary ."
            "lg_name_fr lg_name_fr lg_summary lg_summary ."
            "lg_rndchrt lg_rndchrt lg_rndchrt lg_rndchrt lg_rndchrt"
            `,
              },
            }}
          >

            <Box className={`mx-1 px-4`} sx={{ gridArea: 'lg_name_fr', }}>
              <Box sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                p: 1,
                alignItems: 'center',
              }}>
                <Typography className={`font-articulat_cf leading-none tracking-tight font-bold text-2xl lg:text-5xl`}>
                  {langdeck.language_name_fr}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                p: 1,
                alignItems: 'center',
              }}>
                <Typography className={`font-articulat_cf leading-none tracking-tight font-semibold text-xl lg:text-4xl`}>
                  {langdeck.language_name_native}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                p: 1,
                alignItems: 'center',
              }}>
                <Typography className="font-base text-zinc-500 dark:text-white text-lg lg:text-2xl">
                  {langdeck.language_uid}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                p: 1,
                alignItems: 'center',
              }}>
                <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm md:text-md text-milano-500 `}>
                  Nombre total de locuteurs dans le monde
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                p: 1,
                alignItems: 'center',
              }}>
                <Typography className="font-base text-zinc-500 dark:text-white text-lg lg:text-2xl">
                  {langdeck.language_uid}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                p: 1,
                alignItems: 'center',
              }}>
                <Typography className={`font-articulat_cf leading-none tracking-tight font-base text-sm md:text-md text-milano-500 `}>
                  Nombre total de pays
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                p: 1,
                alignItems: 'center',
              }}>
                <Typography className="font-base text-zinc-500 dark:text-white text-lg lg:text-2xl">
                  {langdeck.language_uid}
                </Typography>
              </Box>
            </Box>
            <Box className={`mx-1 px-4`} sx={{ gridArea: 'lg_summary', }}>
              <Box sx={{
                display: 'flex flex-cols',
                flexWrap: 'nowrap',
                p: 1,
                alignItems: 'center',
              }}>
                {langdeck.language_summary &&
                  <ReadMore
                    text={langdeck.language_summary}
                    style={{ fontSize: 'large', marginLeft: '-4px', paddingLeft: '8px', borderTop: '1px solid white', borderLeft: '6px solid rgba(244, 67, 54, 0.4)' }}
                    limit='200' />
                }
              </Box>
            </Box>

            <Box className={`mx-1 px-1 my-4 mt-20 pt-6`} sx={{ gridArea: 'lg_rndchrt', border: 1, borderLeft: 0, borderBottom: 0, borderRight: 0, borderColor: 'grey.400', }}>
              <Grid container spacing={4}>
                {langdeck.language_countries && langdeck.language_countries.sort((a, b) => (a.popularity_as_float > b.popularity_as_float ? -1 : 1))
                  .map(
                    (el, index) => {
                      return (
                        <Grid key={index} item xs={12} lg={6}>
                          <LgCyCard card={el} langdeck={langdeck} />
                        </Grid>
                      )
                    }
                  )}
              </Grid>

            </Box>
          </Box>
        </div>

      ) : (
        <></>
      )}


    </>
  )
}

export default LgDeck