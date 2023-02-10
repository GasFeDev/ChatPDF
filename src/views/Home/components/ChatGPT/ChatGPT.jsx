import React, { useContext, useEffect, useState } from 'react'
import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { Context } from '../../../../routers/App'
import 'animate.css';

const ChatGPT = () => {
    const context = useContext(Context);
    const [listAnswers, setListAnswers] = useState([]);

    useEffect(()=>{
        if(context.message.length > 0){
            const answer = {
                question: context.question,
                answer: context.message
            }
            listAnswers.unshift(answer);
            setListAnswers(listAnswers);
            context.setLoading(false);
        }
    },[context.message]);

    return (
        <Box>
            { context.loading ? 
                <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <CircularProgress/>
                </Box>
                :
                <></>
            }
            {
                listAnswers.map( (answers,index) => (                    
                    <Paper key={index} className='animate__animated animate__bounceIn' sx={{ p: 3, m: 1, borderRadius: 4}} elevation={6}>
                        <Typography sx={{ color: "var(--color-bg)"}}><b>Pregunta: </b> {answers.question} </Typography>
                        <Typography sx={{ whiteSpace:'pre-wrap'}}>
                            {answers.answer}
                        </Typography>
                    </Paper>
                ))
            }
        </Box>
    )
}

export default ChatGPT