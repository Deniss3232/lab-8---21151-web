import { useState } from 'react'
import { getPasswordStrength } from '../utils/passwordStrength'

export default function PasswordStrengthMeter() {
  const [password, setPassword] = useState('')
  const strength = getPasswordStrength(password)

  return (
    <div>
      <label htmlFor="password">Contraseña</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>{strength}</p>
    </div>
  )
}