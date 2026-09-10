import React, { useEffect, useMemo } from 'react';
import { Box, Typography, Button, Paper, Divider, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionIcon = motion(CheckCircleOutlineIcon);

const Confetti = () => {
  const pieces = Array.from({ length: 30 }, (_, i) => i);
  const colors = ['#845218', '#164a25', '#f5c842', '#e84545', '#3a86ff'];
  return (
    <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {pieces.map(i => {
        const left = Math.random() * 100;
        const delay = Math.random() * 1.5;
        const duration = 2 + Math.random() * 2;
        const color = colors[i % colors.length];
        const size = 8 + Math.random() * 8;
        return (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: '-20px',
              left: `${left}%`,
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
              animation: `confettiFall ${duration}s ${delay}s ease-in forwards`,
              '@keyframes confettiFall': {
                '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 },
              },
            }}
          />
        );
      })}
    </Box>
  );
};

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { method, amount, items = [] } = location.state || {};

  const orderId = useMemo(() => `CF-${Date.now().toString().slice(-6)}`, []);
  const orderDate = useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    []
  );

  useEffect(() => {
    if (!method) navigate('/');
  }, [method, navigate]);

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        p: 2,
      }}
    >
      <Confetti />
      <MotionBox
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
        sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 480 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
            boxShadow: t => `0 20px 50px -15px ${t.palette.success.main}55`,
          }}
        >
          <Box
            sx={{
              width: 96,
              height: 96,
              mx: 'auto',
              mb: 2,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: t => `radial-gradient(circle, ${t.palette.success.main}22 0%, transparent 75%)`,
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: t => `2px solid ${t.palette.success.main}`,
                opacity: 0,
                animation: 'pulseRing 1.8s ease-out infinite',
                '@keyframes pulseRing': {
                  '0%': { transform: 'scale(0.85)', opacity: 0.7 },
                  '70%': { transform: 'scale(1.5)', opacity: 0 },
                  '100%': { transform: 'scale(1.5)', opacity: 0 },
                },
              },
            }}
          >
            <MotionIcon
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              sx={{ fontSize: 80, color: 'success.main' }}
            />
          </Box>
          <Typography variant="h4" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={1}>
            Your order has been placed via <strong>{method}</strong>.
          </Typography>
          <Typography variant="body2" color="text.disabled" mb={3}>
            Order ref <strong>#{orderId}</strong> &middot; {orderDate}
          </Typography>

          {items.length > 0 && (
            <>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold" mb={1} textAlign="left">
                Order Summary <span style={{ color: 'text.disabled', fontWeight: 'normal', fontSize: '0.85em' }}>#{orderId}</span>
              </Typography>
              <Stack spacing={0.5} mb={2}>
                {items.map(item => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">
                      {item.title} × {item.quantity}
                    </Typography>
                    <Typography variant="body2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Total Paid
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  ${Number(amount).toFixed(2)}
                </Typography>
              </Box>
            </>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Back to Menu
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/stats')}>
              View Stats
            </Button>
          </Stack>
        </Paper>
      </MotionBox>
    </Box>
  );
};

export default PaymentSuccess;
