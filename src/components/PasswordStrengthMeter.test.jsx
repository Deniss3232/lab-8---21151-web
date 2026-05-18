import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PasswordStrengthMeter from './PasswordStrengthMeter'

describe('PasswordStrengthMeter', () => {
  it('renderiza un input de contraseña', () => {
    render(<PasswordStrengthMeter />)
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
  })
  it('muestra "vacía" al inicio', () => {
    render(<PasswordStrengthMeter />)
    expect(screen.getByText('vacía')).toBeInTheDocument()
  })
  it('muestra "débil" con contraseña corta', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'abc')
    expect(screen.getByText('débil')).toBeInTheDocument()
  })
  it('muestra "media" con 8+ caracteres sin números ni símbolos', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')
    expect(screen.getByText('media')).toBeInTheDocument()
  })
  it('muestra "fuerte" con 8+ caracteres y número', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefg1')
    expect(screen.getByText('fuerte')).toBeInTheDocument()
  })
  it('muestra "muy fuerte" con 8+ caracteres, número y símbolo', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefg1!')
    expect(screen.getByText('muy fuerte')).toBeInTheDocument()
  })
  it('vuelve a "vacía" al borrar todo', async () => {
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)
    await userEvent.type(input, 'abc')
    await userEvent.clear(input)
    expect(screen.getByText('vacía')).toBeInTheDocument()
  })
})