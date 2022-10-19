import { Box } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { StyledTypography } from '../../styles'
import {contentAction, contentState, genre, seriesMoviesProps, urlForContentProps} from '../../types';
import { BodyContent } from '../BodyContent';
import Genres from '../Genres';


const useGenre = (selectedGenres : Array<genre>) => {
    if (selectedGenres.length < 1) return "";
    const GenreIds = selectedGenres.map((g) => g.id.toString());
    return GenreIds.reduce((acc , curr) => acc + "," + curr);

};

const contentReducer = (state : contentState, action : contentAction) => {

   switch (action.type) {
    case 'CONTENT_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'CONTENT_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.list,
        page: action.payload.page,
        numPages: action.payload.numPages
      };

    case 'CONTENT_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
    }
}

const urlForContent = ( {pageType = 'trending', apiKey, searchText ='', 
typeContent, page, genresUrl} : urlForContentProps ) => {

  if (pageType === 'trending') {
    return `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`
  } else if (pageType === 'search'){
    return `https://api.themoviedb.org/3/search/${typeContent}?api_key=${apiKey}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
  } else {
    return `https://api.themoviedb.org/3/discover/${typeContent}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genresUrl}`;
  }

}


const SeriesMoviesContent = ({title, pageType = '', typeContent, searchText = ''} : seriesMoviesProps) => {
  
  const [selectedGenres, setSelectedGenres] = React.useState(Array<genre>);
  const [genres, setGenres]  = React.useState(Array<genre>);
  const [page, setPage] = React.useState(1);
  //const [numPages, setNumPages] = React.useState(0);
  const genresUrl = useGenre(selectedGenres);
  const [content, dispatchContent] = React.useReducer(contentReducer, {
      data: [],
      page: 1,
      numPages: 0,
      isLoading: false,
      isError: false
  })

    const handleFetchContent = React.useCallback(async () => {
    dispatchContent({ type: 'CONTENT_FETCH_INIT' });

    try {

        const argument = {
          pageType : pageType,
          apiKey :  '9b364a432acbf694bb74ce2e807d9b5b',
          searchText: searchText,
          typeContent : typeContent,
          page : page.toString(),
          genresUrl : genresUrl
          
        }

        const url = urlForContent(argument);
        const result = await axios.get(url);
        console.log(url);
        console.log(result);
        dispatchContent({
          type: 'CONTENT_FETCH_SUCCESS',
          payload: {
            list: result.data.results,
            page: result.data.page,
            numPages: result.data.total_pages
          },
        });
        

      } catch {
        dispatchContent({ type: 'CONTENT_FETCH_FAILURE' });
      }
    }, [genresUrl, page, typeContent, searchText, pageType]);

  React.useEffect(() => {
      window.scroll(0, 0);
      handleFetchContent();
  }, [handleFetchContent]);

  return(
    <>
      <Box sx={{pb: 3}}>
        <StyledTypography variant='h2' align='center'>
          {title}
        </StyledTypography>
      </Box>


        { (pageType === 'movie' || pageType === 'tv') && <Genres
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          optionType={typeContent}
          setPage={setPage}
          />}
        
      <BodyContent content={content} optionType={typeContent} page={page} setPage={setPage} />
    </>
  )
}

export default SeriesMoviesContent;