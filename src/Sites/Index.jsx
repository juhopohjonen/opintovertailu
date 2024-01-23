import { Box, Button, Typography } from "@mui/material"
import Search from "../Components/Search"
import { Link } from "react-router-dom"
import SeoEnchanger from "../Components/SeoEnchanger"

const Index = () => {
    return (
        <>
            <SeoEnchanger
                title="Etusivu"
                desc="Opintovertailusta löydät listan yliopisto, ammatti- ja lukio-opintoja. Ota selvää erilaisista opintovaihtoehdoista!"
            />
            
            <Typography variant='h2' component='h1' gutterBottom>Opintovertailu</Typography>
            <Search />
        </>
    )
}

export default Index