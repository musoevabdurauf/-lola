import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ordersApi } from '../../services/OrdersApi'
import { clearAuthToken, isAuthenticated } from '../../services/http'
import { formatPrice } from '../../config'
import type { Order, OrderStatus } from '../../types'
import AdminNavbar from '../Admin/components/AdminNavbar/adminNavbar'
import {
  AlertCircleIcon,
  BanknoteIcon,
  CheckCircleIcon,
  ClipboardListIcon,
  MessageCircleIcon,
  RotateCcwIcon,
  SearchIcon,
  TrashIcon,
  TruckIcon,
  UserIcon,
  WhatsAppIcon,
} from '../../components/Icons/icons'
import '../Admin/admin.css'
import './adminOrders.css'

const STATUS_META: Record<OrderStatus, { label: string }> = {
  new: { label: 'Новый' },
  confirmed: { label: 'Подтверждён' },
  delivered: { label: 'Доставлен' },
  cancelled: { label: 'Отменён' },
}

const STATUS_TABS: Array<{ id: 'all' | OrderStatus; label: string }> = [
  { id: 'all', label: 'Все' },
  { id: 'new', label: 'Новые' },
  { id: 'confirmed', label: 'Подтверждённые' },
  { id: 'delivered', label: 'Доставленные' },
  { id: 'cancelled', label: 'Отменённые' },
]

const formatDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getPhoneDigits = (phone: string) => phone.replace(/\D/g, '')

const AdminOrders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeStatus, setActiveStatus] = useState<'all' | OrderStatus>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }

    let cancelled = false

    const loadOrders = async () => {
      try {
        const data = await ordersApi.getOrders()
        if (!cancelled) {
          setOrders(data)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadOrders()

    return () => {
      cancelled = true
    }
  }, [navigate])

  const handleLogout = () => {
    clearAuthToken()
    navigate('/login')
  }

  const refreshOrders = async () => {
    setRefreshing(true)
    try {
      const data = await ordersApi.getOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error refreshing orders:', error)
      showNotification('error', 'Не удалось обновить заказы')
    } finally {
      setRefreshing(false)
    }
  }

  const handleStatusChange = async (order: Order, status: OrderStatus) => {
    setUpdatingId(order.id)
    try {
      const updated = await ordersApi.updateStatus(order.id, status)
      setOrders((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
      showNotification('success', 'Статус заказа обновлён')
    } catch (error) {
      console.error('Error updating order status:', error)
      showNotification('error', 'Не удалось обновить статус')
    } finally {
      setUpdatingId(null)
    }
  }

  const confirmDelete = async () => {
    if (!orderToDelete) return

    setDeleting(true)
    try {
      await ordersApi.deleteOrder(orderToDelete.id)
      setOrders((prev) => prev.filter((item) => item.id !== orderToDelete.id))
      setOrderToDelete(null)
      showNotification('success', 'Заказ удалён')
    } catch (error) {
      console.error('Error deleting order:', error)
      showNotification('error', 'Не удалось удалить заказ')
    } finally {
      setDeleting(false)
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = activeStatus === 'all' || order.status === activeStatus
    const query = searchTerm.trim().toLowerCase()
    const matchesSearch = !query ||
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.customerPhone.includes(query) ||
      order.productName.toLowerCase().includes(query)
    return matchesStatus && matchesSearch
  })

  const getStatusCount = (status: 'all' | OrderStatus) => (
    status === 'all' ? orders.length : orders.filter((order) => order.status === status).length
  )

  const activeOrders = orders.filter((order) => order.status === 'new' || order.status === 'confirmed')
  const deliveredCount = orders.filter((order) => order.status === 'delivered').length
  const activeTotal = activeOrders.reduce((sum, order) => sum + order.total, 0)

  const stats = [
    { label: 'Новые заказы', value: getStatusCount('new'), Icon: ClipboardListIcon, color: '#FF6B9D' },
    { label: 'В работе', value: activeOrders.length, Icon: TruckIcon, color: '#F0A63A' },
    { label: 'Доставлено', value: deliveredCount, Icon: CheckCircleIcon, color: '#6BCB77' },
    { label: 'Сумма активных', value: formatPrice(activeTotal), Icon: BanknoteIcon, color: '#C44569' },
  ]

  if (loading) {
    return (
      <div className="admin">
        <AdminNavbar onLogout={handleLogout} />
        <div className="admin-content">
          <div className="loading-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-stats"></div>
            <div className="orders-skeleton-list">
              {[1, 2, 3].map((item) => (
                <div className="orders-skeleton-card" key={item}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin">
      <AdminNavbar onLogout={handleLogout} />
      <div className="admin-content">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Заказы клиентов</h1>
            <p className="admin-subtitle">Заказы, оформленные через сайт и WhatsApp</p>
          </div>
          <div className="admin-header-actions">
            <button className="admin-button admin-button-secondary" onClick={refreshOrders} disabled={refreshing}>
              <RotateCcwIcon size={17} />
              {refreshing ? 'Обновляем…' : 'Обновить'}
            </button>
          </div>
        </div>

        <div className="admin-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card" style={{ borderColor: stat.color }}>
              <div className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
                <stat.Icon size={24} />
              </div>
              <div className="stat-info">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="orders-toolbar">
          <div className="orders-tabs">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`orders-tab ${activeStatus === tab.id ? 'active' : ''}`}
                onClick={() => setActiveStatus(tab.id)}
              >
                {tab.label}
                <span className="orders-tab-count">{getStatusCount(tab.id)}</span>
              </button>
            ))}
          </div>
          <div className="search-wrapper orders-search">
            <SearchIcon size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Имя, телефон, товар или № заказа"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="empty-state orders-empty">
            <div className="empty-icon"><ClipboardListIcon size={46} /></div>
            <p className="empty-text">
              {orders.length === 0
                ? 'Заказов пока нет'
                : 'По выбранным фильтрам заказов не найдено'}
            </p>
            {orders.length === 0 && (
              <p className="orders-empty-hint">
                Они появятся здесь, как только клиент оформит заказ на странице букета.
              </p>
            )}
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => {
              const phoneDigits = getPhoneDigits(order.customerPhone)
              return (
                <article className={`order-card-admin order-status-${order.status}`} key={order.id}>
                  <div className="order-card-head">
                    <div className="order-id-block">
                      <span className="order-id">№{order.id.slice(0, 8).toUpperCase()}</span>
                      <span className="order-date">{formatDate(order.createdAt)}</span>
                    </div>
                    <select
                      className={`order-status-select status-${order.status}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order, e.target.value as OrderStatus)}
                      disabled={updatingId === order.id}
                      aria-label={`Статус заказа №${order.id.slice(0, 8).toUpperCase()}`}
                    >
                      {(Object.keys(STATUS_META) as OrderStatus[]).map((status) => (
                        <option key={status} value={status}>{STATUS_META[status].label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="order-card-content">
                    <div className="order-product">
                      {order.productImage ? (
                        <img src={order.productImage} alt={order.productName} className="order-product-image" />
                      ) : (
                        <span className="order-product-image placeholder">L</span>
                      )}
                      <div className="order-product-text">
                        <h3>{order.productName}</h3>
                        <p>{order.quantity} шт. × {formatPrice(order.price)}</p>
                      </div>
                    </div>

                    <div className="order-customer">
                      <span className="order-info-icon"><UserIcon size={17} /></span>
                      <div className="order-customer-text">
                        <span className="order-info-label">Клиент</span>
                        <strong>{order.customerName}</strong>
                        <a href={`tel:+${phoneDigits}`}>{order.customerPhone}</a>
                      </div>
                    </div>

                    <div className="order-total-block">
                      <span className="order-info-label">Сумма заказа</span>
                      <strong>{formatPrice(order.total)}</strong>
                    </div>
                  </div>

                  {order.comment && (
                    <p className="order-comment">
                      <MessageCircleIcon size={16} />
                      {order.comment}
                    </p>
                  )}

                  <div className="order-card-foot">
                    <span className={`order-status-badge status-${order.status}`}>
                      {STATUS_META[order.status].label}
                    </span>
                    <div className="order-actions">
                      <a
                        className="order-action whatsapp"
                        href={`https://wa.me/${phoneDigits}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon size={15} />
                        Написать
                      </a>
                      <button
                        type="button"
                        className="order-action danger"
                        onClick={() => setOrderToDelete(order)}
                      >
                        <TrashIcon size={15} />
                        Удалить
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>

      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.type === 'success'
            ? <CheckCircleIcon size={18} />
            : <AlertCircleIcon size={18} />}
          {notification.message}
        </div>
      )}

      {orderToDelete && (
        <div className="modal-overlay" onClick={() => setOrderToDelete(null)}>
          <div className="modal-content modal-delete" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Удалить заказ?</h2>
            <p className="delete-modal-text">
              Заказ №{orderToDelete.id.slice(0, 8).toUpperCase()} будет удалён без возможности восстановления.
            </p>
            <div className="modal-actions">
              <button type="button" onClick={() => setOrderToDelete(null)} disabled={deleting}>
                Отмена
              </button>
              <button type="button" className="btn-danger" onClick={confirmDelete} disabled={deleting}>
                {deleting ? 'Удаляем…' : 'Удалить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminOrders
