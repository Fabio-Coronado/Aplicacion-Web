import { Box, Card, CardActionArea, CardMedia, Typography } from "@mui/material"
import { singleContentProps } from "../../types"
import imageUnavailable from "../../images/imageUnavailable.jpg"
import React from "react";
import { BasicModal } from "../ContentModal";

const SingleContent = ( {optionType , c }: singleContentProps) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    return (
        <Card sx={{width:200}}>
                <BasicModal 
                id={c.id.toString()} 
                mediaType = {(optionType === 'trending') ? c.media_type : optionType} 
                open={open} 
                setOpen={setOpen}/>
            <CardActionArea onClick={handleOpen}>
            
                <Box sx={{p:1}}>
                    <CardMedia  component="img" 
                    image={c.poster_path === null ? imageUnavailable : `https://image.tmdb.org/t/p/w300${c.poster_path}`}/>
                </Box>
                <Box sx={{justifyContent: "center", display: "flex", padding:1}}>
                    <Typography variant="body2" align="center" >
                    { c.title || c.name } 
                    </Typography>
                </Box>
                <Box sx={{display: 'grid', gridAutoFlow: 'row', px: 1, alignContent: 'center' }}>
                    
                    <Typography sx={{ gridColumn: 'span 2' , gridRow: '1 / 3'}} variant="body1">
                        { (optionType === 'trending') ? c.media_type.toUpperCase() : optionType.toUpperCase()}
                    </Typography>
                    <Typography sx={{ gridColumn: 'span 2', gridRow: '1 / 3' }} variant="body1">
                    &nbsp;
                    </Typography>
                    <Typography sx={{ gridColumn: 'span 2', gridRow: '1 / 3' }} variant="body1">
                    { c.release_date || c.first_air_date } 
                    </Typography>

                </Box>
            </CardActionArea>
        </Card>
    )

}

export {SingleContent};