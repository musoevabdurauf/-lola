import ProductCard from '../ProductCard/productcard'
import './catalogGrid.css'

interface Product {
  id: string
  name: string
  price: number
  badge: string
  isNew: boolean
  isHit: boolean
  image?: string
}

interface CatalogGridProps {
  products: Product[]
}

const CatalogGrid = ({ products }: CatalogGridProps) => {
  return (
    <div className="catalog-content">
      <div className="products-grid">
        {products.map((product) => (
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
    </div>
  )
}

export default CatalogGrid
