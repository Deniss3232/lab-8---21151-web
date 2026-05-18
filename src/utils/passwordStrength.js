import { describe, it, expect } from 'vitest'
import { getPasswordStrength } from './passwordStrength'

describe('getPasswordStrength', () => {
  it('retorna "vacía" cuando la contraseña está vacía', () => {
    expect(getPasswordStrength('')).toBe('vacía')
  })
  it('retorna "débil" para contraseña corta', () => {
    expect(getPasswordStrength('abc')).toBe('débil')
  })
  it('retorna "débil" para exactamente 7 caracteres', () => {
    expect(getPasswordStrength('abcdefg')).toBe('débil')
  })
  it('retorna "media" para 8+ caracteres sin números ni símbolos', () => {
    expect(getPasswordStrength('abcdefgh')).toBe('media')
  })
  it('no considera "débil" una contraseña de exactamente 8 caracteres', () => {
    expect(getPasswordStrength('abcdefgh')).not.toBe('débil')
  })
  it('retorna "fuerte" para 8+ caracteres con número', () => {
    expect(getPasswordStrength('abcdefg1')).toBe('fuerte')
  })
  it('retorna "muy fuerte" para 8+ caracteres con número y símbolo', () => {
    expect(getPasswordStrength('abcdefg1!')).toBe('muy fuerte')
  })
  it('símbolos solos con menos de 8 caracteres sigue siendo "débil"', () => {
    expect(getPasswordStrength('!@#')).toBe('débil')
  })
})
export function getPasswordStrength(password) {
  if (password === '') return 'vacía'
  if (password.length < 8) return 'débil'
  const hasNumber = /\d/.test(password)
  const hasSymbol = /[^a-zA-Z0-9]/.test(password)
  if (hasNumber && hasSymbol) return 'muy fuerte'
  if (hasNumber) return 'fuerte'
  return 'media'
}