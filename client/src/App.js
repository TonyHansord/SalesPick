import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SideNav from './components/SideNav';
import HomeView from './components/HomeView';
import OrderList from './components/Orders/OrderList';
import ProductList from './components/Products/ProductList';
import CustomerList from './components/Customers/CustomerList';
import LoginView from './components/Users/LoginView';
import UserManagement from './components/Users/UserManagement';
import CustomerView from './components/Customers/CustomerView';
import UserView from './components/Users/UserView';
import PickView from './components/Orders/PickView';
import SalesView from './components/Orders/SalesView';
import ProductView from './components/Products/ProductView';
import * as Icon from 'react-bootstrap-icons';
import MessageBar from './components/Utilities/MessageBar';

export const MessageContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [message, setMessage] = useState('');
  const [showMessageBar, setShowMessageBar] = useState(false);
  const [messageType, setMessageType] = useState('success');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.username) {
          setUser(data);
          setIsLoggedIn(true);
        } else {
          setUser('');
          setIsLoggedIn(false);
          navigate('/login');
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayMessage = (message, type) => {
    setMessage(message);
    setMessageType(type);
    setShowMessageBar(true);
  };

  const sections = [
    {
      title: 'Home',
      url: '/',
      viewableToRole: ['admin', 'sales', 'warehouse'],
      icon: <Icon.HouseFill />,
    },
    {
      title: 'Customers',
      url: '/customers',
      viewableToRole: ['admin', 'sales'],
      icon: <Icon.PeopleFill />,
    },
    {
      title: 'Orders',
      url: '/orders',
      viewableToRole: ['admin', 'sales', 'warehouse'],
      icon: <Icon.Cart />,
    },
    {
      title: 'Picking',
      url: '/picking',
      viewableToRole: ['admin', 'warehouse'],
      icon: <Icon.Box />,
    },
    {
      title: 'Products',
      url: '/products',
      viewableToRole: ['admin', 'sales', 'warehouse'],
      icon: <Icon.CollectionFill />,
    },
    {
      title: 'User Management',
      url: '/users',
      viewableToRole: ['admin'],
      icon: <Icon.Person />,
    },
  ];
  console.log(sections);

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
            setUser={setUser}
          />
          <MessageContext.Provider
            value={{
              message,
              showMessageBar,
              setShowMessageBar,
              messageType,
              displayMessage,
            }}
          >
            <div className="main-view">
              <MessageBar
                message={message}
                showMessageBar={showMessageBar}
                setShowMessageBar={setShowMessageBar}
                messageType={messageType}
              />
              
              <Routes>
                <Route
                  path="/"
                  element={<HomeView sections={viewableSections} />}
                />
                <Route path="/orders" element={<OrderList action="sales" />} />
                <Route path="/orders/:id" element={<SalesView />} />
                <Route
                  path="/picking"
                  element={<OrderList action="picking" />}
                />
                <Route path="/picking/:id" element={<PickView />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductView />} />
                <Route
                  path="/customers"
                  element={
                    <CustomerList setSelectedCustomer={setSelectedCustomer} />
                  }
                />
                <Route
                  path="/customers/:customer_id"
                  element={
                    <CustomerView
                      user={user}
                      customerID={selectedCustomer.id}
                    />
                  }
                />
                <Route
                  path="/users"
                  element={<UserManagement />}
                />
                <Route path="/users/:id" element={<UserView />} />
              </Routes>
            </div>
          </MessageContext.Provider>
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
