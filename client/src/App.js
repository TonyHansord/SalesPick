import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SideNav from './components/SideNav';
import HomeView from './components/HomeView';
import OrderList from './components/Orders/OrderList';
import ProductList from './components/Products/ProductList';
import CustomerList from './components/Customers/CustomerList';

function App() {
  const [userRole, setUserRole] = useState('admin');

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
    section.viewableToRole.includes(userRole)
  );

  return (
    <div className="App">
      {/* Sidebar */}
      <SideNav sections={viewableSections} />
      <Routes>
        <Route path="/" element={<HomeView sections={viewableSections} />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/users" element={<HomeView />} />
      </Routes>
    </div>
  );
}

export default App;
