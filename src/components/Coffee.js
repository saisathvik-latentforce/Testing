import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Switch, Rating, Stack, Fab, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import productsData from '../assets/coffee';
import { useCart } from './CartContext';
import { motion } from "motion/react";
import AddCoffeeDialog from './AddCoffeeDialog';

const Coffee = () => {
    const { addToCart, updateQuantity, cart } = useCart();
    const getCartQty = (id) => cart.find(item => item.id === id)?.quantity || 0;
    const MotionCard = motion(Card);

    const [products, setProducts] = useState(productsData);

    const [activeStates, setActiveStates] = useState(
        products.reduce((acc, product) => {
            acc[product.id] = true;
            return acc;
        }, {})
    );

    const [openDialog, setOpenDialog] = useState(false);

    const handleToggle = (id) => {
        setActiveStates((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleAddCoffee = (newCoffee) => {
        setProducts([...products, newCoffee]);
        setActiveStates((prev) => ({ ...prev, [newCoffee.id]: true }));
    };

    return (
        <Box sx={{ my: '5rem' }} id="coffee">
            <Typography variant="h5" sx={{ textAlign: 'center', fontFamily: "Eagle Lake" }}>
                Featured Coffees
            </Typography>
            <Grid container spacing={3} sx={{ padding: 3, justifyContent: 'center', fontFamily: "Droid Sans" }}>
                {products.map((product) => {
                    const isActive = activeStates[product.id];
                    return (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <MotionCard>
                                <Card
                                    sx={{
                                        maxWidth: 345,
                                        textAlign: "center",
                                        padding: 2,
                                        border: "2px solid transparent",
                                        transition: "border-color 0.3s, box-shadow 0.3s",
                                        "&:hover": { borderColor: "primary.main", boxShadow: 8 },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="220"
                                        image={product.image}
                                        alt={product.title}
                                    />
                                    <CardContent sx={{ minHeight: 200 }}>
                                        <Typography variant="h6">{product.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>

                                        <Box sx={{ minHeight: 70, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            {isActive && (
                                                <Stack direction="row" spacing={1} useFlexGap justifyContent="center" alignItems="center">
                                                    <Typography variant="h6" color="primary">
                                                        ${product.price.toFixed(2)}
                                                    </Typography>
                                                    {getCartQty(product.id) > 0 ? (
                                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                                            <IconButton size="small" color="secondary" onClick={() => updateQuantity(product.id, getCartQty(product.id) - 1)}>
                                                                <RemoveIcon fontSize="small" />
                                                            </IconButton>
                                                            <Typography variant="body1" sx={{ minWidth: 24, textAlign: 'center', fontWeight: 'bold' }}>
                                                                {getCartQty(product.id)}
                                                            </Typography>
                                                            <IconButton size="small" color="secondary" onClick={() => addToCart(product)}>
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        </Stack>
                                                    ) : (
                                                        <IconButton color="secondary" onClick={() => addToCart(product)} sx={{ border: '1px solid currentColor', borderRadius: 1 }}>
                                                            <AddIcon />
                                                        </IconButton>
                                                    )}
                                                </Stack>
                                            )}
                                        </Box>

                                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <Stack direction="row" spacing={1} useFlexGap justifyContent="center">
                                                <Chip size="small" label={isActive ? 'Active' : 'Out of Stock'} color={isActive ? 'success' : 'default'} />
                                                <Rating defaultValue={4} size="small" />
                                            </Stack>
                                            <Box sx={{ flexGrow: 1 }} />
                                            <Switch checked={isActive} onChange={() => handleToggle(product.id)} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </MotionCard>
                        </Grid>
                    );
                })}
            </Grid>

            <Fab
                color="primary"
                aria-label="add"
                onClick={() => setOpenDialog(true)}
                size='medium'
                sx={{ position: 'fixed', bottom: 32, right: 32 }}
            >
                <AddIcon />
            </Fab>

            <AddCoffeeDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onAdd={handleAddCoffee}
            />
        </Box>
    );
};

export default Coffee;
