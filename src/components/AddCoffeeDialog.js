import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const AddCoffeeDialog = ({ open, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageFileName, setImageFileName] = useState('');

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFileName(file.name);
    }
  };

  const handleAdd = () => {
    onAdd({
      id: generateId(),
      title,
      description,
      price: parseFloat(price),
      image,
      itemsSold: 0,
    });
    onClose();
    setTitle('');
    setDescription('');
    setPrice('');
    setImage(null);
    setImageFileName('');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="add-coffee-dialog-title"
      PaperProps={{
        sx: {
          width: 420,
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: 2,
          p: 2,
        },
      }}
    >
      <DialogTitle id="add-coffee-dialog-title" sx={{ textAlign: 'center', mb: 1 }}>
        Add New Coffee
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
            required
            inputProps={{ 'aria-required': true }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Price ($)"
            value={price}
            onChange={e => setPrice(e.target.value)}
            fullWidth
            required
            type="number"
            inputProps={{ 'aria-required': true, min: 0, step: 0.01 }}
          />

          {/* Image upload with preview */}
          <Box>
            <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} fullWidth>
              {imageFileName ? 'Change Image' : 'Upload Image'}
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            {image && (
              <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  component="img"
                  src={image}
                  alt="Preview"
                  sx={{
                    width: 80,
                    height: 56,
                    objectFit: 'cover',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
                <Typography variant="body2" color="text.secondary" noWrap sx={{ flex: 1 }}>
                  {imageFileName}
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAdd} variant="contained" color="primary" disabled={!title || !price}>
          Add Coffee
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddCoffeeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddCoffeeDialog;
