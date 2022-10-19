import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { basicModalProps, Content } from "../../types";
import axios from "axios";
import { Carrousel } from "../Carrousel";

const style = {
  width: "90%",
  height: "80%",
  backgroundColor: "#39445a",
  border: "1px solid #282c34",
  borderRadius: 10,
  color: "white",
  padding: 2
};

const contentmodal = {
  display: "flex",
  flexDirection: "column",
  //"justify-content": "space-between",
  height: "100%",
  width: "100%",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none"
  },
  scrollbarWidth: "none"
};

const modal = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const imageContent = {
  display: "flex",
  justifyContent: "center"
};

const textField = {
  borderRadius: 10,
  bgcolor: "blue",
  height: 170,
  overflow: "scroll",
  "&::-webkit-scrollbar": {
    display: "none"
  },
  scrollbarWidth: "none"
};

const buttonStyle = {
  //paddingX: 6,
  bgcolor: "#db2e5c",
  width: "100%",
  fontSize: "large",
  height: 30,
  color: "white",
  "&:hover": {
    bgcolor: "#d12472"
  }
};

const BasicModal = ({id, mediaType ,open, setOpen} : basicModalProps) => {

  const [content, setContent] = React.useState<Content>({
    id: 0,
    poster_path: '',
    tagline : '',
    overview : '',
    backdrop_path : '',
    title : '',
    name : '',
    first_air_date : '',
    release_date : '',
    vote_average: 0,
    media_type : ''
  });
  const [video, setVideo] = React.useState('');

  const handleClose = () => setOpen(false);
 
  
    const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=9b364a432acbf694bb74ce2e807d9b5b&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=9b364a432acbf694bb74ce2e807d9b5b&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  React.useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (

      <Modal
        open={open}
        onClose={handleClose}
        sx={modal}
      >
        
        <Box sx={style}>
           
          <Box sx={contentmodal}>
             
            <Grid spacing={3} container>
              <Grid xs={12} lg={5} item>
                <Box sx={imageContent}>
                  <Box
                    sx={{
                      width: {
                        xs: "100%",
                        lg: "80%"
                      },
                      //heigth: "80%",
                      //paddingX: 1,
                      paddingTop: 1,
                      content: {
                        xs: `url(${`https://image.tmdb.org/t/p/w500/${content.backdrop_path}`})`,
                        lg: `url(${`https://image.tmdb.org/t/p/w500/${content.poster_path}`})`
                      }
                    }}
                    component="img"
                  />
                </Box>
              </Grid>
              <Grid xs={12} lg={7} item>
                <Grid direction="column" spacing={2} container>
                  <Grid item>
                    <Typography
                      id="modal-modal-title"
                      variant="h4"
                      component="div"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                    {content.name || content.title} (
                      {(
                        content.first_air_date ||
                        content.release_date ||
                        "-----"
                      ).substring(0, 4)}
                    )
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="div"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        fontStyle: "italic"
                      }}
                    >
                      {content.tagline}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Box sx={textField}>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          padding: 2
                        }}
                      >
                       {content.overview}
                      </Typography>
                     
                    </Box>

                    <Box sx={{display: 'inline'}}>
                      
                    </Box>   

                  </Grid>
                  <Grid item>
                             
                      <Carrousel id= {content.id.toString()} mediaType ={mediaType} />
                   
                  </Grid>
                  <Grid item>
                    <Button sx={buttonStyle} href={`https://www.youtube.com/watch?v=${video}`} target="__blank">
                      <Box sx={{ paddingRight: 2, pt: 1 }}>
                        <YouTubeIcon sx={{ fontSize: 30 }} />
                      </Box>
                      Ver trailer
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>

  );
}


export {BasicModal};