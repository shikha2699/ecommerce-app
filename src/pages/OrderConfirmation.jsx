import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Divider,
  Chip,
  Alert,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Receipt as ReceiptIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  ShoppingBag as ShoppingIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderDetails = location.state?.orderDetails;

  // Redirect if no order details
  if (!orderDetails) {
    navigate('/products');
    return null;
  }

  const { orderId, transactionId, items, shipping, totals, timestamp } = orderDetails;

  // Handle continue shopping - removed intentional error throwing
  const handleContinueShopping = () => {
    navigate('/products');
  };

  // Handle view order - removed intentional error throwing
  const handleViewOrder = () => {
    // In a real app, this would navigate to an order details page
    console.log('View order details:', orderId);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Success Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <CheckIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 600 }}>
          Thank You!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          Your order has been placed successfully
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Order #{orderId}
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {/* Order Details */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <ReceiptIcon color="primary" />
              Order Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Order ID
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {orderId}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Transaction ID
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {transactionId}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Order Date
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatDate(timestamp)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Payment Status
                </Typography>
                <Chip label="Paid" color="success" size="small" />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Shipping Address */}
            <Typography variant="h6" sx={{ mb: 2 }}>
              Shipping Address
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {shipping.firstName} {shipping.lastName}<br />
              {shipping.address}<br />
              {shipping.city}, {shipping.state} {shipping.zipCode}<br />
              {shipping.email} | {shipping.phone}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Order Items */}
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Items ({items.length})
            </Typography>
            {items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    marginRight: '16px',
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" fontWeight="medium">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Qty: {item.quantity} | ${item.price} each
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight="bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 3 }} />

            {/* Order Summary */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2">${totals.subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Shipping
              </Typography>
              <Typography variant="body2">
                {totals.shipping === 0 ? 'Free' : `$${totals.shipping.toFixed(2)}`}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Tax
              </Typography>
              <Typography variant="body2">${totals.tax.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">
                ${totals.total.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Next Steps */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              What's Next?
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Order Confirmation
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We've sent a confirmation email to {shipping.email}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReceiptIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Order Processing
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your order will be processed within 24 hours
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ShoppingIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    Shipping Updates
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You'll receive tracking information via email
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Button
              variant="outlined"
              fullWidth
              onClick={handleViewOrder}
              sx={{ mb: 2, textTransform: 'none' }}
            >
              View Order Details
            </Button>

            <Button
              variant="contained"
              fullWidth
              onClick={handleContinueShopping}
              startIcon={<HomeIcon />}
              sx={{ textTransform: 'none' }}
            >
              Continue Shopping
            </Button>
          </Paper>

          {/* Support Info */}
          <Alert severity="info">
            <Typography variant="body2">
              Need help? Contact our support team at{' '}
              <strong>support@shophub.com</strong> or call{' '}
              <strong>1-800-SHOPHUB</strong>
            </Typography>
          </Alert>
        </Grid>
      </Grid>


    </Container>
  );
};

export default OrderConfirmation;
