// import React, { useState } from 'react';
// import { Card, CardContent, CardMedia, Button, Typography, Box, Chip, Switch } from '@mui/material';
// import Grid from '@mui/material/Grid';

// import products from '../assets/coffee';
// import { useCart } from './CartContext';
// import { motion } from "motion/react";


// const Coffee = () => {
//     const { addToCart } = useCart(); 
//     const MotionCard = motion(Card);
    
//     const [active, setActive] = useState(true);

            
//     return (
//         <Box sx={{my:'5rem'}} id="coffee" >
//             <Typography variant="h5" sx={{ textAlign: 'center', fontFamily: "Eagle Lake" }}>Featured Coffees</Typography>
//             <Grid container spacing={3} sx={{padding:3, justifyContent:'center', fontFamily: "Droid Sans"}} >
//                 {products.map((product) => (
//                     <Grid item="true" xs={12} sm={6} md={4} key={product.title} >
//                         <MotionCard >
//                             <Card id={product.title.toLowerCase().replace(/\s+/g, '-')}
//                                 sx={{
//                                     maxWidth: 345,
//                                     textAlign: "center",
//                                     padding: 2,
//                                     border: "2px solid transparent",   
//                                     transition: "border-color 0.3s",   
//                                     "&:hover": {
//                                     borderColor: "primary.main",     
//                                     },
//                                 }}>
//                                 <CardMedia
//                                     component="img"
//                                     height="200"
//                                     image={product.image}
//                                     alt={product.title}

//                                 />
//                                 <CardContent>
//                                     <Typography variant="h6">{product.title}</Typography>
//                                     <Typography variant="body2" color="text.secondary">
//                                         {product.description}
//                                     </Typography>
//                                     <Typography variant="h6" color="primary" sx={{ marginY: 1 }}>
//                                         ${product.price.toFixed(2)}
//                                     </Typography>
//                                     <Chip size='small'
//                                         label={active ? 'Active' : 'Inactive'}
//                                         color={active ? 'success' : 'default'}
//                                     />
//                                     <Button variant='contained' color="secondary" onClick={() => addToCart(product)}>
//                                         Buy Now
//                                     </Button>
//                                     <Switch checked={active} onChange={() => setActive(prev => !prev)} />
//                                 </CardContent>
//                             </Card>
//                         </MotionCard>
//                     </Grid>
//                 ))} 
//             </Grid>
//         </Box>
//     )
// }

// export default Coffee


// import React, { useState } from 'react';
// import { Card, CardContent, CardMedia, Button, Typography, Box, Chip, Switch, Rating, Stack, Fab } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import Grid from '@mui/material/Grid';
// import products from '../assets/coffee';
// import { useCart } from './CartContext';
// import { motion } from "motion/react";
// import { Link } from 'react-router-dom';


// const Coffee = () => {
//     const { addToCart } = useCart(); 
//     const MotionCard = motion(Card);

//     const [activeStates, setActiveStates] = useState(
//         products.reduce((acc, product) => {
//             acc[product.title] = true; 
//             return acc;
//         }, {})
//     );

//     const handleToggle = (title) => {
//         setActiveStates((prev) => ({
//             ...prev,
//             [title]: !prev[title]
//         }));
//     };

//     return (
//         <Box sx={{ my: '5rem' }} id="coffee">
//             <Typography variant="h5" sx={{ textAlign: 'center', fontFamily: "Eagle Lake" }}>
//                 Featured Coffees
//             </Typography>
//             <Grid container spacing={3} sx={{  padding: 3, justifyContent: 'center', fontFamily: "Droid Sans" }}>
//                 {products.map((product) => {
//                     const isActive = activeStates[product.title];
//                     return (
//                         <Grid item xs={12} sm={6} md={4} key={product.title}>
//                             <MotionCard>
//                                 <Card
//                                     id={product.title.toLowerCase().replace(/\s+/g, '-')}
//                                     sx={{
//                                         maxWidth: 345,
//                                         textAlign: "center",
//                                         padding: 2,
//                                         border: "2px solid transparent",
//                                         transition: "border-color 0.3s",
//                                         "&:hover": {
//                                             borderColor: "primary.main",
//                                         },
//                                     }}
//                                 >
//                                     <CardMedia
//                                         component="img"
//                                         height="200"
//                                         image={product.image}
//                                         alt={product.title}
//                                     />
//                                     <CardContent>
//                                         <Typography variant="h6">{product.title}</Typography>
//                                         <Typography variant="body2" color="text.secondary">
//                                             {product.description}
//                                         </Typography>

//                                         <Box sx={{ minHeight: 70, display: "flex", justifyContent: "center", alignItems: "center" }}>
//                                             {isActive && (
//                                             <Stack direction="row" spacing={1} useFlexGap justifyContent="center">
//                                                 <Typography variant="h6" color="primary">
//                                                     ${product.price.toFixed(2)}
//                                                 </Typography>
//                                                 <Button variant="contained" color="secondary" onClick={() => addToCart(product)}>
//                                                 Buy Now
//                                                 </Button>
//                                             </Stack>
//                                             )}
//                                         </Box>

//                                         {/* Controls section */}
//                                         <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//                                             <Stack direction="row" spacing={1} useFlexGap justifyContent="center">
//                                                 <Chip
//                                                 size="small"
//                                                 label={isActive ? 'Active' : 'Out of Stock'}
//                                                 color={isActive ? 'success' : 'default'}
//                                                 />
//                                                 <Rating defaultValue={4} size="small" />  
//                                             </Stack>
//                                             <Box sx={{ flexGrow: 1 }} />
//                                             <Switch checked={isActive} onChange={() => handleToggle(product.title)} /> 
//                                         </Box>
//                                     </CardContent>
//                                 </Card>
//                             </MotionCard>
//                         </Grid>
//                     );
//                 })}
//             </Grid>

//             {/* Floating Action Button */}
//             <Fab color="primary" aria-label="add" component={Link} to="/newitem">
//                 <AddIcon />
//             </Fab>

//         </Box>
//     );
// };

// export default Coffee;



import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Button, Typography, Box, Chip, Switch, Rating, Stack, Fab, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import productsData from '../assets/coffee';
import { useCart } from './CartContext';
import { motion } from "motion/react";
import AddCoffeeDialog from './AddCoffeeDialog';

const Coffee = () => {
    const { addToCart } = useCart(); 
    const MotionCard = motion(Card);

    const [products, setProducts] = useState(productsData);

    const [activeStates, setActiveStates] = useState(
        products.reduce((acc, product) => {
            acc[product.title] = true; 
            return acc;
        }, {})
    );

    const [openDialog, setOpenDialog] = useState(false);

    const handleToggle = (title) => {
        setActiveStates((prev) => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    const handleAddCoffee = (newCoffee) => {
        setProducts([...products, newCoffee]);
        setActiveStates((prev) => ({ ...prev, [newCoffee.title]: true }));
    };

    return (
        <Box sx={{ my: '5rem' }} id="coffee">
            <Typography variant="h5" sx={{ textAlign: 'center', fontFamily: "Eagle Lake" }}>
                Featured Coffees
            </Typography>
            <Grid container spacing={3} sx={{ padding: 3, justifyContent: 'center', fontFamily: "Droid Sans" }}>
                {products.map((product) => {
                    const isActive = activeStates[product.title];
                    return (
                        <Grid item xs={12} sm={6} md={4} key={product.title}>
                            <MotionCard>
                                <Card
                                    sx={{
                                        maxWidth: 345,
                                        textAlign: "center",
                                        padding: 2,
                                        border: "2px solid transparent",
                                        transition: "border-color 0.3s",
                                        "&:hover": { borderColor: "primary.main" },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={product.image}
                                        alt={product.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{product.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>

                                        <Box sx={{ minHeight: 70, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            {isActive && (
                                                <Stack direction="row" spacing={1} useFlexGap justifyContent="center">
                                                    <Typography variant="h6" color="primary">
                                                        ${product.price.toFixed(2)}
                                                    </Typography>
                                                    <Button variant="contained" color="secondary" onClick={() => addToCart(product)}>
                                                        Buy Now
                                                    </Button>
                                                </Stack>
                                            )}
                                        </Box>

                                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <Stack direction="row" spacing={1} useFlexGap justifyContent="center">
                                                <Chip size="small" label={isActive ? 'Active' : 'Out of Stock'} color={isActive ? 'success' : 'default'} />
                                                <Rating defaultValue={4} size="small" />
                                            </Stack>
                                            <Box sx={{ flexGrow: 1 }} />
                                            <Switch checked={isActive} onChange={() => handleToggle(product.title)} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </MotionCard>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Floating Action Button */}
            <Fab 
                color="primary" 
                aria-label="add" 
                onClick={() => setOpenDialog(true)} 
                size='medium'
                sx={{ position: 'fixed', bottom: 32, right: 32 }}
            >
                <AddIcon />
            </Fab>

            {/* Dialog */}
            <AddCoffeeDialog 
                open={openDialog} 
                onClose={() => setOpenDialog(false)} 
                onAdd={handleAddCoffee} 
            />
        </Box>
    );
};

export default Coffee;
