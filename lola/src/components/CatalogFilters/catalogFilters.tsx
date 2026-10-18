import './catalogFilters.css'

interface Category {
  id: string
  name: string
}

interface SortOption {
  id: string
  name: string
}

interface CatalogFiltersProps {
  category: string
  setCategory: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
  minPrice: string
  setMinPrice: (value: string) => void
  maxPrice: string
  setMaxPrice: (value: string) => void
  onApplyPriceFilter: () => void
}

const CatalogFilters = ({ category, setCategory, sortBy, setSortBy, minPrice, setMinPrice, maxPrice, setMaxPrice, onApplyPriceFilter }: CatalogFiltersProps) => {
  const categories: Category[] = [
    { id: 'all', name: 'Все' },
    { id: 'rozy', name: 'Розы' },
    { id: 'kustovye-rozy', name: 'Кустовые розы' },
    { id: 'tulpany', name: 'Тюльпаны' },
    { id: 'piony', name: 'Пионы' },
    { id: 'gortenziya', name: 'Гортензия' },
    { id: 'lilii', name: 'Лилии' },
    { id: 'gipsophila', name: 'Гипсофила' },
    { id: 'bukety', name: 'Букеты' },
    { id: 'korobki', name: 'Коробки' },
    { id: 'gorshki', name: 'Горшки' },
    { id: 'myagkie-igrushki', name: 'Мягкие игрушки' },
    { id: 'suveniry', name: 'Сувениры' },
    { id: 'lekarstvo', name: 'Лекарство для домашних цветов' },
  ]

  const sortOptions: SortOption[] = [
    { id: 'popular', name: 'По популярности' },
    { id: 'price-asc', name: 'Сначала дешевле' },
    { id: 'price-desc', name: 'Сначала дороже' },
    { id: 'new', name: 'Сначала новинки' },
  ]

  return (
    <aside className="catalog-filters">
      <div className="filter-section">
        <h3 className="filter-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          Категории
        </h3>
        <div className="filter-options">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-option ${category === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {category === cat.id && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
              {cat.name}
            </button>
          ))}
        </div>
      </div>


      <div className="filter-section">
        
        <h3 className="filter-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
          Сортировка
        </h3>
        <div className="filter-options filter-options-horizontal">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              className={`filter-option ${sortBy === option.id ? 'active' : ''}`}
              onClick={() => setSortBy(option.id)}
            >
              {sortBy === option.id && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
              {option.name}
            </button>
          ))}
        </div>
      
        <h3 className="filter-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
            <path d="M12 18V6"></path>
          </svg>
          Цена
        </h3>
        <div className="price-filter">
          <input 
            type="number" 
            placeholder="От" 
            className="price-input" 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="До" 
            className="price-input" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button className="apply-filter-btn" onClick={onApplyPriceFilter}>Применить</button>
      </div>
    </aside>
  )
}

export default CatalogFilters
