import Container from '@mui/material/Container';
import {StyledAppBar, StyledBox, StyledToolbar} from './styles'
import { Routes, Route } from "react-router-dom";
import Trending from './pages/Trending';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Search from './pages/Search';
import NavigationBar from './components/NavigationBar';
import { Typography } from '@mui/material';



const App = () => {


  return (
    <StyledBox component='nav' display='flex' sx={{bgcolor: '#e5e3e9'}}>
      <StyledAppBar bottom={'auto'} top = {0}  sx = {{borderBottom: 2, borderColor: "#0004859d" }} > 
          <Typography variant='h2' align='center'  fontFamily={'Raleway'}>
            Media Application
          </Typography>

      </StyledAppBar>
    <Container maxWidth={false} >
      <StyledBox component='body' display='inline' >
        <StyledToolbar />
        <Routes>
          <Route path='/' element={<Trending />}/>
          <Route path='/movies' element={<Movies />}/>
          <Route path='/series' element={<Series />}/>
          <Route path='/search' element={<Search />}/>
        </Routes>
        {/*<SearchContent /> */}
        
        <StyledToolbar />
      </StyledBox>
    </Container>

      <StyledAppBar bottom={0} top = {'auto'} sx = {{borderTop: 2, borderColor: "#0004859d" }}>
        <NavigationBar />
      </StyledAppBar>
    
  
      
    </StyledBox>
  );
}

export default App;
