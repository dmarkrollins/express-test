/* eslint-disable no-unused-vars */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('express-cors')

class ServerFactory {
    static createServer({
        logger,
        dataManager
    }) {
        const server = express()

        const jsonParser = server.use(bodyParser.json())

        server.use(bodyParser.urlencoded({
            extended: true
        }))

        server.use(cors())
        const router = express.Router()

        router.get('/test', (req, res, next) => {

            dataManager.getItems()
                .then((list) => {
                    res.contentType = 'application/json'
                    return res.status(200).send(list)
                })
                .catch((error) => {
                    logger.log(error)
                    return res.status(500).send('A problem occurred fetching test data!')
                })
        })

        server.use('/api', router);

        return server
    }
}

module.exports = { ServerFactory }