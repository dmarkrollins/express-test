
class DataManager {
    constructor({ db }) {
        this.db = db
    }

    async getItems() {
        return this.db.collection('fake-collection').find().toArray()
    }

    async loadFakeData() {
        const items = await this.getItems()

        console.log(items)

        if (items.length === 0) {
            let i = 0
            for (i = 0; i < 5; i += 1) {
                console.log(`Fake value ${i}`)
                await this.db.collection('fake-collection').insertOne({ message: `Fake value ${i}` })
            }
        }
    }
}

module.exports = { DataManager }
