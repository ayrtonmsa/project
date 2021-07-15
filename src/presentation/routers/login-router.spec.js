class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }
    const { email, password} = httpRequest.body
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    if (!password) {
      return HttpResponse.badRequest('password')
    }
  }
}

class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError() {
    return {
      statusCode: 500
    }
  }
}

class MissingParamError extends Error{
  constructor (paramName) {
    super(`Atributo: ${paramName} não existe!`)
    this.name = 'MissingParamError'
  }
}

describe('Login Router', () => {
  test('Deve retornar 400 se não receber o email', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: '123456'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Deve retornar 400 se não receber a senha', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'email@email.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Deve retornar 500 se não receber o request', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Deve retornar 500 se não receber o body do request', () => {
    const sut = new LoginRouter()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})
