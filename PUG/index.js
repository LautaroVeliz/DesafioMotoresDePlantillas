const express = require('express')
const pug = require('pug')
const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('views', './views')
app.set('view engine', 'pug')

const server = app.listen(PORT, () => {
    console.log('servidor levantado en el puerto ' + server.address().port)
})

server.on('error', (error) => console.log(`hubo un error ${error}`))

let productos = []

app.get('/', (req, res) => {
    res.render('form.pug', {
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
    res.render('tabla.pug', {
        titulo: 'Lista de Productos',
        button_text: '<< Agregar Productos',
        products_list: productos,
        button_dir: '/'
    })
})