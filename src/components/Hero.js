import React from 'react'
import { Typography, Box, Stack, Button, Container } from '@mui/material'
import Espresso from '../assets/espresso-coffee.png'

const Hero = () => {
    return (
        <Box sx={{
            background: 'linear-gradient(135deg, #f9f3ec 0%, #ede0d0 100%)',
            minHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
        }}>
            <Container id="home">
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    sx={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '85vh',
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: "100%", md: "50%" },
                            padding: '3rem 0',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '.5rem',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4rem' }, fontFamily: "Eagle Lake" }}>Coffee For All</Typography>
                        <Typography variant='h3' sx={{ fontSize: { xs: '1rem', md: '1.5rem' }, fontFamily: "Droid Sans" }}>
                            "Life begins after coffee" for a morning boost, "Coffee first, schemes later" for productivity, and "Coffee: because adulting is hard"
                        </Typography>
                        <Button variant="contained" color='secondary' href="#coffee">Order Now</Button>
                    </Box>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            width: "50%",
                            padding: 2,
                            textAlign: 'center',
                        }}
                    >
                        <img
                            src={Espresso}
                            alt="espresso coffee drink"
                            style={{ width: '100%', filter: 'drop-shadow(0 8px 24px rgba(132,82,24,0.25))' }}
                        />
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default Hero
