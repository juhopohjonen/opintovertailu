import { Box, Button, Typography } from "@mui/material"
import Search from "../Components/Search"
import { Link } from "react-router-dom"

const Index = () => {
    return (
        <>
            <Typography variant='h2' component='h1' gutterBottom>Opintovertailu</Typography>
            <Search />
        </>
    )
}

export default Index