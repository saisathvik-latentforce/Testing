import React from 'react';
import { Box, Button, Chip, Container, Stack, Typography } from '@mui/material';
import { ArrowDownwardRounded, LocalCafeRounded, StarRounded } from '@mui/icons-material';

import Espresso from '../assets/espresso-coffee.png';

const Hero = () => (
  <Box
    component="section"
    aria-labelledby="hero-title"
    sx={{
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid',
      borderColor: 'divider',
      background: theme =>
        theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, #f7f0e5 0%, #efe0ce 100%)'
          : 'linear-gradient(135deg, #1a1511 0%, #2a1d15 100%)',
    }}
  >
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        width: 520,
        height: 520,
        right: '-10%',
        top: '-35%',
        borderRadius: '50%',
        bgcolor: 'primary.main',
        opacity: 0.08,
      }}
    />
    <Container maxWidth="lg">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        spacing={{ xs: 3, md: 7 }}
        sx={{ minHeight: { xs: 660, md: 620 }, py: { xs: 7, md: 8 } }}
      >
        <Box sx={{ flex: 1, maxWidth: 650, zIndex: 1 }}>
          <Chip
            icon={<StarRounded />}
            label="Roasted fresh every week"
            color="secondary"
            variant="outlined"
            sx={{ mb: 3, bgcolor: 'background.paper' }}
          />
          <Typography
            id="hero-title"
            component="h1"
            variant="h1"
            sx={{ fontSize: { xs: '3.4rem', sm: '4.7rem', md: '5.5rem' } }}
          >
            Your best cup,
            <Box
              component="span"
              sx={{ display: 'block', color: 'primary.main', fontStyle: 'italic' }}
            >
              thoughtfully made.
            </Box>
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{ mt: 3, maxWidth: 560, fontWeight: 400, lineHeight: 1.6 }}
          >
            Discover small-batch coffees from celebrated roasters, selected for clarity, character,
            and a truly memorable morning ritual.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              href="#coffee"
              endIcon={<ArrowDownwardRounded />}
            >
              Explore the menu
            </Button>
            <Button variant="text" color="inherit" size="large" href="#our-promise">
              Why our coffee?
            </Button>
          </Stack>

          <Stack id="our-promise" direction="row" spacing={{ xs: 2.5, sm: 5 }} sx={{ mt: 5 }}>
            {[
              ['48 hr', 'roast-to-ship'],
              ['4.8/5', 'coffee lovers'],
              ['100%', 'traceable lots'],
            ].map(([value, label]) => (
              <Box key={label}>
                <Typography variant="h6" color="primary.main">
                  {value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box sx={{ flex: 0.85, position: 'relative', width: '100%', maxWidth: 480 }}>
          <Box
            sx={{
              aspectRatio: '1 / 1',
              borderRadius: '50% 50% 42% 58% / 54% 42% 58% 46%',
              bgcolor: 'primary.main',
              opacity: 0.13,
              position: 'absolute',
              inset: 0,
              transform: 'rotate(-8deg)',
            }}
          />
          <Box
            component="img"
            src={Espresso}
            alt="Fresh espresso served with roasted coffee beans"
            sx={{
              position: 'relative',
              display: 'block',
              width: '100%',
              aspectRatio: '1 / 1',
              objectFit: 'contain',
              filter: 'drop-shadow(0 28px 30px rgba(66, 36, 19, .26))',
            }}
          />
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.25}
            sx={{
              position: 'absolute',
              left: { xs: 8, sm: -20 },
              bottom: { xs: 12, sm: 42 },
              p: 1.5,
              pr: 2.5,
              borderRadius: 3,
              bgcolor: 'background.paper',
              boxShadow: '0 18px 45px rgba(50, 30, 18, .16)',
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <LocalCafeRounded />
            </Box>
            <Box>
              <Typography variant="subtitle2">Picked for you</Typography>
              <Typography variant="caption" color="text.secondary">
                Six exceptional brews
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  </Box>
);

export default Hero;
