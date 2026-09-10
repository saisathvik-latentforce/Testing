import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useNavigate } from 'react-router-dom';

import { useCart } from './CartContext';

const validateUPI = upiId => /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(upiId);

const validateCardNumber = cardNumber => /^\d{13,19}$/.test(cardNumber.replace(/\s/g, ''));

const validateExpiry = expiry => {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) return false;
  const [month, year] = expiry.split('/');
  const now = new Date();
  const curYear = now.getFullYear() % 100;
  const curMonth = now.getMonth() + 1;
  const expYear = parseInt(year, 10);
  const expMonth = parseInt(month, 10);
  if (expYear < curYear) return false;
  if (expYear === curYear && expMonth < curMonth) return false;
  return true;
};

const validateCVV = cvv => /^\d{3,4}$/.test(cvv);

// Minimal 21×21 QR matrix
const QR_MATRIX = [
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
  [0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0],
  [1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
  [0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0],
];

const QRCode = ({ size = 168 }) => {
  const cellSize = size / 21;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ border: '8px solid #fff', borderRadius: 4, display: 'block' }}
      aria-label="Payment QR code"
    >
      <rect width={size} height={size} fill="#fff" />
      {QR_MATRIX.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#1a1a1a"
            />
          ) : null
        )
      )}
    </svg>
  );
};

QRCode.propTypes = { size: PropTypes.number };

const Payment = () => {
  const { total, clearCart, cart } = useCart();
  const navigate = useNavigate();

  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [cardErrors, setCardErrors] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [paying, setPaying] = useState(false);

  const goToSuccess = method => {
    clearCart();
    navigate('/payment-success', { state: { method, amount: total, items: cart } });
  };

  const simulatePay = (method, onSuccess) => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      onSuccess(method);
    }, 800);
  };

  const handleUPIChange = e => {
    const value = e.target.value;
    setUpiId(value);
    setUpiError(value && !validateUPI(value) ? 'Invalid UPI ID format (e.g., username@upi)' : '');
  };

  const handleCardNumberChange = e => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 19);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardDetails(p => ({ ...p, cardNumber: formatted }));
    setCardErrors(p => ({
      ...p,
      cardNumber:
        formatted && !validateCardNumber(formatted) ? 'Card number must be 13–19 digits' : '',
    }));
  };

  const handleExpiryChange = e => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2);
    setCardDetails(p => ({ ...p, expiry: value }));
    setCardErrors(p => ({
      ...p,
      expiry: value && !validateExpiry(value) ? 'Invalid expiry date (MM/YY)' : '',
    }));
  };

  const handleCVVChange = e => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardDetails(p => ({ ...p, cvv: value }));
    setCardErrors(p => ({
      ...p,
      cvv: value && !validateCVV(value) ? 'CVV must be 3–4 digits' : '',
    }));
  };

  const handleUPIPayment = () => {
    if (!upiId) {
      setUpiError('Please enter your UPI ID');
      return;
    }
    if (!validateUPI(upiId)) {
      setUpiError('Invalid UPI ID format');
      return;
    }
    simulatePay('UPI', goToSuccess);
  };

  const handleCardPayment = () => {
    const errors = {};
    if (!cardDetails.cardNumber) errors.cardNumber = 'Card number is required';
    else if (!validateCardNumber(cardDetails.cardNumber)) errors.cardNumber = 'Invalid card number';
    if (!cardDetails.expiry) errors.expiry = 'Expiry date is required';
    else if (!validateExpiry(cardDetails.expiry)) errors.expiry = 'Invalid or expired date';
    if (!cardDetails.cvv) errors.cvv = 'CVV is required';
    else if (!validateCVV(cardDetails.cvv)) errors.cvv = 'Invalid CVV';
    if (Object.keys(errors).length > 0) {
      setCardErrors(errors);
      return;
    }
    simulatePay('Card', goToSuccess);
  };

  const handleScannerPayment = () => simulatePay('QR Scanner', goToSuccess);

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Payment
      </Typography>
      <Typography variant="h6" gutterBottom textAlign="center" color="text.secondary">
        Total: ${total.toFixed(2)}
      </Typography>

      {/* UPI */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Pay via UPI</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" mb={1}>
            Enter your UPI ID (e.g., username@upi)
          </Typography>
          <TextField
            label="UPI ID"
            fullWidth
            value={upiId}
            onChange={handleUPIChange}
            error={!!upiError}
            helperText={upiError}
            disabled={paying}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUPIPayment}
            disabled={!!upiError || !upiId || paying}
            startIcon={paying ? <CircularProgress size={18} color="inherit" /> : null}
          >
            {paying ? 'Processing…' : `Pay $${total.toFixed(2)} via UPI`}
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* Card */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Pay via Card</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" mb={1}>
            Enter your card details below
          </Typography>
          <TextField
            label="Card Number"
            fullWidth
            value={cardDetails.cardNumber}
            onChange={handleCardNumberChange}
            error={!!cardErrors.cardNumber}
            helperText={cardErrors.cardNumber}
            placeholder="1234 5678 9012 3456"
            disabled={paying}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Expiry (MM/YY)"
              value={cardDetails.expiry}
              onChange={handleExpiryChange}
              error={!!cardErrors.expiry}
              helperText={cardErrors.expiry}
              placeholder="MM/YY"
              disabled={paying}
              sx={{ flex: 1 }}
            />
            <TextField
              label="CVV"
              value={cardDetails.cvv}
              onChange={handleCVVChange}
              error={!!cardErrors.cvv}
              helperText={cardErrors.cvv}
              placeholder="123"
              disabled={paying}
              sx={{ flex: 1 }}
              type="password"
            />
          </Box>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleCardPayment}
            disabled={!!cardErrors.cardNumber || !!cardErrors.expiry || !!cardErrors.cvv || paying}
            startIcon={paying ? <CircularProgress size={18} color="inherit" /> : null}
          >
            {paying ? 'Processing…' : `Pay $${total.toFixed(2)} via Card`}
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* QR Scanner */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <QrCodeScannerIcon fontSize="small" />
            <Typography variant="h6">Pay via Scanner</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" textAlign="center" mb={2}>
            Scan the QR code with any UPI app (GPay, PhonePe, Paytm…)
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 1,
              p: 2,
              borderRadius: 2,
              backgroundColor: 'background.paper',
              boxShadow: t => `0 10px 30px -12px ${t.palette.primary.main}40`,
              width: 'fit-content',
              mx: 'auto',
            }}
          >
            <QRCode size={168} />
          </Box>
          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            color="text.secondary"
            mb={2}
          >
            Amount: ${total.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="success"
            fullWidth
            startIcon={
              paying ? <CircularProgress size={18} color="inherit" /> : <QrCodeScannerIcon />
            }
            onClick={handleScannerPayment}
            disabled={paying}
          >
            {paying ? 'Processing…' : 'Payment Done'}
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Payment;
