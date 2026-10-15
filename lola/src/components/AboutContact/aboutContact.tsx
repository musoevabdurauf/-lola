import './aboutContact.css'

interface ContactItem {
  icon: string
  label: string
  value: string
  href?: string
}

const AboutContact = () => {
  const contacts: ContactItem[] = [
    {
      icon: '📞',
      label: 'Телефон',
      value: '+992 750 545 471',
      href: 'tel:+992750545471'
    },
    {
      icon: '📍',
      label: 'Адрес',
      value: 'г. Душанбе'
    },
    {
      icon: '⏰',
      label: 'Время работы',
      value: 'Ежедневно 9:00 - 21:00'
    }
  ]

  return (
    <section className="about-section contact-section">
      <div className="section-header">
        <span className="section-badge">📞 Контакты</span>
        <h2 className="section-title">Свяжитесь с нами</h2>
      </div>
      <div className="contact-info">
        {contacts.map((contact, index) => (
          <div key={index} className="contact-item" style={{ animationDelay: `${index * 0.1}s` }}>
            <span className="contact-icon">{contact.icon}</span>
            <div className="contact-details">
              <p className="contact-label">{contact.label}</p>
              {contact.href ? (
                <a href={contact.href} className="contact-value">{contact.value}</a>
              ) : (
                <p className="contact-value">{contact.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AboutContact
