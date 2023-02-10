import React, { useContext, useState } from 'react'
import { Container } from '@mui/system'
import { Box, Divider, IconButton, InputBase, Paper, Tooltip, Zoom } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import { ChatGPT, WebScrapping } from './components';
import honorablesService from '../../services/honorables.service';
import Swal from 'sweetalert2';
import { configError } from '../../helpers/notificationMessage';
import { Context } from '../../routers/App';

const Home = () => {
  const halfWidthContainer = "50%";
  const allHeightContainer = "100%";
  const padding = "10 px";  
  
  const [search, setSearch] = useState("");
  const context = useContext(Context)

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const searchText = async(e) => {
    try{
      if(search.length > 0 ){
        context.setLoading(true);
        //Search text user
        const result = await honorablesService.post("/gpt-3",{ message: search})
        //Search key words
        const resultKeyWords = await honorablesService.post("/gpt-3",{ message: `${search}, dime las palabras clave de este texto separadas por coma`})
        const keywords = resultKeyWords.data?.text.replace("\n\nPalabras clave: ","").split(",");
        context.setKeyWords(keywords);
        context.setQuestion(search);
        context.setMessage(result.data?.text.slice(2));

        //Remove search
        setSearch("")
      }else{
        Swal.fire(configError("Escriba la ley que desea buscar"))
      }
    }catch(error){
      context.setLoading(false);
      Swal.fire(configError("Ocurrió un error de conexión"))      
    }
  }
  
  return (
    <Container sx={{ minHeight: allHeightContainer}}>
      <Box sx={{ mt: 1}}>
        <Paper
          component="form"
          sx={{  p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >          
          <InputBase
            multiline             
            onChange={onChangeSearch}            
            sx={{ ml: 1, flex: 1 }}
            placeholder="Busqueda de leyes"        
            value={search}  
            inputProps={{ 'aria-label': 'busqueda leyes' }}
          />
          <IconButton type="button" sx={{ padding }} onClick={searchText} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />   
          <Tooltip TransitionComponent={Zoom} title="Sea especifíco para que el motor le pueda hacer un resumen a su medida">
            <IconButton color="primary" sx={{ padding }} aria-label="directions">
              <InfoIcon />
            </IconButton>       
          </Tooltip>
        </Paper>
      </Box>
      <Box sx={{display:"flex", mt:2}}>
        <Box sx={{width: halfWidthContainer, minHeight: allHeightContainer}}>
          <ChatGPT search={search} setSearch={setSearch}/>
        </Box>
        <Divider sx={{ height: 250, m: 0.5 }} orientation="vertical" />  
        <Box sx={{width: halfWidthContainer, minHeight: allHeightContainer}}>
          <WebScrapping search={search}/>
        </Box>
      </Box>


    </Container>
  )
}

export default Home