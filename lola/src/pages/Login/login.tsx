import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../../services/Api'
import { setAuthToken } from '../../services/http'
import LoginHeader from './components/LoginHeader/loginHeader'
import LoginForm from './components/LoginForm/loginForm'
import './login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const { token } = await Api.login({ username, password })
      setAuthToken(token)
      navigate('/admin')
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Не удалось войти')
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
        </div>
      </div>
    </div>
  )
}

export default Login
