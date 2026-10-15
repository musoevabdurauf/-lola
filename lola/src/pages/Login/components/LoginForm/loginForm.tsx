const LoginForm = ({
  username,
  password,
  error,
  onUsernameChange,
  onPasswordChange,
  onSubmit
}: {
  username: string
  password: string
  error: string
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
}) => {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      {error && <div className="login-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="username">Логин</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={onUsernameChange}
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
          onChange={onPasswordChange}
          placeholder="Введите пароль"
          required
        />
      </div>

      <button type="submit" className="login-button">
        Войти
      </button>
    </form>
  )
}

export default LoginForm
