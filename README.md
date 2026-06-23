# ☕ CuppaCart - React Coffee Shop

A sleek and interactive React-based coffee shop application where users can browse featured coffees, add them to the cart, manage their orders, and make payments using UPI or Card.  
Built with **React**, **Material-UI**, and **React Context API** for global state management.

---

## 🚀 Features

### 🛍️ Core Functionality
- **Coffee Listing** – Display featured coffees with images, descriptions, and prices.
- **Add to Cart** – “Buy Now” adds selected coffee to the shopping cart.
- **Orders Page** – View and manage all items added to the cart.
- **Quantity Control** – Increase or decrease coffee quantity in the order list.
- **Remove Items** – Remove selected coffees from the cart.
- **Live Cart Badge** – Navbar shows real-time cart item count.
- **Responsive UI** – Fully mobile-friendly layout using MUI Grid system.

---

### 💳 Payment & Checkout
- **Order Submission** – Click **Submit Order** to proceed to checkout.
- **Accordion-style Payment Page** – Choose between:
  - 💸 **UPI Payment** – Enter UPI ID and confirm payment.
  - 💳 **Card Payment** – Enter card details (number, expiry, CVV).
- **Dynamic Total** – Payment page shows live total amount.
- **Order Success Flow** – Clears cart and redirects to home after payment.

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

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | **React (CRA)** |
| UI Library | **Material-UI (MUI)** |
| State Management | **React Context API** |
| Routing | **React Router DOM** |
| Charts | **@mui/x-charts** |
| Data Table | **@mui/x-data-grid** |
| Language | **JavaScript (ES6+)** |

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/CuppaCart.git
cd CuppaCart

```

2. Install dependencies:

```bash
npm install

```

3. Start the development server:

```bash
npm start
```
