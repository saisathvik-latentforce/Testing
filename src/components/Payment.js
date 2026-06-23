import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { total, clearCart } = useCart();
  const navigate = useNavigate();
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleUPIPayment = () => {
    if (!upiId) {
      alert("Please enter your UPI ID.");
      return;
    }
    alert(`✅ UPI Payment of $${total.toFixed(2)} successful!`);
    clearCart();
    navigate("/");
  };

  const handleCardPayment = () => {
    if (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv) {
      alert("Please fill all card details.");
      return;
    }
    alert(`✅ Card Payment of $${total.toFixed(2)} successful!`);
    clearCart();
    navigate("/");
  };

  const handleScannerPayment = () => {
    alert(`✅ Scanner Payment of $${total.toFixed(2)} successful!`);
    clearCart();
    navigate("/");
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Payment Page
      </Typography>

      <Typography variant="h6" gutterBottom textAlign="center">
        Total Amount: ${total.toFixed(2)}
      </Typography>

      {/* 🧾 UPI Payment */}
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
            onChange={(e) => setUpiId(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUPIPayment}
          >
            Pay ₹{total.toFixed(2)} via UPI
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* 💳 Card Payment */}
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
            onChange={(e) =>
              setCardDetails({ ...cardDetails, cardNumber: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Expiry (MM/YY)"
              value={cardDetails.expiry}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, expiry: e.target.value })
              }
              sx={{ flex: 1 }}
            />
            <TextField
              label="CVV"
              value={cardDetails.cvv}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cvv: e.target.value })
              }
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
          >
            Pay ₹{total.toFixed(2)} via Card
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* 📷 Scanner Payment */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Pay via Scanner</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" mb={2}>
            Scan the QR code below to complete your payment
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
            <Box
              sx={{
                border: "2px solid",
                borderColor: "grey.400",
                borderRadius: 2,
                p: 3,
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <QrCode2Icon sx={{ fontSize: 120, color: "text.primary" }} />
              <Typography variant="caption" color="text.secondary">
                Amount: ₹{total.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleScannerPayment}
          >
            Scan Complete — Pay ₹{total.toFixed(2)}
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Payment;
