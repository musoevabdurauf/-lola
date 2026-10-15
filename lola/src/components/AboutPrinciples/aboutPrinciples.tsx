import './aboutPrinciples.css'

interface Principle {
  number: string
  title: string
  description: string
}

const AboutPrinciples = () => {
  const principles: Principle[] = [
    {
      number: '01',
      title: 'Свежесть гарантирована',
      description: 'Мы работаем только со свежими цветами. Каждый букет проверяется перед отправкой.'
    },
    {
      number: '02',
      title: 'Индивидуальный подход',
      description: 'Мы можем собрать букет по вашему описанию или фотографии.'
    },
    {
      number: '03',
      title: 'Качество сервиса',
      description: 'Наши менеджеры всегда на связи и готовы помочь с выбором.'
    }
  ]

  return (
    <section className="about-section">
      <div className="section-header">
        <span className="section-badge">🎯 Принципы</span>
        <h2 className="section-title">Наши принципы</h2>
      </div>
      <div className="principles-list">
        {principles.map((principle, index) => (
          <div key={index} className="principle-item" style={{ animationDelay: `${index * 0.15}s` }}>
            <span className="principle-number">{principle.number}</span>
            <div className="principle-content">
              <h3 className="principle-title">{principle.title}</h3>
              <p className="principle-text">{principle.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AboutPrinciples
