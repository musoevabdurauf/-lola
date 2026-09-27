import ProductCard from '../../components/ProductCard/productcard'
import './favorite.css'

const Favorite = () => {
  // Mock data - replace with actual API call
  const favoriteProducts = [
    { id: '1', name: 'Сто одна алая страсть', price: 499, badge: 'Хит продаж', isHit: true },
    { id: '2', name: 'Небесная нежность', price: 1299, badge: 'Новинка', isNew: true },
    { id: '3', name: 'Ромашковое облако', price: 299, badge: 'Новинка', isNew: true },
  ]

  return (
    <div className="favorite">
      <div className="favorite-header">
        <h1 className="favorite-title">Избранное</h1>
        <p className="favorite-subtitle">Ваши любимые букеты</p>
      </div>

      <div className="favorite-container">
        {favoriteProducts.length > 0 ? (
          <div className="products-grid">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                badge={product.badge}
                isNew={product.isNew}
                isHit={product.isHit}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">❤️</div>
            <h2 className="empty-title">У вас пока нет избранных букетов</h2>
            <p className="empty-description">
              Добавьте букеты в избранное, чтобы не потерять их
            </p>
            <a href="/catalog" className="empty-button">Перейти в каталог</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorite
