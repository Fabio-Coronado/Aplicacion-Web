import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { carrouselProps, Credit } from '../../types';
import noPhoto from "../../images/noPhoto.jpg";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './styles.css';

const itemBox = {
    display: 'flex',
    flexDirection: 'column',
    objectFit: 'contain',
    padding: '10px',
}

const imageBox ={
  height: '120px',
  width: '80px',
  borderRadius: '10px',
  marginBottom: '5px',
  boxShadow: '0px 0px 5px black',
}
const handleDragStart = (e : React.DragEvent<HTMLDivElement>) => e.preventDefault();

const Carrousel = ( {id, mediaType} : carrouselProps) => {

    const [credits, setCredits] = React.useState<Array<Credit>>([]);

    const items = credits.map((c) => (
        
    <Box component='div' sx={itemBox}>
      <Box component = 'img'
        src={c.profile_path ? `https://image.tmdb.org/t/p/w300/${c.profile_path}` : noPhoto}
        alt={c?.name}
        onDragStart={handleDragStart}
        sx = {imageBox}
      />
      <Typography sx={{justifyContent: "center", fontSize:"small"}}>
        {c?.name}
      </Typography>
      
    </Box>
  ));

    const responsive = {
        0: {
        items: 2,
        },
        512: {
        items: 3,
        },
        1024: {
        items: 5,
        },
    };

    const fetchCredits = async () => {
        const { data } = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=9b364a432acbf694bb74ce2e807d9b5b&language=en-US`
        );
        setCredits(data.cast);
    };

    React.useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
    }, []);

    return (
        <AliceCarousel
        mouseTracking
        infinite
        disableDotsControls
        disableButtonsControls
        items={items}
        responsive={responsive}
        autoPlay
        />


    )

}

export {Carrousel};