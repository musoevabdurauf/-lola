import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { slidesApi } from '../../services/SlidesApi'
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '../Icons/icons'
import './hero.css'

interface Slide {
  id: number
  image: string
  title: string
  description: string
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const loadSlides = async () => {
      try {
        const data = await slidesApi.getSlides()
        if (!cancelled) {
          setSlides(data)
        }
      } catch (error) {
        console.error('Error fetching slides:', error)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadSlides()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 15000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (loading) {
    return (
      <section className="hero" aria-label="Загрузка баннера">
        <div className="hero-inner hero-inner-skeleton" aria-hidden="true">
          <div className="hero-content hero-content-skeleton">
            <div className="hero-skeleton-block hero-skeleton-title" />
            <div className="hero-skeleton-block hero-skeleton-line" />
            <div className="hero-skeleton-block hero-skeleton-line hero-skeleton-line-short" />
            <div className="hero-skeleton-block hero-skeleton-button" />
          </div>
        </div>
      </section>
    )
  }

  if (slides.length === 0) {
    return null
  }

  return (
    <section className="hero" aria-label="Слайдер">
      <div className="hero-inner">
        <div className="hero-background" aria-hidden="true">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={slide.image} alt="" className="hero-slide-image" />
            </div>
          ))}
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">{slides[currentSlide].title}</h1>
          <p className="hero-description">{slides[currentSlide].description}</p>
          <Link to="/catalog" className="hero-button">
            Смотреть каталог
            <ArrowRightIcon size={20} />
          </Link>
        </div>

        <div className="hero-controls">
          <div className="hero-dots">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Слайд ${index + 1}`}
              />
            ))}
          </div>
          <div className="hero-arrows">
            <button className="hero-arrow" onClick={prevSlide} aria-label="Предыдущий слайд">
              <ChevronLeftIcon size={22} />
            </button>
            <button className="hero-arrow" onClick={nextSlide} aria-label="Следующий слайд">
              <ChevronRightIcon size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
