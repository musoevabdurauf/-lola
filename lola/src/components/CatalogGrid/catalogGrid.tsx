import type { Product } from '../../types'
import ProductCard from '../ProductCard/productcard'
import './catalogGrid.css'

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
            stock={product.stock}
          />
        ))}
      </div>
    </div>
  )
}

export default CatalogGrid
