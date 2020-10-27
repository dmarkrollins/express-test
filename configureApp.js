const MongoClient = require('mongodb').MongoClient // eslint-disable-line
const { ServerFactory } = require('./serverFactory')
const logger = require('./logger')
const { DataManager } = require('./dataManager')
const { MongoCredentials } = require('./mongoCredentials')

require('dotenv').config()

const mongoCreds = new MongoCredentials()
const mongoUrl = mongoCreds.connectionString
const databaseName = mongoCreds.dbName

const configureApp = () => MongoClient
    .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(async (client) => {
        const db = client.db(databaseName)
        const dataManager = new DataManager({ db })

        try {
            await dataManager.loadFakeData()
        }
        catch (error) {
            console.log(error)
        }

        return ServerFactory.createServer({
            logger,
            dataManager
        })
    })
    .catch((error) => {
        console.error(error)
    })

module.exports = { configureApp }
