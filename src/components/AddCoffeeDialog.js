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
  Autocomplete,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const AddCoffeeDialog = ({ open, onClose, onAdd, vendors = [] }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [vendor, setVendor] = useState('');

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
      vendor: vendor.trim(),
    });
    onClose();
    setTitle('');
    setDescription('');
    setPrice('');
    setImage(null);
    setImageFileName('');
    setVendor('');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="add-coffee-dialog-title"
      PaperProps={{
        sx: {
          width: 420,
          borderRadius: 3,
          p: 2,
          boxShadow: t => `0 24px 60px -20px ${t.palette.primary.main}55`,
        },
      }}
    >
      <DialogTitle id="add-coffee-dialog-title" sx={{ textAlign: 'center', mb: 1 }}>
        Add New Coffee
      </DialogTitle>
      <Box sx={{ height: 3, mx: 3, mb: 1, borderRadius: 1, backgroundImage: t => `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.secondary.main})` }} />

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
          <Autocomplete
            freeSolo
            options={vendors}
            value={vendor}
            onChange={(_, newValue) => setVendor(newValue || '')}
            onInputChange={(_, newInputValue) => setVendor(newInputValue)}
            renderInput={params => (
              <TextField
                {...params}
                label="Vendor"
                required
                fullWidth
                inputProps={{ ...params.inputProps, 'aria-required': true }}
              />
            )}
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
        <Button
          onClick={handleAdd}
          variant="contained"
          color="primary"
          disabled={!title || !price || !vendor.trim()}
        >
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
  vendors: PropTypes.arrayOf(PropTypes.string),
};

export default AddCoffeeDialog;
