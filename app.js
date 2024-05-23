const express = require('express');
const { request } = require('http');
const app = express();
const multer = require('multer');
const path = require('path');


// Middleware para configurar los encabezados CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501'); // Permite solicitudes desde este origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeceras permitidas
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    req.query(path.join(__filename, '/js/mostrarProducto.js'))
    req.query(path.join(__filename, '/js/crearProducto.js'))
});


app.use(express.json)




// Configuración de Multer para guardar las imágenes en el directorio 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('imagen'), (req, res) => {
    res.send('Imagen guardada correctamente');
});

app.listen(3001, () => {
    console.log('Servidor en ejecución en el puerto 3001');
});


