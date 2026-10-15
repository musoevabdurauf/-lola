import ProductCard from '../ProductCard/productcard'
import './favoriteGrid.css'

interface Product {
  id: string
  name: string
  price: number
  badge: string
  isNew: boolean
  isHit: boolean
  image?: string
}

interface FavoriteGridProps {
  products: Product[]
}

const FavoriteGrid = ({ products }: FavoriteGridProps) => {
  return (
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
  )
}

export default FavoriteGrid
