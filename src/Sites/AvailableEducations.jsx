import { Search } from "@mui/icons-material"
import { LinearProgress, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import { SearchResults } from "../Components/Search"

const API_URI = 'https://opintopolku.fi/konfo-backend/external/search/toteutukset-koulutuksittain'

const AvailableEducations = () => {
    const [searchParams] = useSearchParams()
    const hakusana = searchParams.get('hakusana')

    const [education, setEducation] = useState(null)

    useEffect(() => {
        axios.get(API_URI, {
            params: {
                keyword: 
                    hakusana ? hakusana : null
            }
        })
            .then(res => setEducation(res.data))
    }, [searchParams])

    if (!education) {
        return <LinearProgress />
    }

    return (
        <>
            <Typography variant="h3">
                Tulokset hakusanalle "{hakusana}"
            </Typography>
            <SearchResults
                hits={education.hits}
            />
        </>
    )
}

export default AvailableEducations