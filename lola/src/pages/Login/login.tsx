import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Простая проверка (в реальном проекте это должно быть на сервере)
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true')
      navigate('/admin')
    } else {
      setError('Неверный логин или пароль')
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">🌸 Lola Admin</h1>
            <p className="login-subtitle">Войдите в админ панель</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="login-error">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="username">Логин</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логин"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
              />
            </div>

            <button type="submit" className="login-button">
              Войти
            </button>
          </form>

          <div className="login-footer">
            <p className="login-hint">
              Логин: <strong>admin</strong> | Пароль: <strong>admin123</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
