import './aboutHistory.css'

const AboutHistory = () => {
  return (
    <section className="about-section">
      <div className="section-header">
        <span className="section-badge">📖 История</span>
        <h2 className="section-title">Наша история</h2>
      </div>
      <div className="about-text-container">
        <p className="about-text">
          Lola — это сервис доставки цветов в Душанбе, который создан для того, чтобы делать людей счастливее. 
          Мы начинали как небольшая студия флористики и выросли в одну из ведущих служб доставки цветов в городе.
        </p>
        <p className="about-text">
          Наша миссия — дарить эмоции через цветы. Каждый букет собирается вручную нашими профессиональными флористами 
          с любовью и вниманием к каждой детали.
        </p>
      </div>
    </section>
  )
}

export default AboutHistory
