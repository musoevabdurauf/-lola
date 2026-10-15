import { Link } from 'react-router-dom'
import './occasions.css'

interface Occasion {
  name: string
  description: string
  icon: string
}

const Occasions = () => {
  const occasions: Occasion[] = [
    { name: 'Любимой / любимому', description: 'Романтические букеты', icon: '💕' },
    { name: 'Маме', description: 'Нежные букеты на День мамы', icon: '🌸' },
    { name: 'На свадьбу', description: 'Букеты невесты и оформление', icon: '💒' },
    { name: 'На день рождения', description: 'Яркие и праздничные', icon: '🎉' }
  ]

  return (
    <section className="occasions-section">
      <div className="occasions-container">
        <div className="occasions-header">
          <span className="occasions-badge">🎁 Поводы</span>
          <h2 className="occasions-title">На все случаи жизни</h2>
          <p className="occasions-subtitle">Идеальный букет для любого праздника</p>
        </div>

        <div className="occasions-grid">
          {occasions.map((occasion, index) => (
            <Link 
              key={index} 
              to="/catalog" 
              className="occasion-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="occasion-icon-wrapper">
                <span className="occasion-icon">{occasion.icon}</span>
              </div>
              <h3 className="occasion-name">{occasion.name}</h3>
              <p className="occasion-desc">{occasion.description}</p>
              <div className="occasion-arrow">→</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Occasions
