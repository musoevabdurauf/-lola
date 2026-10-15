import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Api from '../../services/Api'
import ProductImage from '../../components/ProductImage/productImage'
import ProductInfo from '../../components/ProductInfo/productInfo'
import ProductDetails from '../../components/ProductDetails/productDetails'
import QuantitySelector from '../../components/QuantitySelector/quantitySelector'
import OrderSection from '../../components/OrderSection/orderSection'
import DeliveryInfo from '../../components/DeliveryInfo/deliveryInfo'
import './productDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<{
    id: string
    name: string
    price: number
    badge?: string
    isNew?: boolean
    isHit?: boolean
    image?: string
    description: string
    composition: string
    height: string
    care: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const data = await Api.getProductById(id)
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
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
          <ProductImage
            image={product.image}
            badge={product.badge}
            isNew={product.isNew}
            isHit={product.isHit}
          />

          <div className="product-info-wrapper">
            <ProductInfo
              name={product.name}
              price={product.price}
              badge={product.badge}
              isNew={product.isNew}
              isHit={product.isHit}
              description={product.description}
            />

            <ProductDetails
              composition={product.composition}
              height={product.height}
              care={product.care}
            />

            <div className="product-actions">
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
              />

              <OrderSection totalPrice={totalPrice} />
            </div>

            <DeliveryInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
