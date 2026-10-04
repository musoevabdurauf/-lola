import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import  Navbar  from './components/Navbar/navbar';
import  Footer  from './components/Footer/footer';

import Home  from './pages/Home/home';
import  Catalog  from './pages/Catalog/catalog';
import  ProductDetail  from './pages/ProductDetail/productdetail';
import  About  from './pages/About/about';
import  Favorite  from './pages/Favorite/favorite';
import Admin from './pages/Admin/admin';
import NotFound from './pages/NotFound/notFound';
import Delivery from './pages/Delivery/delivery';
import Login from './pages/Login/login';

import './App.css';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Верхнее меню навигации */}
        <Navbar />

        {/* Основные страницы */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Подвал сайта */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;