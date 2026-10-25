import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Api from '../../services/Api'
import type { Product } from '../../types'
import ProductImage from '../../components/ProductImage/productImage'
import ProductInfo from '../../components/ProductInfo/productInfo'
import ProductDetails from '../../components/ProductDetails/productDetails'
import QuantitySelector from '../../components/QuantitySelector/quantitySelector'
import OrderSection from '../../components/OrderSection/orderSection'
import DeliveryInfo from '../../components/DeliveryInfo/deliveryInfo'
import { ArrowLeftIcon, ChevronRightIcon, FlowerIcon } from '../../components/Icons/icons'
import './productDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      return
    }

    let cancelled = false

    const loadProduct = async () => {
      try {
        const data = await Api.getProductById(id)
        if (!cancelled) {
          setProduct(data)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProduct()

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="product-detail">
        <div className="product-detail-container" aria-hidden="true">
          <div className="pd-skeleton pd-skeleton-breadcrumbs" />
          <div className="pd-content">
            <div className="pd-skeleton pd-skeleton-image" />
            <div className="pd-info">
              <div className="pd-skeleton pd-skeleton-line pd-skeleton-short" />
              <div className="pd-skeleton pd-skeleton-title" />
              <div className="pd-skeleton pd-skeleton-price" />
              <div className="pd-skeleton pd-skeleton-text" />
              <div className="pd-skeleton pd-skeleton-text pd-skeleton-text-short" />
              <div className="pd-skeleton pd-skeleton-specs" />
              <div className="pd-skeleton pd-skeleton-order" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!id || !product) {
    return (
      <div className="product-detail">
        <div className="product-detail-container">
          <div className="pd-error">
            <span className="pd-error-icon"><FlowerIcon size={42} /></span>
            <h1>Букет не найден</h1>
            <p>Возможно, он уже продан или ссылка устарела. Посмотрите другие букеты в каталоге.</p>
            <Link to="/catalog" className="pd-error-link">
              <ArrowLeftIcon size={17} />
              Вернуться в каталог
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const stock = product.stock ?? 0

  const handleQuantityChange = (delta: number) => {
    const next = quantity + delta
    setQuantity(Math.min(Math.max(1, next), Math.max(1, stock)))
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <nav className="pd-breadcrumbs" aria-label="Хлебные крошки">
          <Link to="/">Главная</Link>
          <ChevronRightIcon size={14} />
          <Link to="/catalog">Каталог</Link>
          <ChevronRightIcon size={14} />
          <span>{product.name}</span>
        </nav>

        <div className="pd-content">
          <ProductImage
            image={product.image}
            badge={product.badge}
            isNew={product.isNew}
            isHit={product.isHit}
            name={product.name}
          />

          <div className="pd-info">
            <ProductInfo
              name={product.name}
              price={product.price}
              badge={product.badge}
              isNew={product.isNew}
              isHit={product.isHit}
              description={product.description}
              stock={product.stock}
            />

            <ProductDetails
              composition={product.composition}
              height={product.height}
              care={product.care}
            />

            <div className="pd-purchase">
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                max={stock}
              />
              <OrderSection product={product} quantity={quantity} />
            </div>

            <DeliveryInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
