import './productCardSkeleton.css'

interface ProductCardSkeletonProps {
  count?: number
}

const ProductCardSkeleton = ({ count = 1 }: ProductCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div className="product-card-skeleton" key={index} aria-hidden="true">
          <div className="skeleton-block skeleton-image" />
          <div className="skeleton-body">
            <div className="skeleton-block skeleton-line skeleton-line-title" />
            <div className="skeleton-block skeleton-line skeleton-line-short" />
            <div className="skeleton-footer">
              <div className="skeleton-block skeleton-line skeleton-price" />
              <div className="skeleton-block skeleton-line skeleton-stock" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default ProductCardSkeleton
