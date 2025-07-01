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
import ExpressionSelector from './ExpressionSelector.jsx';


const CyLangVocable = ({ language, langDeck, callbackModal, }) => {

    let { language_vocable, } = langDeck;

    const [vocable, setVocable] = useState([]);
    const [selected, setSelected] = useState(null);

    const playAudio = (audioUrl) => {
        const audio = new Audio(audioUrl);
        audio.play();
    };

    useEffect(
        () => {
            setVocable(language_vocable);
        }, [langDeck]
    );

    const closeButtonClickHandler = () => {
        callbackModal();
    }

    const handleSelectExpression = (expression) => {
        // Jouer l'audio associé
        const audio = new Audio(expression.audio);
        audio.play();
        // Autres actions (par exemple, afficher la traduction)
        console.log(`Expression sélectionnée : ${expression.text} (${expression.language})`);
    };

    const handleChange = (e, v) => setSelected(v);
    console.log(selected);
    console.log(vocable);

    return (
        <>
            <Card className='w-full'>
                <CardActionArea sx={{ flexGrow: 1, }}>

                    <CardContent>
                        <Typography onClick={closeButtonClickHandler} >
                            Vocable de base
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', }} className="items-center my-4">
                            <Autocomplete
                                className='bg-white w-[200px] md:w-[400px] xl:w-[600px]'
                                id="combo-box-demo"
                                size='small'
                                options={vocable.filter(filtre => filtre.niveau === "Proposition").map((el) => el.proposition)}
                                renderInput={(params) =>
                                    <TextField {...params} size='small' label="Votre sélection" />}
                                value={selected}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box sx={{ gridArea: 'Bloc1' }}>
                            <ExpressionSelector onSelectExpression={handleSelectExpression} />
                        </Box>
                        <hr />
                        <Box>

                            {selected && vocable &&
                                vocable.filter(filtre => filtre.proposition === selected).map((el) => {
                                    return (
                                        <>
                                            <Card className='px-4 py-4 bg-zinc-100 '>
                                                <Typography className={`font-articulat_cf leading-none tracking-tight font-thin text-sm md:text-md text-milano-500 `}>
                                                    {el.pkid}
                                                </Typography>
                                                <Typography className={`font-articulat_cf leading-none tracking-tight font-bold text-xl md:text-2xl text-zinc-800 `}>
                                                    {el.proposition}
                                                </Typography>
                                                <Typography className={`font-articulat_cf leading-none tracking-tight font-bold text-xl md:text-2xl text-milano-500 `}>
                                                    {el.proposition_tr}
                                                </Typography>
                                                <button className='border border-1 border-milano-500 p-1 my-2 font-articulat_cf leading-none tracking-tight font-semibold text-sm text-milano-500'
                                                    onClick={() => playAudio(`/audio/${el.language_uid}/${el.pkid}.mp3`)}>
                                                    Jouer
                                                </button>
                                                {el.vk_options.map((opel) => (
                                                    <>
                                                        <Card className='px-4 py-2 bg-zinc-100 '>
                                                            <Typography className={`font-articulat_cf leading-none tracking-tight font-thin text-sm md:text-md text-milano-500 `}>
                                                                {opel}
                                                            </Typography>
                                                            {vocable.filter(filtre => filtre.pkid === opel).map((opid) =>
                                                            (
                                                                <>
                                                                    <Typography className={`font-articulat_cf leading-none tracking-tight font-bold text-lg md:text-xl text-zinc-800 `}>
                                                                        {opid['proposition']}
                                                                    </Typography>
                                                                    <Typography className={`font-articulat_cf leading-none tracking-tight font-bold text-lg md:text-xl text-milano-500 `}>
                                                                        {opid['proposition_tr']}
                                                                    </Typography>
                                                                    <button className='border border-1 border-milano-500 p-1 my-2 font-articulat_cf leading-none tracking-tight font-semibold text-sm text-milano-500'
                                                                        onClick={() => playAudio(`/audio/${el.language_uid}/${opid['pkid']}.mp3`)}>
                                                                        Jouer
                                                                    </button>
                                                                </>
                                                            )
                                                            )}
                                                        </Card>
                                                    </>
                                                ))

                                                }


                                            </Card>

                                        </>

                                    )
                                })
                            }

                        </Box>
                        <hr />
                        <Box className='my-4'>
                            <div onClick={closeButtonClickHandler} >
                                <SmallButton label="Fermer" />
                            </div>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    )
}

export default CyLangVocable