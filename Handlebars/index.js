import express from 'express'
import handlebars from 'express-handlebars'
const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs'
    })
)

app.set('view engine', 'hbs')
app.set('views', './views')


const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', (error) => console.log(`Error en servidor ${error}`))

let productos = []

app.get('/', (req, res) => {
    res.render('form', {
        titulo: 'Ingresar Producto',
        button_dir: '/productos',
        button_text: 'Lista de Productos >>'
    })
})

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
})

app.get('/productos', (req, res) => {
    let str_table = ''
    productos.forEach(producto => {
        str_table = str_table.concat(`<tr>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td><img src="${producto.foto_URL}" alt="${producto.nombre}" width="60" height="60"></td>
        </tr>`)
    });
    res.render('tabla', {
        titulo: 'Lista de Productos',
        button_dir: '/',
        button_text: '<< Agregar Productos',
        datos_de_tabla: str_table
    })
})