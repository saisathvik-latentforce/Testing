import React from 'react';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { CoffeeRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 'auto',
      pt: 6,
      pb: { xs: 10, sm: 4 },
      bgcolor: 'background.paper',
      borderTop: '1px solid',
      borderColor: 'divider',
    }}
  >
    <Container maxWidth="lg">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        spacing={3}
      >
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <Box
            sx={{
              width: 34,
              height: 34,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '50%',
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <CoffeeRounded fontSize="small" />
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ fontFamily: 'Georgia, serif', fontWeight: 700 }}
            >
              Roast & Ritual
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Small-batch coffee, delivered fresh.
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'Menu', to: '/' },
            { label: 'My Order', to: '/orders' },
            { label: 'Insights', to: '/stats' },
          ].map(link => (
            <Typography
              key={link.to}
              component={Link}
              to={link.to}
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              {link.label}
            </Typography>
          ))}
        </Stack>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
        {new Date().getFullYear()} Roast & Ritual. Crafted with care.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
