import axios from 'axios';
import attemptTracker from '../utils/attemptTracker';

// Base configuration for API calls
const API_BASE_URL = 'https://fakestoreapi.com';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    // console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // console.error('API Response Error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      // console.error('Error Status:', error.response.status);
      // console.error('Error Data:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      // console.error('No response received from server');
    } else {
      // Something else happened
      // console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Product API functions
export const productAPI = {
  // Fetch all products with optional category filter
  async getProducts(category = null) {
    try {
      const endpoint = category ? `/products/category/${category}` : '/products';
      const response = await apiClient.get(endpoint);
      
      // Transform the data to match our app's structure
      const products = response.data.map(product => ({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: {
          rate: product.rating?.rate || 0,
          count: product.rating?.count || 0,
        },
        stock: Math.floor(Math.random() * 50) + 10, // Generate random stock for demo
      }));
      
      return products;
    } catch (error) {
      // console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products. Please try again later.');
    }
  },

  // Fetch product categories
  async getCategories() {
    try {
      const response = await apiClient.get('/products/categories');
      return response.data;
    } catch (error) {
      // console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories. Please try again later.');
    }
  },

  // Fetch single product by ID
  async getProduct(id) {
    try {
      const response = await apiClient.get(`/products/${id}`);
      const product = response.data;
      
      // Transform the data to match our app's structure
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: {
          rate: product.rating?.rate || 0,
          count: product.rating?.count || 0,
        },
        stock: Math.floor(Math.random() * 50) + 10, // Generate random stock for demo
      };
    } catch (error) {
      // console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product details. Please try again later.');
    }
  },

  // Search products (client-side search since API doesn't support it)
  searchProducts(products, searchTerm) {
    if (!searchTerm.trim()) return products;
    
    const term = searchTerm.toLowerCase();
    return products.filter(product =>
      product.title.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  },

  // Filter products by category
  filterProductsByCategory(products, category) {
    if (!category || category === 'all') return products;
    return products.filter(product => product.category === category);
  },

  // Sort products
  sortProducts(products, sortBy) {
    const sortedProducts = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'name':
        return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      case 'rating':
        return sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return sortedProducts;
    }
  },
};

// Payment API functions (simulated) - implements fail/success pattern
export const paymentAPI = {
  // Simulate payment processing with realistic delays
  async processPayment(paymentData) {
    try {
      // Check if fail mode is enabled from navbar checkbox
      const failModeEnabled = attemptTracker.getFailMode();
      console.log(`Payment processing - Fail mode enabled: ${failModeEnabled}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate payment validation
      if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
        throw new Error('Please fill in all payment details');
      }
      
      if (paymentData.cardNumber.length < 16) {
        throw new Error('Please enter a valid card number');
      }
      
      if (paymentData.cvv.length < 3) {
        throw new Error('Please enter a valid CVV');
      }
      
      // Generate error based on checkbox flag in navbar
      if (failModeEnabled) {
        // Make a real API call that will fail
        await fetch('/api/payment/process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentData)
        });
        
        // If we reach here, the API call succeeded (which shouldn't happen), but we still want to fail
        throw new Error(`Payment processing failed. Please try again.`);
      }
      
      // Generate order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        success: true,
        orderId,
        transactionId: `TXN-${Date.now()}`,
        amount: paymentData.amount,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      // console.error('Payment processing error:', error);
      throw error;
    }
  },
};

export default apiClient;
