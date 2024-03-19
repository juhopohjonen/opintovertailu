import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { Outlet } from "react-router-dom"

import '@fontsource/roboto/400.css';
import SearchAppBar from "./Navbar";


const Layout = () => {

    const theme = createTheme({
        palette: {
            mode: 'dark'
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SearchAppBar />

            <Container sx={{ mt: 2 }}>
                <Outlet />
            </Container>
        </ThemeProvider>
    )
}

export default Layout