import { Typography } from "@mui/material"
import { useParams } from "react-router-dom"

const SchoolView = () => {
    const { id } = useParams()

    return (
        <>
            <Typography variant="h3" component='h1'>oppilaitos</Typography>
        </>
    )
}

export default SchoolView