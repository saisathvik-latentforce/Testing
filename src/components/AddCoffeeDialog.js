import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack, Typography } from '@mui/material';
import theme from '../assets/theme';

const AddCoffeeDialog = ({ open, onClose, onAdd }) => {
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');
    const [image,setImage] = useState(null);

    const handleAdd = () => {
        const newCoffee = { title, description, price: parseFloat(price), image };
        onAdd(newCoffee);
        onClose();

        // Reset form
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
    };

    return (
        <Dialog open={open} onClose={onClose} 
            PaperProps={{ 
                sx: {
                    width: 400,
                    border: '2px solid',
                    borderColor: theme.palette.primary.main,
                    borderRadius: 2,
                    p: 3,
                }
            }} 
        >
            <DialogTitle sx={{ textAlign: 'center', mb: 1, fontFamily: "Eagle Lake" }}>Add New Coffee</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
                    <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={3} />
                    <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth type="number" />
                    <Button variant='contained' component='label'>
                        Upload Image
                        <input
                        type="file"
                        hidden
                        accept="image/*"
                        // onChange={(e) => setImage(e.target.files[0])}
                        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                        />
                    </Button>
                    {image && <Typography variant="body2">{image.name}</Typography>}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleAdd} variant="contained" color="primary" disabled={!title || !price} >Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCoffeeDialog;
