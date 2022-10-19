
type Content = {
  id: number,
  tagline: string,
  overview : string,
  poster_path: string,
  backdrop_path : string,
  title? : string,
  name? : string,
  first_air_date? : string,
  release_date? : string,
  vote_average: number,
  media_type : string
}

type Credit = {
  name: string,
  profile_path :string
}

type Contents = Array<Content>;

type contentState = {
    data: Contents,
    page: number,
    numPages: number,
    isLoading: boolean,
    isError: boolean
}

type bodyContentProps = {
  content: contentState,
  optionType: string,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
}

type genresProps = {
  selectedGenres : Array<genre>,
  setSelectedGenres : React.Dispatch<React.SetStateAction<Array<genre>>>,
  genres : Array<genre>,
  setGenres : React.Dispatch<React.SetStateAction<Array<genre>>>,
  optionType : string,
  setPage: React.Dispatch<React.SetStateAction<number>>,

}

type urlForContentProps = {
  pageType: string, 
  apiKey: string,
  searchText: string,
  typeContent: string, 
  page: string, 
  genresUrl: string
}


type basicModalProps = {
  id : string,
  mediaType: string,
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,

}

type singleContentProps = {
  optionType: string,
  c : Content,
}
type carrouselProps = {
  id : string,
  mediaType : string
}

interface contentFetchInitAction {
  type: 'CONTENT_FETCH_INIT'
}

interface contentFetchSuccessAction {
  type: 'CONTENT_FETCH_SUCCESS';
  payload: {
      list: Contents,
      page: number,
      numPages : number
    };

}

interface contentFetchFailureAction {
type: 'CONTENT_FETCH_FAILURE';
}


type contentAction = 
| contentFetchInitAction 
| contentFetchSuccessAction
| contentFetchFailureAction;

type genre = {
  name: string,
  id: number
}

type styledAppbarprops = {
  bottom: number | string,
  top : number | string
}
type styledTypographyprops = {
  variant : string,
  align : string
}

type styledBoxprops = {
  display : string
}

type seriesMoviesProps = {
  title: string,
  pageType : string,
  typeContent: string,
  searchText: string

}

export type {Content, Credit, genre, genresProps,styledAppbarprops, styledBoxprops, basicModalProps,
  singleContentProps, carrouselProps,
  styledTypographyprops, seriesMoviesProps, urlForContentProps, contentState,  contentAction, bodyContentProps }