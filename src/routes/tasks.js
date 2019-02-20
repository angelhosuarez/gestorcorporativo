const express = require('express');
const router = express.Router();
const task = require('../models/task')
//esto es como un rest controller
router.get('/', async (req, res) => {
    const tareas = await task.find(); //define codigo asincrono
    res.json(tareas);
});
router.post('/', async (req, res) => {
    const tarea = new task(req.body);
    await tarea.save(); //funcion
    res.json({
        estado: 'guardado',
        documento: tarea
    });
});
router.put('/:id', async (req, res) => { //actualiza   
    await task.findByIdAndUpdate(req.params.id, req.body); //funcion
    res.json({
        estado: 'actualizado'
    });
});
router.get('/:_id', async (req, res) => { //obtiene   
    const tarea = await task.findById(req.params._id);
    res.json(tarea);
});
router.delete('/:_id', async (req, res) => {
    await task.findOneAndDelete({
        '_id': req.params._id
    }); //funcion
    res.json({
        estado: 'borrado'
    });
});

/*
router.get('/a', (req, res) => {
    res.send('a');
});*/
module.exports = router;