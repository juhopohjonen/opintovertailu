import { Accordion, AccordionDetails, AccordionSummary, Box, Button, LinearProgress, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { EducationHeader } from "./EducationView"
import SeoEnchanger from "../Components/SeoEnchanger"

const API_URL = 'https://opintopolku.fi/konfo-backend/external/toteutus'

const ToteutusView = () => {
    const [toteutus, setToteutus] = useState(null)

    const IN_OP_URL = 'https://opintopolku.fi/konfo/fi/toteutus'

    const { id } = useParams()

    useEffect(() => {
        axios.get(`${API_URL}/${id}`, {
            params: {}
        })
            .then(res => setToteutus(res.data))
            .catch(err => {
                console.error(err)
                alert('virhe tapahtui!')
            })
    }, [])

    if (!toteutus) {
        return <LinearProgress />
    }

    console.log(toteutus)

    return (
        <>
            <SeoEnchanger
                title={toteutus.nimi.fi}
                desc={toteutus && toteutus.metadata && toteutus.metadata.kuvaus ? toteutus.metadata.kuvaus : null}
            />
            <Typography gutterBottom variant="h4" component='h1'>
                {toteutus.nimi.fi}
            </Typography>

            <EducationHeader
                education={toteutus}
            />

            <Button sx={{ mb: 2, ml: 0 }} variant="contained" color="secondary" component={Link} rel="noreferrer" target="_blank" to={`${IN_OP_URL}/${id}`}>Näytä opintopolussa</Button>

            {
                toteutus.metadata.kuvaus ? <OptionalTextContent title="Kuvaus" text={toteutus.metadata.kuvaus.fi} /> : null
            }

            {
                toteutus.metadata.opetus && toteutus.metadata.opetus.lisatiedot ? 
                    toteutus.metadata.opetus.lisatiedot.map(tieto => <AccordionTextContent title={tieto.otsikko.nimi.fi} text={tieto.teksti.fi} />) : null
            }

            <Box sx={{ mb: 5 }}></Box>

        </>
    )
}

const AccordionTextContent = ({ title, text }) => (
    <Accordion>
        <AccordionSummary>
            <Typography variant='h5'>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <OptionalTextContent text={text} />
        </AccordionDetails>
    </Accordion>
)

const OptionalTextContent = ({ title, text }) => {
    
    const removeHTMLTags = (str) => str.replace(/(<([^>]+)>)/gi, "");

    
    if (!title && !text) {
        return null
    }

    return (
        <>
            {
                title ? <Typography gutterBottom variant="h5" component='div'>{title}</Typography> : null
            }

            {
                text ? <Typography color="text.secondary" paragraph>{removeHTMLTags(text)}</Typography> : null
            }
        </>
    )
}

export default ToteutusView