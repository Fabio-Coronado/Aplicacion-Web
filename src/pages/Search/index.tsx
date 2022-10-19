import { Box, IconButton, Tab, Tabs, TextField } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import SeriesMoviesContent from "../../components/SeriesMoviesContent";

const useSemiPersistentState = (key : string, initialState : string) : [string, (newValue : string) => void] => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};


const Search = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState('searchfield', '');
  const [optionSearch, setOptionSearch ]  = React.useState('movie');
  const [renderContent, setRenderContent] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setOptionSearch(newValue);
  }

  const handleSearchInput = (event : React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    //localStorage.setItem('search', event.target.value);
  };

  const handleSearchSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    setRenderContent(true);
    setSearchTerm(searchTerm);
    event.preventDefault();
  };

  return(
    <>
    
      <Box component="form" onSubmit={handleSearchSubmit} sx={{justifyContent: 'center' ,display: 'flex'}}>
        
        <TextField  fullWidth label="Buscar" id="searchfield" value={searchTerm} onChange={handleSearchInput}  focused/>
        <IconButton  type="submit" aria-label="search" disabled={!searchTerm}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box sx={{paddingY: 2}}>
        <Tabs value={optionSearch} onChange={handleChange} centered>
            <Tab value="movie" label="Películas" />
            <Tab value="tv" label="Series" />
        </Tabs>
      </Box>

        
       {renderContent && <SeriesMoviesContent title=""  pageType='search' typeContent={optionSearch} searchText={searchTerm}/>} 
    </>
  )
}

export default Search;