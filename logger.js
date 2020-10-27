class Logger {
    static log(...args) {
        console.log(...args)
    }
    static logError(...args) {
        console.log('ERROR', ...args)
    }
}
module.exports = Logger