import React, { useContext, useEffect, useState } from 'react'
import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/system'
import { Context } from '../../../../routers/App'
import honorablesService from '../../../../services/honorables.service'
import 'animate.css';

const WebScrapping = () => {
    const context = useContext(Context);
    const navigate = useNavigate();
    const fontSize = 14;
    const color= "text.secondary"
    const fullWidth = "100%"
    const centerElements = {
        display:"flex", 
        flexDirection:"column", 
        justifyContent:"center", 
        alignItems:"center"
    }
    const [ listDocuments, setListDocuments ] = useState([]);
    const [ statusFetch, setStatusFetch ] = useState(false);

    useEffect(()=>{
        if(context.keywords.length > 0){
            setListDocuments([]);
            const fetchScrapping = async () =>{
                try{
                    setStatusFetch("Buscando...");
                    await Promise.all(context.keywords.map(async (keyword) => {
                        const res = await honorablesService.post('/webscrapping',{ message: keyword})
                        const documents = res.data.results.slice(0,2).map((doc)=>{
                            return {
                                id: doc["@id"], 
                                entity: doc.entity,
                                date: doc.date,
                                link: doc.link
                            }
                        })
                        listDocuments.push(...documents);                        
                    }));
                }finally{
                    setListDocuments(listDocuments);
                    if(listDocuments.length === 0){
                        setStatusFetch("No se encontró información.");
                    }else{
                        setStatusFetch(false);
                    }
                }
            }
            fetchScrapping()
        }
    },[context.keywords])

    const navigatePDF = () => {
        navigate('/download');
    }

    return (
        <Container>
            <Box sx={centerElements}>
                <Typography>Aqui encontrarás una biblioteca de archivos que te servirán basado en tu ultima busqueda!</Typography>
                {
                    statusFetch ? 
                    <Box sx={{ ...centerElements, m: "1rem 0", width: fullWidth}}>
                        {
                            statusFetch === "Buscando..." ? 
                                <>
                                    <CircularProgress/>
                                    <Typography>{statusFetch}</Typography>
                                </>
                            :
                                <Alert severity="warning">{statusFetch}</Alert>
                        }
                    </Box>
                    :
                    <></>
                }
                {
                    context.keywords.length > 0 ?
                        <Box sx={{ width: fullWidth, m: ".5rem 0" }} >
                            <Alert severity="info">Puedes descargar un resumen aqui!</Alert>
                            <Button variant="contained" sx={{width: fullWidth}} onClick={navigatePDF}> Descargar resumen </Button>
                        </Box>:
                        <></>
                }
                {
                    listDocuments.map((document,index)=>(
                        <Card key={index} className='animate__animated animate__bounceIn' sx={{ m: "1rem 0", width:"100%"}}>
                            <CardContent>
                                <Typography>
                                    Documento N° {document.id}
                                </Typography>
                                <Typography sx={{ fontSize }} color={color}>
                                    Entidad:  {document.entity}
                                </Typography>
                                <Typography sx={{ fontSize }} color={color}>
                                    Fecha: {document.date}
                                </Typography>                                                                
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={()=>{window.open(document.link)}}>Descargar documento</Button>
                            </CardActions>
                        </Card>
                    ))
                }
            </Box>
        </Container>
    )
}

export default WebScrapping