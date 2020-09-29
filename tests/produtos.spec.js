const chai = require('chai')
const http = require('chai-http')

const app = require('../src/app') // Arquivo a ser testado

chai.use(http)

describe('Teste de integração', () => {
  it('/produtos - GET', (done) => {
    chai
      .request(app.app)
      .get('/produtos')
      .end((err, res) => {
        chai.expect(err).to.be.null
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.length).to.be.least(1)

        done()
      })
  })
})
