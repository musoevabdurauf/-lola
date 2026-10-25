import { useState } from 'react'
import { ordersApi } from '../../services/OrdersApi'
import { CONTACT, formatPrice, whatsappLink } from '../../config'
import type { Order, Product } from '../../types'
import {
  AlertCircleIcon,
  CheckCircleIcon,
  PhoneIcon,
  WhatsAppIcon,
} from '../Icons/icons'
import './orderSection.css'

interface OrderSectionProps {
  product: Product
  quantity: number
}

const OrderSection = ({ product, quantity }: OrderSectionProps) => {
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null)
  const [whatsappUrl, setWhatsappUrl] = useState('')

  const stock = product.stock ?? 0
  const inStock = stock > 0
  const total = product.price * quantity

  const buildMessage = (order: Order) => {
    const lines = [
      'Здравствуйте! Хочу заказать букет на сайте Lola.',
      '',
      `Заказ №${order.id.slice(0, 8).toUpperCase()}`,
      `Букет: ${order.productName}`,
      `Количество: ${order.quantity} шт.`,
      `Сумма: ${formatPrice(order.total)}`,
      `Имя: ${order.customerName}`,
      `Телефон: ${order.customerPhone}`,
    ]

    if (order.comment) {
      lines.push(`Комментарий: ${order.comment}`)
    }

    lines.push('', 'Пожалуйста, подтвердите заказ.')
    return lines.join('\n')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return

    if (customerPhone.replace(/\D/g, '').length < 9) {
      setError('Укажите корректный номер телефона')
      return
    }

    setError(null)
    setSubmitting(true)

    const waWindow = window.open('', '_blank')

    try {
      const order = await ordersApi.createOrder({
        productId: product.id,
        quantity,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        comment: comment.trim(),
      })

      const url = whatsappLink(buildMessage(order))
      setCreatedOrder(order)
      setWhatsappUrl(url)

      if (waWindow) {
        waWindow.location.href = url
      }
    } catch (err) {
      waWindow?.close()
      setError(err instanceof Error ? err.message : 'Не удалось оформить заказ')
    } finally {
      setSubmitting(false)
    }
  }

  const resetOrder = () => {
    setCreatedOrder(null)
    setWhatsappUrl('')
    setError(null)
    setCustomerName('')
    setCustomerPhone('')
    setComment('')
  }

  if (createdOrder) {
    return (
      <section className="pd-order pd-order-success">
        <span className="pd-success-icon"><CheckCircleIcon size={34} /></span>
        <h3>Заказ оформлен</h3>
        <p>
          Заказ <strong>№{createdOrder.id.slice(0, 8).toUpperCase()}</strong> на сумму{' '}
          <strong>{formatPrice(createdOrder.total)}</strong> сохранён. Отправьте готовое
          сообщение в WhatsApp — менеджер подтвердит детали и время доставки.
        </p>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="pd-submit">
          <WhatsAppIcon size={20} />
          Открыть WhatsApp
        </a>
        <button type="button" className="pd-order-again" onClick={resetOrder}>
          Оформить ещё один заказ
        </button>
      </section>
    )
  }

  return (
    <section className="pd-order">
      <div className="pd-order-head">
        <h3>Оформление заказа</h3>
        <div className="pd-order-total">
          <span>Итого</span>
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>

      <form className="pd-form" onSubmit={handleSubmit}>
        <div className="pd-form-row">
          <label className="pd-field">
            <span>Ваше имя</span>
            <input
              type="text"
              className="pd-input"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Как к вам обращаться"
              autoComplete="name"
              maxLength={100}
              required
            />
          </label>
          <label className="pd-field">
            <span>Телефон</span>
            <input
              type="tel"
              className="pd-input"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+992 __ ___ __ __"
              autoComplete="tel"
              maxLength={30}
              required
            />
          </label>
        </div>

        <label className="pd-field">
          <span>Комментарий <em>необязательно</em></span>
          <textarea
            className="pd-input pd-textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Адрес доставки, время, текст открытки…"
            rows={2}
            maxLength={500}
          />
        </label>

        {!inStock && (
          <p className="pd-order-unavailable">
            <AlertCircleIcon size={17} />
            Этого букета сейчас нет в наличии. Позвоните нам — подберём похожий.
          </p>
        )}

        {error && (
          <p className="pd-order-error">
            <AlertCircleIcon size={17} />
            {error}
          </p>
        )}

        <button type="submit" className="pd-submit" disabled={submitting || !inStock}>
          {submitting ? (
            <>
              <span className="pd-submit-spinner" aria-hidden="true" />
              Оформляем заказ…
            </>
          ) : (
            <>
              <WhatsAppIcon size={20} />
              Заказать в WhatsApp
            </>
          )}
        </button>

        <p className="pd-order-note">
          Заказ сохранится у нас, а WhatsApp откроется с готовым сообщением. Или позвоните:
          {' '}
          <a href={CONTACT.phoneHref}>
            <PhoneIcon size={13} />
            {CONTACT.phoneDisplay}
          </a>
        </p>
      </form>
    </section>
  )
}

export default OrderSection
