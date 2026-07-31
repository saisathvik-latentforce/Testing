import React from 'react';
import { Typography, Box, Stack, Button, Container } from '@mui/material';

import Espresso from '../assets/espresso-coffee.png';

const Hero = () => (
  <Box
    sx={{
      background: 'linear-gradient(135deg, #f9f3ec 0%, #ede0d0 100%)',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Mobile background image — decorative, hidden from screen readers */}
    <Box
      aria-hidden="true"
      sx={{
        display: { xs: 'block', md: 'none' },
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${Espresso})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center right',
        opacity: 0.12,
      }}
    />

    <Container id="home" sx={{ position: 'relative', zIndex: 1 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', minHeight: '85vh' }}
      >
        {/* Text */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            padding: '3rem 0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '.5rem',
            alignItems: 'center',
          }}
        >
          <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', md: '4rem' } }}>
            Coffee For All
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, color: 'text.secondary', maxWidth: 480 }}
          >
            &ldquo;Life begins after coffee&rdquo; &mdash; whether you need a morning boost, a
            productivity kick, or just an excuse to pause.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href="#coffee"
            size="large"
            sx={{ mt: 1, py: 1.5, px: 4, minHeight: 48 }}
          >
            Order Now
          </Button>
        </Box>

        {/* Desktop image */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            width: '50%',
            padding: 2,
            textAlign: 'center',
          }}
        >
          <img
            src={Espresso}
            alt="A freshly brewed espresso coffee"
            style={{ width: '100%', filter: 'drop-shadow(0 8px 24px rgba(132,82,24,0.25))' }}
          />
        </Box>
      </Stack>
    </Container>
  </Box>
);

export default Hero;
