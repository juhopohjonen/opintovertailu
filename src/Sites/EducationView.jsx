import { ExpandMore, SchoolRounded } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardMedia, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Tooltip, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import SeoEnchanger from "../Components/SeoEnchanger"

const API_URI = "https://opintopolku.fi/konfo-backend/external/koulutus/"

const basicAccordionWidth = {
    width: 500,
    maxWidth: '100%'
}

const EducationView = () => {
    const { id } = useParams()
    const TARGET_URI = API_URI + id

    const [education, setEducation] = useState(null)

    useEffect(() => {
        axios.get(TARGET_URI, {
            params: {
                toteutukset: true,
                hakukohteet: true,
                haut: true
            }
        })
            .then(res => setEducation(res.data))
            .catch(err => console.error(err))
    }, [])

    if (!education) {
        return <LinearProgress />
    }

    console.log(education)

    return (
        <>
            <SeoEnchanger
                title={education.nimi.fi}
                desc={`Opinnon ${education.nimi.fi} ja monta muuta löydät Opintovertailusta.`}
            />

            <Typography variant='h4' component='h1'>
                {education.nimi.fi}
            </Typography>
            <Typography variant="body2" color='text.secondary' component='p' sx={{ mb: 4 }}>{education.nimi.sv}</Typography>

            <EducationHeader education={education} />

            <Accordion sx={basicAccordionWidth}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    id="schools"
                >
                    Missä oppilaitoksissa opintoa voi opiskella?
                </AccordionSummary>
                <AccordionDetails>
                    <SchoolList
                        education={education}
                    />
                </AccordionDetails>
            </Accordion>
            
            <Accordion sx={basicAccordionWidth}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    id="toteutukset"
                >
                    Millaisissa muodoissa tätä opintoa tarjotaan?
                

                </AccordionSummary>
                <AccordionDetails>
                    <TypeOfEducationList
                            typeList={education.toteutukset}
                    />
                </AccordionDetails>
            </Accordion>

        </>
    )
}

const EducationHeader = ({ education }) => {
    return (
        <Card sx={{ width: 500, maxWidth: '100%', mb: 2 }}>
            {
                education.teemakuva ? (
                    <CardMedia
                        sx={{ height: 300 }}
                        image={education.teemakuva}
                        title={`Teemakuva opinnosta ${education.nimi.fi}`}
                    />
                ) : null
            }

        </Card>
    )
}

const TypeOfEducationList = ({ typeList }) => {
    return (
        <List>
            {typeList.map(type => (
                <ListItem key={type.oid}>
                    <ListItemButton component={Link} to={`/toteutukset/${type.oid}`}>
                        <ListItemText
                            sx={{ color: 'text.primary' }}
                            primary={type.nimi.fi}
                            secondary={
                                <>
                                    {type.tarjoajat.map(tarjoaja => <span>{tarjoaja.nimi.fi} </span>)}
                                </>
                            }
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}

 
const SchoolList = ({ education, headerComp }) => {

    const OP_SCHOOL_BASE = 'https://opintopolku.fi/konfo/fi/oppilaitos'

    const { tarjoajat } = education

    return (
        <Paper component={List} elevation={1} sx={ {...basicAccordionWidth, mt: -3} }>
            {
                headerComp ? headerComp : null
            }
            {tarjoajat.map(oppilaitos => (
                <ListItem key={oppilaitos.nimi.fi}>

                    <Tooltip placement="right" title="Tämä linkki avautuu opintopolussa.">
                        <ListItemButton sx={{ ml: -2 }} component={Link} to={`${OP_SCHOOL_BASE}/${oppilaitos.oid}`} target="_blank noref" rel="noreferrer">
                            <ListItemIcon>
                                <SchoolRounded />
                            </ListItemIcon>

                            <ListItemText
                                primary={oppilaitos.nimi.fi}
                                secondary={oppilaitos.paikkakunta.nimi.fi}
                            />
                        </ListItemButton>
                    </Tooltip>

                </ListItem>
            ))}
        </Paper>
    )
}


export default EducationView
export {
    EducationHeader
}