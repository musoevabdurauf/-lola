import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard/productcard'
import Api from '../../services/Api'
import './home.css'

const Home = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await Api.getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const featuredProducts = products.slice(0, 4)

  if (loading) {
    return <div className="home">Загрузка...</div>
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Букеты, которые радуют каждого</h1>
          <p>Свежие цветы от наших флористов. Фото перед отправкой, анонимная доставка.</p>
          <Link to="/catalog" className="hero-button">Смотреть каталог</Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Что заказывают чаще всего</h2>
          <Link to="/catalog" className="view-all">Смотреть все →</Link>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              badge={product.badge}
              isNew={product.isNew}
              isHit={product.isHit}
              image={product.image}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Что ищете сегодня?</h2>
        <div className="categories-grid">
          <Link to="/catalog/bukety" className="category-card">
            <div className="category-icon">💐</div>
            <h3 className="category-name">Букеты</h3>
            <span className="category-count">24 товара</span>
          </Link>
          <Link to="/catalog/rozy" className="category-card">
            <div className="category-icon">🌹</div>
            <h3 className="category-name">Розы</h3>
            <span className="category-count">14 товаров</span>
          </Link>
          <Link to="/catalog/tulpany" className="category-card">
            <div className="category-icon">🌷</div>
            <h3 className="category-name">Тюльпаны</h3>
            <span className="category-count">1 товар</span>
          </Link>
          <Link to="/catalog/kompozitsii" className="category-card">
            <div className="category-icon">🌸</div>
            <h3 className="category-name">Композиции</h3>
            <span className="category-count">4 товара</span>
          </Link>
          <Link to="/catalog/korziny" className="category-card">
            <div className="category-icon">🧺</div>
            <h3 className="category-name">Корзины</h3>
            <span className="category-count">8 товаров</span>
          </Link>
          <Link to="/catalog/svadebnye" className="category-card">
            <div className="category-icon">💒</div>
            <h3 className="category-name">Свадебные</h3>
            <span className="category-count">6 товаров</span>
          </Link>
        </div>
        <Link to="/catalog" className="view-all-center">Все категории →</Link>
      </section>

      {/* Occasions Section */}
      <section className="occasions-section">
        <h2 className="section-title">На все случаи жизни</h2>
        <div className="occasions-grid">
          <Link to="/catalog" className="occasion-card">
            <div className="occasion-icon">💕</div>
            <h3 className="occasion-name">Любимой / любимому</h3>
            <p className="occasion-desc">Романтические букеты</p>
          </Link>
          <Link to="/catalog" className="occasion-card">
            <div className="occasion-icon">👩</div>
            <h3 className="occasion-name">Маме</h3>
            <p className="occasion-desc">Нежные букеты на День мамы</p>
          </Link>
          <Link to="/catalog" className="occasion-card">
            <div className="occasion-icon">💒</div>
            <h3 className="occasion-name">На свадьбу</h3>
            <p className="occasion-desc">Букеты невесты и оформление</p>
          </Link>
          <Link to="/catalog" className="occasion-card">
            <div className="occasion-icon">🎂</div>
            <h3 className="occasion-name">На день рождения</h3>
            <p className="occasion-desc">Яркие и праздничные</p>
          </Link>
        </div>
      </section>

      {/* Trust Features Section */}
      <section className="trust-section">
        <h2 className="section-title">Большие обещания — короткие сроки</h2>
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon">🌸</div>
            <h3 className="trust-title">Свои флористы</h3>
            <p className="trust-desc">Каждый букет собирают наши флористы вручную, в нашей студии в Душанбе. Без подсохших цветов.</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">📸</div>
            <h3 className="trust-title">Фото перед отправкой</h3>
            <p className="trust-desc">Перед курьером отправляем фото букета вам в WhatsApp. Не нравится — пересоберём бесплатно, доставим вовремя.</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon">⚡</div>
            <h3 className="trust-title">Быстрая заявка</h3>
            <p className="trust-desc">После заявки менеджер свяжется в WhatsApp и подтвердит состав букета, адрес и удобный способ получения.</p>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="help-section">
        <h2 className="section-title">Не знаете, что выбрать?</h2>
        <div className="help-links">
          <Link to="/about" className="help-link">Покупателям</Link>
          <Link to="/catalog" className="help-link">Каталог</Link>
          <Link to="/contact" className="help-link">Контакты</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
