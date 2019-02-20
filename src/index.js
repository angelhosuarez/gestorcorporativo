const express = require('express');
const mongoose =require('mongoose');
const app = express();
mongoose.connect(
    'mongodb://angelho:2740522ab@192.168.0.199:27017/remarketing', {
        useNewUrlParser: true
    }
).catch(err => console.log(err));
//configuraciones
app.set('port', 80);
app.use(express.json());

//routes
//app.use('ruta',requiere('rutaservidor'))
/*app.use('/api/tasks', require('./routes/tasks'));
app.use('/prueba', require('./routes/prueba'));*/

//iniciamos el servidor
app.use(express.static(__dirname + '/public'));
app.listen(app.get('port'), () => {});