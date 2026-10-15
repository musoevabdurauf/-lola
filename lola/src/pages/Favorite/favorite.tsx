import FavoriteHeader from '../../components/FavoriteHeader/favoriteHeader'
import FavoriteGrid from '../../components/FavoriteGrid/favoriteGrid'
import EmptyState from '../../components/EmptyState/emptyState'
import './favorite.css'

const Favorite = () => {
  // Mock data - replace with actual API call
  const favoriteProducts = [
    { id: '1', name: 'Сто одна алая страсть', price: 499, badge: 'Хит продаж', isHit: true, isNew: false },
    { id: '2', name: 'Небесная нежность', price: 1299, badge: 'Новинка', isNew: true, isHit: false },
    { id: '3', name: 'Ромашковое облако', price: 299, badge: 'Новинка', isNew: true, isHit: false },
  ]

  return (
    <div className="favorite">
      <FavoriteHeader />
      <div className="favorite-container">
        {favoriteProducts.length > 0 ? (
          <FavoriteGrid products={favoriteProducts} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

export default Favorite
