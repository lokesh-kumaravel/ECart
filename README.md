# 🌟ECART
# 🛒 E-commerce MERN Application

An e-commerce web application built with the MERN stack (MongoDB, Express.js, React, and Node.js) that allows users to browse products, view details, add items to their cart, and proceed to checkout.

## 🌟 Features

- 🏠 **Homepage** - Display featured products and categories.
- 📄 **Product Listing Page** - Browse and filter available products.
- 🔍 **Product Detail Page** - View detailed information about a selected product.
- 🛒 **Shopping Cart** - Add items to the cart, view and adjust quantities.
- 💳 **Checkout Page** - Proceed with checkout and payment.
- ✅ **Payment Success / Failure Pages** - Show payment status after checkout.

## 🛠️ Tech Stack

- **Frontend**: React, Redux, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB (using Mongoose for ORM)
- **Authentication**: JWT (JSON Web Tokens) for secure access
- **Payment**: Mock payment processing

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **MongoDB** installed and running.

### 🧑‍💻 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/ecommerce-mern.git
   cd ECart
2. **cd backend**:
   ```bash
    npm install
3. cd ../frontend
   ```bash
    npm install
   
### ⚙️ Environment Setup & 💻 Installation

Create a `.env` file in the `backend` folder and add the following environment variables:

    ```bash
    # Environment variables
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

# Install dependencies for the backend
    ```bash
    cd backend
    npm install

# Install dependencies for the frontend
    ```bash
    cd ../frontend
    npm install

### ▶️ Running the Application

1. **Start MongoDB** (if not already running):
   ```bash
   mongod
2. **Start the backend server**:
   ```bash
   cd backend
   npm run dev
2. **Start the frontend server:**:
   ```bash
   cd frontend
   npm start


### 🗃️ Folder Structure
    ```bash
    ecommerce-mern
    ├── backend       # Node.js + Express API
    │   ├── config    # MongoDB configuration
    │   ├── controllers # API request handlers
    │   ├── models    # MongoDB data models (Product, User, Order)
    │   ├── routes    # Routes for each model
    │   ├── middleware # Authentication middleware
    │   └── server.js # Main Express app
    └── frontend      # React app
       ├── public    # Public assets and index.html
       ├── src
       │   ├── components  # React components
       │   ├── pages       # Page components (Homepage, ProductPage, etc.)
       │   ├── redux       # Redux actions and reducers
       │   └── App.js      # Main app component
       
### 🚀 Deployment
Build the frontend:

    ```bash
    cd frontend
    npm run build

## Deploy to a Cloud Provider

Consider using services like [Heroku](https://www.heroku.com/), [AWS](https://aws.amazon.com/), or [DigitalOcean](https://www.digitalocean.com/) for deployment.

### 📚 Additional Resources

- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)

### 📝 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.
