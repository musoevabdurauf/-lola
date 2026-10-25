import { FlowerIcon } from '../../../../components/Icons/icons'

const LoginHeader = () => {
  return (
    <div className="login-header">
      <h1 className="login-title">
        <span className="login-logo-icon"><FlowerIcon size={30} /></span>
        Lola Admin
      </h1>
      <p className="login-subtitle">Войдите в админ панель</p>
    </div>
  )
}

export default LoginHeader
