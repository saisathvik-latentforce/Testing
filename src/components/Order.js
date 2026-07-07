import React from "react";
import { useCart } from "./CartContext";
import { Box, Typography, Card, CardContent, CardMedia, IconButton, Button, Divider, Stack } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/Payment");
  };

  return (
    <Box id="orders" sx={{ my: '5rem', mx: { xs: '1rem', sm: '3rem', md: '5rem' }, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: "Eagle Lake", textAlign: 'center' }}>
        Your Orders
      </Typography>
      {cart.length === 0 ? (
        <Typography textAlign="center" color="text.secondary" sx={{ mt: 4 }}>
          No items in cart.
        </Typography>
      ) : (
        <>
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={{ display: 'flex', alignItems: 'center', mb: 1.5, p: 1 }}>
                  {item.image && (
                    <CardMedia
                      component="img"
                      sx={{ width: 64, height: 64, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
                      image={item.image}
                      alt={item.title}
                    />
                  )}
                  <CardContent sx={{ flex: 1, py: '8px !important' }}>
                    <Typography variant="subtitle1" fontWeight="bold">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">${item.price.toFixed(2)} each</Typography>
                  </CardContent>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mx: 1 }}>
                    <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography sx={{ minWidth: 24, textAlign: 'center' }}>{item.quantity}</Typography>
                    <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Add fontSize="small" />
                    </IconButton>
                  </Stack>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ minWidth: 64, textAlign: 'right', mr: 1 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton size="small" color="error" onClick={() => removeFromCart(item.id)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Total</Typography>
            <Typography variant="h6" fontWeight="bold" color="primary">${total.toFixed(2)}</Typography>
          </Box>

          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ py: 1.5 }}>
            Proceed to Payment
          </Button>
        </>
      )}
    </Box>
  );
};

export default Order;
