import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SideNav from './components/SideNav';
import HomeView from './components/HomeView';

function App() {
  return (
    <div className="App">
      {/* Sidebar */}
      <SideNav />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/orders" element={<HomeView />} />
        <Route path="/products" element={<HomeView />} />
        <Route path="/customers" element={<HomeView />} />
        <Route path="/users" element={<HomeView />} />
      </Routes>
    </div>
  );
}

export default App;
