import React, { useEffect } from 'react';
import { Box, Button, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import { CheckRounded, LocalCafeRounded, ReceiptLongOutlined } from '@mui/icons-material';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state?.order;

  useEffect(() => {
    if (!order) navigate('/', { replace: true });
  }, [navigate, order]);

  if (!order) return null;

  const orderDate = new Date(order.createdAt).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 5, md: 8 } }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Paper sx={{ overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
          <Box
            sx={{
              px: { xs: 3, sm: 5 },
              pt: 5,
              pb: 4,
              textAlign: 'center',
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                mx: 'auto',
                mb: 2.5,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'rgba(255,255,255,.16)',
                border: '1px solid rgba(255,255,255,.35)',
              }}
            >
              <CheckRounded sx={{ fontSize: 42 }} />
            </Box>
            <Typography variant="overline" letterSpacing=".15em" fontWeight={800}>
              ORDER CONFIRMED
            </Typography>
            <Typography variant="h3" component="h1" sx={{ mt: 0.75, color: 'inherit' }}>
              Your ritual is on its way.
            </Typography>
            <Typography sx={{ mt: 1.5, opacity: 0.82 }}>
              We’re preparing your coffee with care.
            </Typography>
          </Box>

          <Box sx={{ p: { xs: 3, sm: 5 } }}>
            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  ORDER NUMBER
                </Typography>
                <Typography fontWeight={800}>{order.id}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">
                  PLACED
                </Typography>
                <Typography fontWeight={800}>{orderDate}</Typography>
              </Box>
            </Stack>
            <Divider />
            <Stack spacing={2} sx={{ py: 3 }}>
              {order.items.map(item => (
                <Stack key={item.id} direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: 'action.hover',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <LocalCafeRounded color="primary" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity {item.quantity}
                    </Typography>
                  </Box>
                  <Typography fontWeight={700}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Divider />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ py: 3 }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary">
                  PAID VIA {order.method.toUpperCase()}
                </Typography>
                <Typography variant="h6">Total paid</Typography>
              </Box>
              <Typography variant="h5" color="primary.main">
                ${Number(order.amount).toFixed(2)}
              </Typography>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button fullWidth variant="contained" onClick={() => navigate('/')}>
                Back to menu
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ReceiptLongOutlined />}
                onClick={() => window.print()}
              >
                Save receipt
              </Button>
            </Stack>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default PaymentSuccess;
