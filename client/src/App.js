import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SideNav from './components/SideNav';
import HomeView from './components/HomeView';
import OrderList from './components/Orders/OrderList';
import ProductList from './components/Products/ProductList';
import CustomerList from './components/Customers/CustomerList';
import LoginView from './components/Users/LoginView';
import UserManagement from './components/Users/UserManagement';

function App() {
  const [user, setUser] = useState({
    name: '',
    role: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const sections = [
    {
      title: 'Home',
      url: '/',
      viewableToRole: ['admin', 'sales', 'warehouse'],
      iconName: 'home',
    },
    {
      title: 'Customers',
      url: '/customers',
      viewableToRole: ['admin', 'sales'],
      iconName: 'people',
    },
    {
      title: 'Orders',
      url: '/orders',
      viewableToRole: ['admin', 'sales', 'warehouse'],
      iconName: 'shop',
    },
    {
      title: 'Products',
      url: '/products',
      viewableToRole: ['admin', 'sales', 'warehouse'],
      iconName: 'box',
    },
    {
      title: 'User Management',
      url: '/users',
      viewableToRole: ['admin'],
      iconName: 'person',
    },
  ];

  const viewableSections = sections.filter((section) =>
    section.viewableToRole.includes(user.role)
  );

  return (
    <div className="App">
      {isLoggedIn ? ( // if logged in display the side nav and home view
        <>
          <SideNav
            sections={viewableSections}
            setIsLoggedIn={setIsLoggedIn}
            user={user}
          />
          <Routes>
            <Route
              path="/"
              element={<HomeView sections={viewableSections} />}
            />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/users" element={<UserManagement />} />
          </Routes>
        </>
      ) : (
        // if not logged in display the login page
        <Routes>
          <Route
            path="/login"
            element={
              <LoginView setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
