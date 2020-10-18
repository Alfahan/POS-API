const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./src/routes/users')
const productRouter = require('./src/routes/product')
const categoryRouter = require('./src/routes/category')
const historyRouter = require('./src/routes/history')
const cors = require('cors')
const ejs = require('ejs')
const path = require('path')

const env = require('./src/helpers/env')

const app = express()

app.set('views', path.join(__dirname,'src/views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.static('./src/uploads/'))

app.use(cors())
app.use('/users',usersRouter)
app.use('/product',productRouter)
app.use('/category',categoryRouter)
app.use('/history',historyRouter)

app.listen(env.PORT,()=>{
    console.log(`Server running on port ${env.PORT}`)
})