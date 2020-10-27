
const chai = require('chai')
const { expect } = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const request = require('supertest')
const { ServerFactory } = require('../serverFactory')

chai.use(sinonChai)

describe('Server Factory Tests', function () {

    let sandbox
    let app
    let dataManager
    let logger

    beforeEach(() => {
        sandbox = sinon.createSandbox()

        dataManager = {
            getItems: sandbox.stub().resolves([{ value: 'value 1' }, { value: 'value 2' }]),
            loadFakeData: sandbox.stub().resolves()
        }

        logger = {
            log: sandbox.stub()
        }

        app = ServerFactory.createServer({
            dataManager,
            logger
        })

    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should return array', function (done) {
        request(app)
            .get('/api/test')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect([{ value: 'value 1' }, { value: 'value 2' }])
            .end((err) => {
                if (err) {
                    return done(err)
                }
                return done()
            })

    });

    it('should handle data error ok', function (done) {

        dataManager.getItems.rejects({ message: 'fake-error' })

        request(app)
            .get('/api/test')
            .expect(500)
            .expect('A problem occurred fetching test data!')
            .end((err) => {
                if (err) {
                    return done(err)
                }
                expect(logger.log).to.have.been.called
                expect(logger.log).to.have.been.calledWith({ message: 'fake-error' })
                return done()
            })

    });
});