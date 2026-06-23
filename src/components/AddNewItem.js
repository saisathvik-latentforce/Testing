import React, { useState } from 'react'
import { Box, TextField, Typography, Button } from '@mui/material';
import theme from '../assets/theme';
import { useNavigate } from 'react-router-dom';


const AddNewItem = () => {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState('');
    const [image,setImage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log({ name, price, description, image });

        navigate('/');
    };


  return (
    <>
        <Box sx={{
            width: '400px',
            padding: 4,
            border: '2px solid',
            borderColor: theme.palette.primary.main,
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            boxShadow: 3,
        }}
        >
            <Typography variant="h5" sx={{ textAlign: 'center', mb: 2, fontFamily: "Eagle Lake" }}>
                Add New Item
            </Typography>
            <TextField label='Title' variant='outlined' fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Price" variant="outlined" fullWidth type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <TextField label="Description" variant="outlined" fullWidth multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button variant='contained' component='label'>
                Upload Image
                <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                />
            </Button>
            {image && <Typography variant="body2">{image.name}</Typography>}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Box>
    </>
  )
}

export default AddNewItem