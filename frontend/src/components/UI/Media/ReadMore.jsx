import React, { useState, useEffect, } from "react";
import Popper from "@mui/material/Popper";
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



const ReadMore = ({ text, style, limit, children }) => {

    const [isReadMore, setIsReadMore] = useState(true);
    const [isWorth, setIsWorth] = useState(false);
    const [maxChars, setMaxChars] = useState(0);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    useEffect(
        () => {
            if (limit) {
                setMaxChars(limit);
            } else {
                setMaxChars(100);
            }

        }, [limit]
    )

    useEffect(
        () => {
            if (text.length > maxChars) {
                setIsWorth(true);
                setIsReadMore(true);

            } else {
                setIsWorth(false)
            }
        }, [text, maxChars, ]
    );

    return (
        <>
            {isWorth ? (
                isReadMore ? (
                    <>
                        <Typography style={style} sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "8",
                            WebkitBoxOrient: "vertical",
                        }}>
                            {text.slice(0, maxChars)}...

                        </Typography>
                        <span>
                            <Button onClick={toggleReadMore} className="mt-2 dark:text-[#FC6D50] dark:border-[#FC6D50]" variant="outlined" size="small" sx={{ display: 'flex', }}>
                                lire plus
                            </Button>
                        </span>
                    </>
                ) : (
                    <>
                        <Typography style={style} sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "48",
                            WebkitBoxOrient: "vertical",
                        }}>
                            {text}

                        </Typography>
                        <span>
                            <Button onClick={toggleReadMore} className="mt-2 dark:text-[#FC6D50] dark:border-[#FC6D50]" variant="outlined" size="small" sx={{ display: 'flex', }}>
                                lire moins
                            </Button>
                        </span>
                    </>
                )
            ) : (
                <>
                    <Typography style={style} sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "48",
                        WebkitBoxOrient: "vertical",
                    }}>
                        {text}

                    </Typography></>
            )
            }


        </>

    );
};

export default ReadMore;