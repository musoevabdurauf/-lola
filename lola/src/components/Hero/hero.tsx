import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './hero.css'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1563241527-2304dd1360e8?w=800',
      title: 'Букеты, которые радуют каждого',
      description: 'Свежие цветы от наших флористов. Фото перед отправкой, анонимная доставка.'
    },
    {
      image: 'https://images.unsplash.com/photo-1592398543599-3e8953e8c7d7?w=800',
      title: 'Розы для особенных моментов',
      description: 'Идеальный подарок для выражения ваших чувств. Доставка по Душанбе за 2-3 часа.'
    },
    {
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800',
      title: 'Свадебные букеты',
      description: 'Создадим уникальный букет для вашего особенного дня. Индивидуальный подход.'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">{slides[currentSlide].title}</h1>
          <p className="hero-description">{slides[currentSlide].description}</p>
          <Link to="/catalog" className="hero-button">Смотреть каталог</Link>
        </div>
        
        <div className="hero-slider">
          <div className="slider-container">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
              >
                <img src={slide.image} alt={slide.title} className="slide-image" />
              </div>
            ))}
            
            <button className="slider-button prev" onClick={prevSlide}>
              ‹
            </button>
            <button className="slider-button next" onClick={nextSlide}>
              ›
            </button>
            
            <div className="slider-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
