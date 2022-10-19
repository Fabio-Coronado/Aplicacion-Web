import React from "react";
import Grid from "@mui/material/Grid";

import { Box, Pagination } from "@mui/material";
import { bodyContentProps } from "../../types";
import { SingleContent } from "../SingleContent";


const BodyContent = ({content, optionType, page, setPage} : bodyContentProps) => {
    
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(value);
        setPage(value);
    }
    
    return (
        <>
        <Grid container spacing={{ xs: 1, md: 2 }} 
            columns={{ xs: 1, sm: 6, md: 12 }} 
            >

            { content.data.map((c) => (
                <Grid item xs={1} sm={3} md={3} key={c.id}>
                <SingleContent optionType={optionType} c={c} />
                </Grid>
            ))}

            </Grid>
            <Box sx={{justifyContent: "center", display: "flex", py: 2}}>
            <Pagination count={content.numPages > 500 ? 500 : content.numPages} page={page} onChange={handleChangePage}/>
            </Box>
        </>
    )}

export {BodyContent};