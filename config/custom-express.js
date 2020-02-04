const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
// Constante que amarzena o modulo do express
const app = express()

customExpress = () => {

    app.use(express.json())

    consign()
    .include('controllers/public')
    .then('middlewares')
    .then('controllers')
    .then('models').into(app)

    // app.use()

    // consign()
    //     .include('controllers')
    //     .include('models')
        
    //     .into(app)    

    return app
}

module.exports = customExpress()