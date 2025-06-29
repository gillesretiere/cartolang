import React, { useState, useEffect, useContext, } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import SmallButton from '../../UI/SmallButton.jsx';


const CyLangVocable = ({ language, langDeck, callbackModal, }) => {

    let { language_vocable, } = langDeck;

    const [vocable, setVocable] = useState([]);

    useEffect(
        () => {
            setVocable(language_vocable);
        }, [langDeck]
    );

    const closeButtonClickHandler = () => {
        callbackModal();
    }

    const handleChange = (event, value) => {
        return;
    }


    return (
        <>
            <Card sx={{
                width: {
                    xs: 350, // 100%
                    sm: 640,
                    md: 720,
                },
            }}>
                <CardActionArea sx={{ flexGrow: 1, }}>

                    <CardContent>
                        <Box>
                            <Typography onClick={closeButtonClickHandler} >
                                Vocable de base
                            </Typography>
                            {vocable &&
                                vocable.map((el) => {
                                    return (
                                        <Typography>
                                            {el.proposition_tr}
                                        </Typography>
                                    )
                                })
                            }
                            <div onClick={closeButtonClickHandler} >
                                <SmallButton label="Fermer" />
                            </div>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', }} className="items-center">
                            <Autocomplete
                                className='bg-white w-[200px] md:w-[400px] xl:w-[600px]'
                                id="combo-box-demo"
                                options={vocable.filter (filtre => filtre.niveau==="Proposition").map((el) => el.proposition)}
                                renderInput={(params) => <TextField {...params} label="Votre sélection" />}
                                onChange={handleChange}
                            />
                            <Link to="/">
                                <Button className="ml-4" variant="contained" size="large" sx={{ display: 'flex', }}>
                                    Rechercher
                                </Button>
                            </Link>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

export default CyLangVocable