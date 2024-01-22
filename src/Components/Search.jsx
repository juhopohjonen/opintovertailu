import { Box, Button, FormControl, Icon, InputLabel, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Pagination, Paper, Select, Stack, Tab, Tabs, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

// experimental libraries

import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import axios from "axios"
import { Link, useSearchParams } from "react-router-dom"


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
                order: order
            }
        })
            .then(res => setResults(res.data))
            .catch(err => console.error('err!', err))
    }, [sParams])





    if (!results) {
        return <LinearProgress />
    }

    return (
        <>
            <SearchResults hits={results.hits} />  
            <Stack spacing={2}>
                <Pagination count={10} onChange={pageChange} page={page} />
            </Stack>
        </>
    )
}

const SearchResults = ({ hits }) => {
    if (!hits) {
        return
    }

    return (
        <List>
            {hits.map(result => <Result result={result} />)}
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
                    primary={result.nimi.fi}
                    secondary={getStudyPointsStr()}
                />
            </ListItemButton>
        </ListItem>
    )
}

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


export default Search
export {
    SearchResults,
    canBeConvertedToNum,
}