class MongoCredentials {
    constructor() {
        this.connectionString = process.env.MONGO_URL
        this.dbName = process.env.MONGO_DB_NAME
    }
}

module.exports = { MongoCredentials }
