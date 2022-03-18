const express = require('express')
const app = express()
const PORT = 8080

const router = express.Router()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const server = app.listen(PORT, () => {
    console.log('servidor levantado en el puerto ' + server.address().port)
})

server.on('error', (error) => console.log(`hubo un error ${error}`))

app.set('view engine', 'ejs')

const productos = []

app.get('/', (req, res) => {
    res.render('index.ejs', {
        page: 0,
        titulo: 'Ingresar Producto',
        button_text: 'Lista de Productos >>',
        button_dir: '/productos'
    })
})

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
})

app.get('/productos', (req, res) => {
    res.render('index.ejs', {
        page: 1,
        titulo: 'Lista de Productos',
        button_text: '<< Agregar Producto',
        button_dir: '/',
        productos: productos
    })
})