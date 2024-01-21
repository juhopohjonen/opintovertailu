import { Box, Button, Icon, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Pagination, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

// experimental libraries

import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import axios from "axios"
import { Link } from "react-router-dom"

import SchoolIcon from '@mui/icons-material/School';

const API_URI = 'https://opintopolku.fi/konfo-backend/external/search/toteutukset-koulutuksittain'

const Search = () => {
    const [tabValue, setTab] = useState('yo')
    const handleTabChange = (event, newValue) => {
        setTab(newValue)
    }

    return (
        <Paper elevation={3} component={Box} sx={{ p: 1, width: 750, maxWidth: '100%' }}>
            <TabContext value={tabValue} sx={{ m: 0 }}>
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
    const [page, setPage] = useState(1)
    
    const pageChange = (e, value) => {
        setPage(value)
    }

    useEffect(() => {
        axios.get(API_URI, {
            params: {
                koulutustyyppi: educationType,
                page
            }
        })
            .then(res => setResults(res.data))
            .catch(err => console.error('err!', err))
    }, [page])


    


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

const Result = ({ result }) => (
    <ListItem disablePadding component={Link} to={`/opinnot/${result.oid}`}>
        <ListItemButton>
            <ListItemText
                sx={{ color: 'text.primary' }}
                primary={result.nimi.fi}
                secondary={result.opintojenLaajuus ? `Opintojen laajuus ${result.opintojenLaajuusNumero} ${result.opintojenLaajuusyksikko.nimi.fi}` : null}
            />
        </ListItemButton>
    </ListItem>
)


export default Search
export {
    SearchResults
}