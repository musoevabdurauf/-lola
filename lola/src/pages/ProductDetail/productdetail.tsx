import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './productDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const API_URL = 'http://localhost:5000/api/products'

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/${id}`)
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    console.log('Added to cart:', product.id, quantity)
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const totalPrice = product ? (product.price * quantity).toLocaleString('ru-RU') : '0'

  if (loading) {
    return <div className="product-detail">Загрузка...</div>
  }

  if (!product) {
    return <div className="product-detail">Продукт не найден</div>
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <Link to="/catalog" className="back-link">← Вернуться в каталог</Link>
        
        <div className="product-content">
          {/* Product Image */}
          <div className="product-image-container">
            {product.badge && (
              <div className={`product-badge ${product.isHit ? 'hit' : ''} ${product.isNew ? 'new' : ''}`}>{product.badge}</div>
            )}
            <div 
              className="product-image"
              style={product.image ? { backgroundImage: `url(${product.image})` } : { background: 'linear-gradient(135deg, #FF6B9D, #C44569)' }}
            ></div>
          </div>

          {/* Product Info */}
          <div className="product-info-container">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-meta">
                {product.badge && (
                  <span className={`product-meta-badge ${product.isNew ? 'new' : ''} ${product.isHit ? 'hit' : ''}`}>{product.badge}</span>
                )}
              </div>
            </div>
            <p className="product-price">{product.price.toLocaleString('ru-RU')} с.</p>
            
            <div className="product-description">
              <h3 className="info-title">Описание</h3>
              <p className="description-text">{product.description}</p>
            </div>

            <div className="product-details">
              <div className="detail-item">
                <span className="detail-label">🌸 Состав:</span>
                <span className="detail-value">{product.composition}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">📏 Высота:</span>
                <span className="detail-value">{product.height}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">💧 Уход:</span>
                <span className="detail-value">{product.care}</span>
              </div>
            </div>

            <div className="product-actions">
              <div className="quantity-wrapper">
                <span className="quantity-label">Количество:</span>
                <div className="quantity-selector">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="order-wrapper">
                <div className="total-price">
                  <span className="total-label">Итого:</span>
                  <span className="total-amount">{totalPrice} с.</span>
                </div>
                <a href="tel:+992750545471" className="order-btn">
                  <span className="order-icon">📞</span>
                  Заказать
                </a>
              </div>
            </div>

            <div className="delivery-info">
              <div className="delivery-item">
                <span className="delivery-icon">🚚</span>
                <div className="delivery-text">
                  <p className="delivery-title">Быстрая доставка</p>
                  <p className="delivery-desc">Доставка по Душанбе за 2–3 часа</p>
                </div>
              </div>
              <div className="delivery-item">
                <span className="delivery-icon">📸</span>
                <div className="delivery-text">
                  <p className="delivery-title">Фото перед отправкой</p>
                  <p className="delivery-desc">Отправим фото букета в WhatsApp</p>
                </div>
              </div>
              <div className="delivery-item">
                <span className="delivery-icon">💝</span>
                <div className="delivery-text">
                  <p className="delivery-title">Анонимная доставка</p>
                  <p className="delivery-desc">Сделаем сюрприз получателю</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
