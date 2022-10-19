import { BottomNavigationAction, Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { StyledBottomNavigation } from '../../styles';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';


const NavigationBar = () => {

    const [navigationOption, setNavigationOption] = React.useState(0);
    
    const navigate = useNavigate();

    useEffect (() => {
        switch (navigationOption){
            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/movies');
                break;
            case 2:
                navigate('/series');
                break;
            case 3:
                navigate('/search');
                break;
            default:
                navigate('/');
                break;
        }
    }, [navigationOption, navigate])

    return (
        
        <Box sx={{ bgcolor:'transparent', display: 'flex', justifyContent: 'center', p: 1, m: 1}}>
          <StyledBottomNavigation showLabels value={navigationOption} onChange={(event, newValue) => {
            setNavigationOption(newValue);
          }}> 
          <BottomNavigationAction label='Tendencias' icon={<WhatshotIcon/>}></BottomNavigationAction>
          <BottomNavigationAction label='Películas' icon={<MovieCreationIcon/>}></BottomNavigationAction>
          <BottomNavigationAction label='Series' icon={<TvIcon/>}></BottomNavigationAction>
          <BottomNavigationAction label='Buscar' icon={<SearchIcon/>}></BottomNavigationAction>

          </StyledBottomNavigation>
        </Box>
        
    )
 }

export default NavigationBar;