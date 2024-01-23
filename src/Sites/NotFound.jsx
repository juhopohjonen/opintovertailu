import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <>
            <Typography variant="h3">404 - Ei löytynyt</Typography>
            <Typography paragraph>Hakemaasi sivua ei löytynyt.</Typography>
            <Button variant="contained" component={Link} to='/'>
                Palaa etusivulle
            </Button>
        </>
    )
}

export default NotFound