import { Search } from "@mui/icons-material"
import { LinearProgress, Pagination, Paper, Stack, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useLocation, useSearchParams } from "react-router-dom"
import { SearchResults, canBeConvertedToNum } from "../Components/Search"

const API_URI = 'https://opintopolku.fi/konfo-backend/external/search/toteutukset-koulutuksittain'

const AvailableEducations = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const hakusana = searchParams.get('hakusana')

    if (!hakusana || hakusana.length < 3) {
        return <Navigate to='/' replace={true} />
    }

    const page = 
        searchParams.get('page') && canBeConvertedToNum(searchParams.get('page'))
            ? canBeConvertedToNum(searchParams.get('page'))
            : 1 

    const [education, setEducation] = useState(null)

    useEffect(() => {
        axios.get(API_URI, {
            params: {
                keyword: 
                    hakusana ? hakusana : null,
                page: page
            }
        })
            .then(res => setEducation(res.data))
    }, [searchParams])

    if (!education) {
        return <LinearProgress />
    }

    const pageChange = () => {
        if (hakusana) {
            setSearchParams({
                hakusana: hakusana,
                page: page+1
            })
        } else {
            setSearchParams({
                page: page+1
            })
        }
    }

    return (
        <>
            <Typography variant="h3">
                Tulokset hakusanalle "{hakusana}"
            </Typography>

            <Paper elevation={1}>
                <SearchResults
                    hits={education.hits}
                />
            </Paper>
            <Stack spacing={2}>
                <Pagination count={10} onChange={pageChange} page={page} />
            </Stack>
        </>
    )
}

export default AvailableEducations