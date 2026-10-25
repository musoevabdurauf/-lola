import { useState, useEffect } from 'react'
import { categoriesApi } from '../../services/CategoriesApi'
import {
  ArrowUpDownIcon,
  BanknoteIcon,
  CheckIcon,
  ChevronDownIcon,
  GridIcon,
  RotateCcwIcon,
  SparklesIcon,
} from '../Icons/icons'
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
  showHitOnly: boolean
  setShowHitOnly: (value: boolean) => void
  showNewOnly: boolean
  setShowNewOnly: (value: boolean) => void
  onReset: () => void
  resultCount: number
}

const CatalogFilters = ({
  category,
  setCategory,
  sortBy,
  setSortBy,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  showHitOnly,
  setShowHitOnly,
  showNewOnly,
  setShowNewOnly,
  onReset,
  resultCount,
}: CatalogFiltersProps) => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 'all', name: 'Все' }
  ])

  useEffect(() => {
    let cancelled = false

    const loadCategories = async () => {
      try {
        const data = await categoriesApi.getCategories()
        if (cancelled) {
          return
        }
        const transformedCategories = data.map((cat) => ({
          id: cat.path.split('/').pop() ?? String(cat.id),
          name: cat.name,
        }))
        setCategories([{ id: 'all', name: 'Все' }, ...transformedCategories])
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

  const sortOptions: SortOption[] = [
    { id: 'popular', name: 'По популярности' },
    { id: 'price-asc', name: 'Сначала дешевле' },
    { id: 'price-desc', name: 'Сначала дороже' },
    { id: 'new', name: 'Сначала новинки' },
  ]

  const hasActiveFilters =
    category !== 'all' ||
    showHitOnly ||
    showNewOnly ||
    Boolean(minPrice) ||
    Boolean(maxPrice) ||
    sortBy !== 'popular'

  return (
    <aside className="catalog-filters">
      <div className="filters-top">
        <div className="filters-heading">
          <span className="filters-heading-icon"><GridIcon size={18} /></span>
          <h3>Фильтры</h3>
          <span className="filters-count">{resultCount} товаров</span>
        </div>
        <button
          type="button"
          className="filters-reset"
          onClick={onReset}
          disabled={!hasActiveFilters}
        >
          <RotateCcwIcon size={15} />
          Сбросить
        </button>
      </div>

      <div className="filter-section">
        <div className="filter-options filter-options-scroll">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              className={`filter-option ${category === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
              aria-pressed={category === cat.id}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="filters-bottom">
        <div className="filter-group">
          <span className="filter-group-title">
            <SparklesIcon size={15} />
            Подборка
          </span>
          <div className="filter-toggles">
            <button
              type="button"
              className={`filter-toggle ${showHitOnly ? 'active' : ''}`}
              onClick={() => setShowHitOnly(!showHitOnly)}
              aria-pressed={showHitOnly}
            >
              {showHitOnly && <CheckIcon size={14} />}
              Хиты
            </button>
            <button
              type="button"
              className={`filter-toggle ${showNewOnly ? 'active' : ''}`}
              onClick={() => setShowNewOnly(!showNewOnly)}
              aria-pressed={showNewOnly}
            >
              {showNewOnly && <CheckIcon size={14} />}
              Новинки
            </button>
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-group-title">
            <ArrowUpDownIcon size={15} />
            Сортировка
          </span>
          <div className="select-wrap">
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Сортировка товаров"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
            <ChevronDownIcon size={16} className="select-arrow" />
          </div>
        </div>

        <div className="filter-group filter-group-price">
          <span className="filter-group-title">
            <BanknoteIcon size={15} />
            Цена, сомони
          </span>
          <div className="price-filter">
            <input
              type="number"
              min="0"
              placeholder="От"
              className="price-input"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              aria-label="Минимальная цена"
            />
            <span className="price-dash">—</span>
            <input
              type="number"
              min="0"
              placeholder="До"
              className="price-input"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              aria-label="Максимальная цена"
            />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default CatalogFilters
