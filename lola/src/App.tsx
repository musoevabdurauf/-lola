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
import AdminOrders from './pages/AdminOrders/adminOrders';
import AdminSlides from './pages/AdminSlides/adminSlides';
import AdminCategories from './pages/AdminCategories/adminCategories';
import ScrollToTop from './components/ScrollToTop/scrollToTop';
import NotFound from './pages/NotFound/notFound';
import Delivery from './pages/Delivery/delivery';
import Contact from './pages/Contact/contact';
import Login from './pages/Login/login';

import './App.css';

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin routes - separate from main layout */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/slides" element={<AdminSlides />} />
        <Route path="/admin/categories" element={<AdminCategories />} />

        {/* Main app with Navbar and Footer */}
        <Route path="*" element={
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
                <Route path="/contact" element={<Contact />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Подвал сайта */}
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;