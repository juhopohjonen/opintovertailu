import { Search } from "@mui/icons-material"
import { LinearProgress, Pagination, Paper, Stack, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useLocation, useSearchParams } from "react-router-dom"
import { SearchResults, canBeConvertedToNum } from "../Components/Search"
import SeoEnchanger from "../Components/SeoEnchanger"
import { calculatePageCount } from "../utils"

const API_URI = 'https://opintopolku.fi/konfo-backend/external/search/toteutukset-koulutuksittain'

const resultsPerPage = 20

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
                page: page,
                size: resultsPerPage
            }
        })
            .then(res => setEducation(res.data))
    }, [searchParams])

    if (!education) {
        return <LinearProgress />
    }

    if (education.total <= 0) {
        return <p>Ei tuloksia valitulle hakusanalle.</p>
    }

    const pageChange = (e, value) => {
        if (hakusana) {
            setSearchParams({
                hakusana: hakusana,
                page: value
            })
        } else {
            setSearchParams({
                page: value
            })
        }
    }

    const pageCount = calculatePageCount(education.total, resultsPerPage)
    console.log('hits', education.total, resultsPerPage, 'pg', pageCount)

    return (
        <>
            <SeoEnchanger title="Haku" />
            <Typography variant="h3">
                Tulokset hakusanalle "{hakusana}"
            </Typography>

            <Paper elevation={1} sx={{ mb: 3 }}>
                <SearchResults
                    hits={education.hits}
                />


                <Stack spacing={2}>
                    <Pagination count={pageCount} onChange={pageChange} page={page} />
                </Stack>

                <br />
            </Paper>

        </>
    )
}

export default AvailableEducations