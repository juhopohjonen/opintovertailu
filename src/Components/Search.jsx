import { Box, Button, FormControl, Icon, IconButton, InputLabel, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Pagination, Paper, Select, Stack, Tab, Tabs, TextField, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"

// experimental libraries

import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import axios from "axios"
import { Link, Navigate, useSearchParams } from "react-router-dom"

const resultsPerPage = 20

import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';


const API_URI = 'https://opintopolku.fi/konfo-backend/external/search/toteutukset-koulutuksittain'

const canBeConvertedToNum = (value) => {
    try {
        const number = Number(value)
        console.log('num conversion ok!')
        return number
    } catch (e) {
        console.log('number convertion failed', e)
        return false
    }
}

const Search = () => {


    const [sParams, setSParams] = useSearchParams()

    const eduType = sParams.get('tab') || 'yo'

    const handleTabChange = (event, newValue) => {
        setSParams({ tab: newValue })
    }

    return (
        <Paper elevation={3} component={Box} sx={{ p: 1, width: 750, maxWidth: '100%', mb: 5 }}>
            <TabContext value={eduType} sx={{ m: 0 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange} aria-label="Hakuvalikko">
                        <Tab label="Yliopisto" value="yo" />
                        <Tab label="Ammattikoulu" value="ammattikoulu" />
                        <Tab label="AMK" value="amk" />
                    </TabList>
                </Box>

                <TabPanel sx={{ ml: -4 }} value="yo">
                    <SearchForm educationType='yo' />
                </TabPanel>
                
                <TabPanel value="ammattikoulu">
                    <SearchForm educationType='amm' />
                </TabPanel>

                <TabPanel value="amk">
                    <SearchForm educationType='amk' />
                </TabPanel>
            </TabContext>
        </Paper>
    )
}

const SearchForm = ({ educationType }) => {

    const [results, setResults] = useState(null)
    const [sParams, setSParams] = useSearchParams()
    const [naviTarget, setNaviTarget] = useState(null) 

    const page = sParams.get('sivu') && canBeConvertedToNum(sParams.get('sivu'))
        ? canBeConvertedToNum(sParams.get('sivu'))
        : 1

    const order = 
        sParams.get('order') && (sParams.get('order') == 'asc' || sParams.get('order') == 'desc')
            ? sParams.get('order')
            : 'desc'

        console.log('order', order)

    console.log('page', page)

    const setOrder = (target) => {
        setSParams({...sParams, order: target })
    }
    
    const pageChange = (e, value) => {
        if (sParams.get('tab')) {
            setSParams({ tab: sParams.get('tab'), sivu: value })
        } else {
            setSParams({ sivu: value })
        }
    }

    useEffect(() => {
        console.log('in effect... with order', order)
        axios.get(API_URI, {
            params: {
                koulutustyyppi: educationType,
                page,
                order: order,
                size: resultsPerPage
            }
        })
            .then(res => setResults(res.data))
            .catch(err => console.error('err!', err))
    }, [sParams])

    if (!results) {
        return <LinearProgress />
    }

    const totalHits = results.total
    console.log(results.hits.length)
    const pageCount = Math.ceil(totalHits / resultsPerPage)

    const navToRandomEducation = () => {
        const max = results.hits.length

        const indexOfRandom = Math.floor(Math.random() * (max + 1))
        console.log('random index', indexOfRandom)

        const randomEdu = results.hits[indexOfRandom]

        console.log(randomEdu)

        return setNaviTarget(`/opinnot/${randomEdu.oid}`)
    }

    return (
        <>
            <Button startIcon={<CasinoOutlinedIcon />} variant="outlined" color="secondary" onClick={navToRandomEducation} sx={{ ml: 1 }} aria-label="Arvo satunnainen opinto">
                Satunnainen opinto
            </Button>

            <SearchResults hits={results.hits} />  
            <Stack spacing={2}>
                <Pagination count={pageCount} onChange={pageChange} page={page} />
            </Stack>

            {naviTarget ? <Navigate to={naviTarget} replace={false} /> : null}
        </>
    )
}

const SearchResults = ({ hits }) => {
    if (!hits) {
        return
    }

    return (
        <List>
            {hits.map((result, i) => <Result key={result.nimi.fi + i.toString()} result={result} />)}
        </List>
    )
}

const Result = ({ result }) => {

    const getStudyPointsStr = () => {
        if (result.opintojenLaajuusNumero && result.opintojenLaajuusyksikko.nimi.fi) {
            return `${result.opintojenLaajuusNumero} ${result.opintojenLaajuusyksikko.nimi.fi}`
        }

        return null
    }

    return (
        <ListItem disablePadding component={Link} to={`/opinnot/${result.oid}`}>
            <ListItemButton>
                <ListItemText
                    sx={{ color: 'text.primary' }}
                    primary={result.nimi.fi || result.nimi.sv || result.nimi.en || 'Ei nimeä'}
                    secondary={getStudyPointsStr()}
                />
            </ListItemButton>
        </ListItem>
    )
}


// TODO: SelectOrder component for selecting order from API

{/*
const SelectOrder = ({ chosen, setChosen, sxRelay }) => {
    return (
        <FormControl fullWidth sx={sxRelay}>
            <InputLabel id="select-order">Järjestys</InputLabel>
            <Select
                labelId="select-order"
                value={chosen}
                label="Järjestys"
                onChange={(e) => setChosen(e.target.value)}
            >
                <MenuItem value='asc'>Nouseva (nimi)</MenuItem>
                <MenuItem value='desc'>Laskeva (nimi)</MenuItem>   
            </Select>
        </FormControl>
    )
}
*/}


export default Search
export {
    SearchResults,
    canBeConvertedToNum,
}