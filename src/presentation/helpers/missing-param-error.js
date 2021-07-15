module.exports = class MissingParamError extends Error{
  constructor (paramName) {
    super(`Atributo: ${paramName} não existe!`)
    this.name = 'MissingParamError'
  }
}
