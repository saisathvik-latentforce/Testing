import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  Link as MuiLink,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  AddRounded,
  ArrowBackRounded,
  DeleteOutlineRounded,
  LocalShippingOutlined,
  RemoveRounded,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

import { useCart } from './CartContext';

const SummaryRow = ({ label, value, strong = false }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Typography color={strong ? 'text.primary' : 'text.secondary'} fontWeight={strong ? 800 : 400}>
      {label}
    </Typography>
    <Typography fontWeight={strong ? 800 : 600}>{value}</Typography>
  </Stack>
);

const Order = () => {
  const { cart, updateQuantity, removeFromCart, total, itemCount, deliveryFee, grandTotal } =
    useCart();
  const navigate = useNavigate();
  const amountToFreeDelivery = Math.max(35 - total, 0);

  if (cart.length === 0) {
    return (
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
              <ShoppingBagOutlined sx={{ fontSize: 48, color: 'text.secondary' }} />
            </Box>
            <Typography variant="h3" sx={{ fontSize: { xs: '2.3rem', sm: '3rem' } }}>
              Your order is waiting
            </Typography>
            <Typography color="text.secondary" sx={{ my: 2, maxWidth: 420 }}>
              Choose a coffee that sounds good. We’ll keep everything here while you decide.
            </Typography>
            <Button variant="contained" component={Link} to="/" startIcon={<ArrowBackRounded />}>
              Browse the menu
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <MuiLink component={Link} to="/" underline="hover" color="inherit">
          Menu
        </MuiLink>
        <Typography color="text.primary">My order</Typography>
      </Breadcrumbs>
      <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2.6rem', md: '3.6rem' } }}>
        Your order
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
        {itemCount} item{itemCount === 1 ? '' : 's'}, freshly prepared for you.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 360px' },
          gap: { xs: 4, md: 6 },
          alignItems: 'start',
        }}
      >
        <Stack spacing={1.5}>
          <AnimatePresence initial={false}>
            {cart.map(item => (
              <motion.div key={item.id} layout exit={{ opacity: 0, height: 0 }}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: { xs: 1.25, sm: 1.5 },
                    gap: { xs: 1.5, sm: 2 },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt=""
                    sx={{
                      width: { xs: 78, sm: 104 },
                      height: { xs: 88, sm: 104 },
                      objectFit: 'cover',
                      borderRadius: 2.5,
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="h6" noWrap>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {item.vendor}
                    </Typography>
                    <Typography fontWeight={800} color="primary.main" sx={{ mt: 0.75 }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                  <Stack alignItems="flex-end" spacing={1}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.title}`}
                    >
                      <DeleteOutlineRounded fontSize="small" />
                    </IconButton>
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 99,
                        p: 0.25,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease ${item.title} quantity`}
                      >
                        <RemoveRounded fontSize="small" />
                      </IconButton>
                      <Typography
                        aria-live="polite"
                        fontWeight={800}
                        sx={{ width: 28, textAlign: 'center' }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase ${item.title} quantity`}
                      >
                        <AddRounded fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackRounded />}
            sx={{ alignSelf: 'flex-start', mt: 1 }}
          >
            Continue shopping
          </Button>
        </Stack>

        <Paper
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            position: { md: 'sticky' },
            top: { md: 96 },
          }}
        >
          <Typography variant="h5">Order summary</Typography>
          <Stack spacing={1.5} sx={{ my: 3 }}>
            <SummaryRow label="Subtotal" value={`$${total.toFixed(2)}`} />
            <SummaryRow
              label="Delivery"
              value={deliveryFee ? `$${deliveryFee.toFixed(2)}` : 'Free'}
            />
          </Stack>
          <Divider />
          <Box sx={{ my: 2.5 }}>
            <SummaryRow label="Total" value={`$${grandTotal.toFixed(2)}`} strong />
            <Typography variant="caption" color="text.secondary">
              Taxes included where applicable
            </Typography>
          </Box>
          <Button variant="contained" fullWidth size="large" onClick={() => navigate('/payment')}>
            Continue to payment
          </Button>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2.5 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalShippingOutlined color="secondary" fontSize="small" />
              <Typography variant="body2" fontWeight={700}>
                {amountToFreeDelivery > 0
                  ? `$${amountToFreeDelivery.toFixed(2)} away from free delivery`
                  : 'You unlocked free delivery'}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={Math.min((total / 35) * 100, 100)}
              color="secondary"
              sx={{ mt: 1.5, height: 6, borderRadius: 99 }}
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

SummaryRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  strong: PropTypes.bool,
};

export default Order;
