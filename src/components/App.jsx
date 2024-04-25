import React from "react"
import {BrowserRouter,Link, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import {Box, ThemeProvider} from '@mui/material';
import theme from "./ui/Theme";

function App(){
    return(
        <ThemeProvider theme={theme}> 
            <Box bgcolor={"background.default"}>
                <BrowserRouter>
                    <Routes>
                    <Route exact path= "/" element={<Home/>} />
                    </Routes>

                </BrowserRouter>
            </Box>
        </ThemeProvider> 
    );
}


export default App;