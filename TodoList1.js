const express = require('express');
const app = express();
const port=3000;
const db = require('./db'); 
const cors = require("cors");
app.use(express.json());
app.set('etag', true);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/tareas', (req, res) => {
    db.query('SELECT * FROM tareas', (er, resultados) => {
        if (er) {
            return res.status(500).json({ error: er});
        }

        res.json(resultados);
    });
});

app.post('/tareas', (req, res) => {
    const { titulo, descripcion, fecha_limite } = req.body;

    const sql = `
        INSERT INTO tareas (titulo, descripcion, fecha_limite)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [titulo, descripcion, fecha_limite], (er, result) => {
        if (er) {
            return res.status(500).json({ error: er });
        }

        res.status(201).json({
            mensaje: "tarea creada",
            id: result.insertId
        });
    });
});

app.delete('/tareas/:id', (req, res) => {
  const id=req.params.id;
  db.query('DELETE FROM tareas WHERE id=?',[id],(er,resultado)=>{
    if (er){
        return res.status(500).json({ error: er});
    }
    res.json({mensaje:'tarea eliminada correctamente'});
  });
});

app.put('/tareas/:id',(req,res)=>{
    const id=req.params.id;
    const { titulo, descripcion, fecha_limite } = req.body;
    db.query('UPDATE tareas SET titulo=?,descripcion=?, fecha_limite=? WHERE id=?',[titulo,descripcion,fecha_limite,id],(er,resultado)=>{
       if (er){
        return res.status(500).json({ error: er});
       }
       res.json({mensaje:'tarea actualizada correctamente'});
 
    });

});
app.patch('/tareas/:id',(req,res)=>{
    const id=req.params.id;
    const { estado} = req.body;
    db.query('UPDATE tareas SET titulo=? WHERE id=?',[titulo,id],(er,resultado)=>{
       if (er){
        return res.status(500).json({ error: er});
       }
       res.json(resultado);
 
    });

});
app.head('/metadata',(req,res)=>{
    res.setHeader('Content-Type','application/json');
    res.setHeader('Version','1.0');
    res.setHeader('Proyecto','TodoList');
    res.status(200).end();

});
app.options('/metadata',(req,res)=>{
    res.setHeader('Allow','GET,POST, DELETE, PUT, PATCH, HEAD, OPTIONS');
    res.status(200).end();

});
app.listen(port, () => {
  console.log('Servidor ejecutándose');
});