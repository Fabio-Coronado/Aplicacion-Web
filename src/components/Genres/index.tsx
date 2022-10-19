import { Box, Chip } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { genre, genresProps } from '../../types';


const Genres = ({
    selectedGenres, 
    setSelectedGenres,
    genres,
    setGenres,
    optionType,
    setPage
} : genresProps) => {

    const handleAdd = (genre : genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g : genre) => g.id !== genre.id));
        setPage(1);
    }

    const handleRemove = (genre : genre) => {
        setGenres([...genres, genre]);
        setSelectedGenres(selectedGenres.filter((g : genre) => g.id !== genre.id));
        setPage(1);
    }

    const getGenres = async () => {
        const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${optionType}/list?api_key=9b364a432acbf694bb74ce2e807d9b5b&language=en-US`
        );
        setGenres(data.genres);
    } 

    React.useEffect(() => {
        getGenres();

        return () => {
        setGenres([]); // unmounting
        };
        // eslint-disable-next-line
    }, []);

    return (
        <Box>
            {selectedGenres.map((genre) => (
                <Chip
                style={{ margin: 2 }}
                label={genre.name}
                key={genre.id}
                color="primary"
                clickable
                size="small"
                onDelete={() => handleRemove(genre)}
                />
            ))}
            {genres.map((genre) => (
                <Chip
                style={{ margin: 2 }}
                label={genre.name}
                key={genre.id}
                clickable
                size="small"
                onClick={() => handleAdd(genre)}
                />
            ))}
        </Box>
    )

}


export default Genres;