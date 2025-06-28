import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import SmallButton from '../../UI/SmallButton.jsx';


const CyLangVocable = ({ callbackModal }) => {

    const closeButtonClickHandler = () => {
        callbackModal();
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