import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginHeader from './components/LoginHeader/loginHeader'
import LoginForm from './components/LoginForm/loginForm'
import LoginFooter from './components/LoginFooter/loginFooter'
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
          <LoginHeader />
          <LoginForm
            username={username}
            password={password}
            error={error}
            onUsernameChange={(e) => setUsername(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleSubmit}
          />
          <LoginFooter />
        </div>
      </div>
    </div>
  )
}

export default Login
