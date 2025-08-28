# ShopHub - Modern Ecommerce App

A comprehensive, production-ready ecommerce application built with React and Material UI. This app demonstrates modern web development practices with a focus on user experience, security, and scalability.

## 🚀 Features

### Authentication
- **User Registration & Login**: Secure authentication with form validation
- **Session Management**: Persistent login state with localStorage
- **Protected Routes**: Automatic redirection for unauthenticated users

### Product Management
- **Product Catalog**: Fetch products from FakeStoreAPI
- **Search & Filtering**: Real-time search with category and price filtering
- **Sorting Options**: Sort by price, name, rating, and more
- **Responsive Grid**: Beautiful product cards with images and details

### Shopping Cart
- **Add to Cart**: One-click product addition with quantity management
- **Cart Persistence**: Cart items saved in localStorage
- **Quantity Controls**: Increase/decrease item quantities
- **Real-time Updates**: Live price calculations and item counts

### Checkout Process
- **Multi-step Checkout**: Shipping → Payment → Review flow
- **Form Validation**: Comprehensive input validation with error handling
- **Payment Processing**: Realistic payment simulation with loading states
- **Order Confirmation**: Detailed order summary with next steps

### User Experience
- **Modern UI**: Material UI components with custom theming
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: User-friendly error messages and recovery
- **Success Feedback**: Toast notifications and confirmation messages

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **UI Framework**: Material UI (MUI) v5
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Yup validation
- **API**: FakeStoreAPI for product data

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navbar.jsx      # Main navigation component
├── contexts/           # React Context providers
│   ├── AuthContext.jsx # Authentication state management
│   └── CartContext.jsx # Shopping cart state management
├── pages/              # Page components
│   ├── Login.jsx       # User login page
│   ├── SignUp.jsx      # User registration page
│   ├── Products.jsx    # Product catalog page
│   ├── Cart.jsx        # Shopping cart page
│   ├── Checkout.jsx    # Checkout process page
│   └── OrderConfirmation.jsx # Order confirmation page
├── services/           # API and external services
│   └── api.js         # API client and endpoints
├── utils/              # Utility functions
├── App.jsx            # Main application component
└── main.jsx           # Application entry point
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://fakestoreapi.com
VITE_APP_NAME=ShopHub
```

### Customization
- **Theme**: Modify the theme object in `App.jsx` to customize colors, typography, and component styles
- **API**: Update the API base URL in `services/api.js` to use your own backend
- **Validation**: Adjust form validation rules in authentication and checkout components

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

## 🔒 Security Features

- **Input Validation**: Comprehensive form validation on client and server
- **XSS Protection**: Sanitized user inputs and secure rendering
- **CSRF Protection**: Token-based request validation (implement in backend)
- **Secure Storage**: Sensitive data handling with proper encryption
- **Error Boundaries**: Graceful error handling without exposing sensitive information

## 📱 Responsive Design

The app is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Product browsing and search
- [ ] Add/remove items from cart
- [ ] Checkout process completion
- [ ] Responsive design on different screen sizes
- [ ] Error handling and validation
- [ ] Loading states and user feedback

### Automated Testing (Future Enhancement)
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

## 🔄 API Integration

### Current API (FakeStoreAPI)
- **Base URL**: `https://fakestoreapi.com`
- **Endpoints**:
  - `GET /products` - Fetch all products
  - `GET /products/categories` - Fetch product categories
  - `GET /products/{id}` - Fetch single product

### Custom Backend Integration
To integrate with your own backend:

1. Update `services/api.js` with your API endpoints
2. Modify authentication logic in `contexts/AuthContext.jsx`
3. Update payment processing in `services/api.js`
4. Configure CORS and security headers on your backend

## 🎨 Customization

### Theming
The app uses Material UI's theming system. Customize the theme in `App.jsx`:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#your-primary-color',
    },
    secondary: {
      main: '#your-secondary-color',
    },
  },
  // Add more customizations
});
```

### Styling
- Use Material UI's `sx` prop for component-specific styling
- Create custom components in the `components/` directory
- Override Material UI component styles using theme customization

## 🐛 Troubleshooting

### Common Issues

1. **API Errors**: Check network connectivity and API endpoint availability
2. **Build Errors**: Ensure all dependencies are installed correctly
3. **Styling Issues**: Verify Material UI theme configuration
4. **Routing Problems**: Check React Router configuration and route definitions

### Debug Mode
Enable debug logging by setting:
```javascript
localStorage.setItem('debug', 'true');
```

## 📈 Performance Optimization

- **Code Splitting**: Implemented with React Router
- **Lazy Loading**: Images and components loaded on demand
- **Caching**: API responses cached in localStorage
- **Bundle Optimization**: Vite for fast development and optimized builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@shophub.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

---

**Built with ❤️ using React and Material UI**
# ecom-app
