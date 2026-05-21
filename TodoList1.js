const express = require('express');
const app = express();
const port=3000;
app.use(express.json());

let tareas = [
  {
    id: 1,
    titulo: 'Estudiar Express',
    completada: false
  },
  {
    id: 2,
    titulo: 'Hacer ejercicio',
    completada: true
  }
];

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.get('/tareas/:id', (req, res) => {

  const tarea = tareas.find(
    t => t.id == req.params.id
  );

  res.json(tarea);

});

app.post('/tareas', (req, res) => {
  const tNueva={
    id: tareas.length+1,
    titulo: req.body.titulo,
    completada: false
  }
  tareas.push(tNueva); 
  res.status(201).json(tNueva);
});

app.delete('/tareas/:id', (req, res) => {
  const id=parseInt(req.params.id);
  const tamOriginal=tareas.length;
  tareas=tareas.filter(t=>t.id !== id);
  if(tareas.length==tamOriginal){
    return res.status(404).json({mensaje: 'tarea no se ecuentra añadida'});
  }
  res.json({mensaje: 'tarea eliminado correctamente'});

});


app.listen(port, () => {
  console.log('Servidor ejecutándose');
});