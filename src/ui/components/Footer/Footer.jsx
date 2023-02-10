import { Box, Container, Paper, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Paper sx={{marginTop: 'calc(10% + 60px)',
        width: '100%',
        position: 'fixed',
        bottom: 0,    
      }} 
      component="footer" 
      square 
      variant="outlined"
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            padding: ".5rem 0"            
          }}
        >
          <Typography variant="caption" color="initial">
            Copyright TitaniusTech Corp ©2023.
          </Typography>
        </Box>
      </Container>
    </Paper>
  )
}

export default Footer