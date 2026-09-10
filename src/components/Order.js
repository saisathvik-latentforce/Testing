import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Divider,
  Stack,
  Paper,
} from '@mui/material';
import { Add, Remove, Delete, ShoppingCartOutlined } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useCart } from './CartContext';

const Order = () => {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  const handleSubmit = () => navigate('/payment');

  if (cart.length === 0) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          p: 4,
        }}
      >
        <ShoppingCartOutlined sx={{ fontSize: 96, color: 'text.disabled' }} />
        <Typography variant="h5" color="text.secondary">
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.disabled" textAlign="center">
          Browse our featured coffees and add something delicious!
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Browse Menu
        </Button>
      </Box>
    );
  }

  return (
    <Box
      id="orders"
      sx={{
        my: '5rem',
        mx: { xs: '0.5rem', sm: '3rem', md: '5rem' },
        p: { xs: 1, sm: 3 },
        pb: { xs: '120px', sm: 3 },
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Your Orders
      </Typography>

      <AnimatePresence>
        {cart.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1.5,
                p: 1,
                border: '1px solid transparent',
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              {item.image && (
                <CardMedia
                  component="img"
                  sx={{ width: 64, height: 64, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
                  image={item.image}
                  alt={item.title}
                />
              )}
              <CardContent sx={{ flex: 1, py: '8px !important' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${item.price.toFixed(2)} each
                </Typography>
              </CardContent>

              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mx: 1 }}>
                <IconButton
                  size="small"
                  aria-label="Decrease quantity"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  sx={{ minWidth: 36, minHeight: 36 }}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <Typography aria-live="polite" sx={{ minWidth: 24, textAlign: 'center' }}>
                  {item.quantity}
                </Typography>
                <IconButton
                  size="small"
                  aria-label="Increase quantity"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  sx={{ minWidth: 36, minHeight: 36 }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Stack>

              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ minWidth: 64, textAlign: 'right', mr: 1 }}
              >
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>

              <IconButton
                size="small"
                color="error"
                aria-label={`Remove ${item.title} from cart`}
                onClick={() => removeFromCart(item.id)}
                sx={{ minWidth: 36, minHeight: 36 }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Desktop summary */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Total
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="primary">
            ${total.toFixed(2)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ py: 1.5 }}
        >
          Proceed to Payment
        </Button>
      </Box>

      {/* Mobile sticky footer */}
      <Paper
        elevation={8}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          position: 'fixed',
          bottom: 56,
          left: 0,
          right: 0,
          p: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          zIndex: t => t.zIndex.appBar,
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary">
          ${total.toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ flexGrow: 1 }}>
          Proceed to Payment
        </Button>
      </Paper>
    </Box>
  );
};

export default Order;
