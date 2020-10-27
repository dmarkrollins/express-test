const { configureApp } = require('./configureApp')

const port = process.env.PORT || 3000

configureApp().then((app) => {
    app.listen(port, () => console.log(`App is listening on port ${port}`))
})
