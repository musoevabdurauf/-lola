import './delivery.css'

const Delivery = () => {
  return (
    <div className="delivery">
      <div className="delivery-container">
        <h1 className="delivery-title">Доставка и оплата</h1>
        
        <div className="delivery-sections">
          <section className="delivery-section">
            <h2 className="section-title">🚚 Условия доставки</h2>
            <div className="delivery-info-card">
              <div className="info-item">
                <h3 className="info-title">По Душанбе</h3>
                <p className="info-text">Бесплатная доставка при заказе от 500 сомони</p>
                <p className="info-price">До 500 сомони - 30 сомони</p>
              </div>
              <div className="info-item">
                <h3 className="info-title">Время доставки</h3>
                <p className="info-text">Доставка в течение 2-3 часов</p>
                <p className="info-text">Срочная доставка - 1 час (+20 сомони)</p>
              </div>
              <div className="info-item">
                <h3 className="info-title">Режим работы</h3>
                <p className="info-text">Ежедневно с 9:00 до 21:00</p>
              </div>
            </div>
          </section>

          <section className="delivery-section">
            <h2 className="section-title">💳 Способы оплаты</h2>
            <div className="payment-methods">
              <div className="payment-card">
                <div className="payment-icon">💵</div>
                <h3 className="payment-title">Наличными</h3>
                <p className="payment-desc">Оплата курьеру при получении</p>
              </div>
              <div className="payment-card">
                <div className="payment-icon">📱</div>
                <h3 className="payment-title">Перевод</h3>
                <p className="payment-desc">Перевод на номер телефона</p>
              </div>
              <div className="payment-card">
                <div className="payment-icon">💳</div>
                <h3 className="payment-title">Карта</h3>
                <p className="payment-desc">Оплата банковской картой</p>
              </div>
            </div>
          </section>

          <section className="delivery-section">
            <h2 className="section-title">📸 Фото перед отправкой</h2>
            <div className="photo-service">
              <p className="photo-text">
                Мы отправим вам фото готового букета в WhatsApp перед доставкой, 
                чтобы вы были уверены в качестве заказа.
              </p>
              <a href="tel:+992750545471" className="contact-button">
                📞 Связаться с нами
              </a>
            </div>
          </section>

          <section className="delivery-section">
            <h2 className="section-title">💝 Анонимная доставка</h2>
            <div className="anonymous-delivery">
              <p className="anonymous-text">
                Сделаем сюрприз получателю! Курьер передаст букет без указания отправителя,
                если вы хотите сохранить тайну.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Delivery
