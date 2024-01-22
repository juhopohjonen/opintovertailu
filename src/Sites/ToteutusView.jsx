import { Accordion, AccordionDetails, AccordionSummary, Box, LinearProgress, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EducationHeader } from "./EducationView"

const API_URL = 'https://opintopolku.fi/konfo-backend/external/toteutus'

const ToteutusView = () => {
    const [toteutus, setToteutus] = useState(null)

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
            <Typography gutterBottom variant="h4" component='h1'>
                {toteutus.nimi.fi}
            </Typography>

            <EducationHeader
                education={toteutus}
            />

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