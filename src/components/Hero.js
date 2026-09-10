import React from 'react';
import { Typography, Box, Stack, Button, Container } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import Espresso from '../assets/espresso-coffee.png';

const Hero = () => (
  <Box
    sx={{
      background: 'radial-gradient(circle at 85% 20%, #f3e3cb 0%, #f9f3ec 45%, #ede0d0 100%)',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Ambient glow accents — decorative */}
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: 420,
        height: 420,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(122,74,16,0.18) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }}
    />
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        bottom: '-15%',
        left: '-8%',
        width: 360,
        height: 360,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(22,74,37,0.14) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }}
    />

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
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.4rem', md: '4rem' },
              background: 'linear-gradient(135deg, #5c3609 0%, #7a4a10 60%, #a06a1f 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
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
            sx={{
              mt: 1.5,
              py: 1.5,
              px: 4.5,
              minHeight: 48,
              fontSize: '1rem',
              borderRadius: 3,
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px -6px rgba(122,74,16,0.45)',
              },
            }}
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

    {/* Scroll-to-explore hint — desktop only, decorative */}
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        color: 'text.secondary',
        opacity: 0,
        animation: 'scrollHint 1.8s ease-in-out 1s infinite, scrollFade 0.6s ease 0.8s forwards',
        '@keyframes scrollHint': {
          '0%, 100%': { transform: 'translate(-50%, 0)' },
          '50%': { transform: 'translate(-50%, 8px)' },
        },
        '@keyframes scrollFade': {
          '0%': { opacity: 0 },
          '100%': { opacity: 0.7 },
        },
      }}
    >
      <Typography variant="caption">Scroll to explore</Typography>
      <ExpandMoreIcon fontSize="small" />
    </Box>
  </Box>
);

export default Hero;
