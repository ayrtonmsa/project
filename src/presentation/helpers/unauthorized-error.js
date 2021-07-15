module.exports = class UnauthorizedError extends Error{
  constructor (paramName) {
    super('Usuario ou senha invalido')
    this.name = 'UnauthorizedError'
  }
}
