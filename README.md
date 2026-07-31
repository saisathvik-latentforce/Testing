# ☕ CuppaCart - React Coffee Shop

[![CI](https://github.com/your-username/Testing/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/Testing/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/your-username/Testing/branch/main/graph/badge.svg)](https://codecov.io/gh/your-username/Testing)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A sleek and interactive React-based coffee shop application where users can browse featured coffees, add them to the cart, manage their orders, and make payments using UPI or Card.

Built with **React**, **Material-UI**, and **React Context API** for global state management.

---

## 🚀 Features

### 🛍️ Core Functionality
- **Coffee Listing** – Display featured coffees with images, descriptions, and prices.
- **Add to Cart** – Inline quantity counter for direct quantity control from the home view.
- **Orders Page** – View and manage all items added to the cart.
- **Quantity Control** – Increase or decrease coffee quantity in the order list.
- **Remove Items** – Remove selected coffees from the cart.
- **Live Cart Badge** – Navbar shows real-time cart item count.
- **Responsive UI** – Fully mobile-friendly layout using MUI Grid system.
- **Add New Coffee** – Dialog to add custom coffees with image upload.

---

### 💳 Payment & Checkout
- **Order Submission** – Click **Submit Order** to proceed to checkout.
- **Accordion-style Payment Page** – Choose between:
  - 💸 **UPI Payment** – Enter UPI ID with validation.
  - 💳 **Card Payment** – Enter card details with validation (number, expiry, CVV).
  - 📱 **QR Code Scanner** – Scan and pay via QR code.
- **Dynamic Total** – Payment page shows live total amount.
- **Order Success Flow** – Clears cart and redirects to home after payment.
- **Input Validation** – Real-time validation for all payment fields.

---

### 📊 Coffee Analytics (Admin Dashboard)
- **Interactive Dashboard** – Visualize coffee performance.
- **DataGrid Table** – Displays sales data with filtering and selection.
- **Dynamic Stats Cards** – Shows:
  - Total Units Sold
  - Total Revenue
- **Bar Chart Visualization** – Compare items sold and revenue by coffee type.
- **Real-time Row Selection** – Filter analytics by selected coffee rows.

---

### 🛡️ Error Handling & Persistence
- **Error Boundary** – Graceful error handling with user-friendly fallback UI.
- **Cart Persistence** – Cart data persists in localStorage across sessions.
- **Form Validation** – Comprehensive validation for all user inputs.

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | **React 18** (CRA) |
| UI Library | **Material-UI (MUI) v7** |
| State Management | **React Context API** |
| Routing | **React Router DOM v7** |
| Charts | **@mui/x-charts** |
| Data Table | **@mui/x-data-grid** |
| Animation | **Motion** |
| Styling | **Styled Components** |
| Language | **JavaScript (ES6+)** |
| Testing | **Jest + React Testing Library** |
| Linting | **ESLint + Prettier** |

---

## ⚙️ Prerequisites

- **Node.js** >= 18.0.0 (we recommend using [nvm](https://github.com/nvm-sh/nvm))
- **npm** >= 9.0.0

---

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/Testing.git
cd Testing
```

2. Use the correct Node version:

```bash
nvm use
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

---

## 🧪 Testing

```bash
# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:coverage

# Run tests once (for CI)
npm run test:ci
```

---

## 📝 Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Check Prettier formatting
npm run format:check

# Format code with Prettier
npm run format
```

---

## 🏗️ Build

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

---

## 📁 Project Structure

```
cuppacart/
├── .github/              # GitHub templates and workflows
│   ├── workflows/        # CI/CD configurations
│   └── pull_request_template.md
├── .vscode/              # VS Code settings and extensions
├── public/               # Static assets
├── src/
│   ├── assets/          # Images, fonts, and data files
│   ├── components/      # React components
│   │   ├── AddCoffeeDialog.js
│   │   ├── CartContext.js
│   │   ├── Coffee.js
│   │   ├── CoffeeStats.js
│   │   ├── ErrorBoundary.js
│   │   ├── Hero.js
│   │   ├── Layout.js
│   │   ├── Navbar.js
│   │   ├── Order.js
│   │   └── Payment.js
│   ├── App.js           # Main application component
│   ├── index.js         # Application entry point
│   └── App.test.js      # Tests
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── .nvmrc               # Node version specification
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow our code style guidelines.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for the excellent component library
- [React](https://reactjs.org/) for the amazing frontend framework
- [Create React App](https://create-react-app.dev/) for the build tooling

---

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

Project Link: [https://github.com/your-username/Testing](https://github.com/your-username/Testing)

---

<p align="center">Made with ☕ and ❤️</p>
