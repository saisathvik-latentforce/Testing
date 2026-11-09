import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { ArrowBackRounded, SearchOffRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Container maxWidth="sm">
    <Box
      sx={{
        minHeight: '72vh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        py: 8,
      }}
    >
      <Box>
        <Box
          sx={{
            width: 104,
            height: 104,
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            bgcolor: 'action.hover',
            mx: 'auto',
            mb: 3,
          }}
        >
          <SearchOffRounded sx={{ fontSize: 48, color: 'text.secondary' }} />
        </Box>
        <Typography variant="h3" sx={{ fontSize: { xs: '2.3rem', sm: '3rem' } }}>
          Page not found
        </Typography>
        <Typography color="text.secondary" sx={{ my: 2, maxWidth: 420 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you
          back to the good stuff.
        </Typography>
        <Button variant="contained" component={Link} to="/" startIcon={<ArrowBackRounded />}>
          Back to menu
        </Button>
      </Box>
    </Box>
  </Container>
);

export default NotFound;
