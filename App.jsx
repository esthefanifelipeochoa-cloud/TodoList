import { useEffect, useState } from "react";

const API = "http://localhost:3000/tareas";

function App() {

  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitulo, setEditTitulo] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");

  const obtenerTareas = () => {
    fetch(API)
      .then(res => res.json())
      .then(datosDeB=> setTareas(datosDeB));
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  const agregar = () => {
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo,
        descripcion,
        fecha_limite: fecha,
      })
    })
      .then(() => {
        setTitulo("");
        setDescripcion("");
        setFecha("");
        obtenerTareas();
      });
  };

  const eliminar = (id) => {

    fetch(`${API}/${id}`, {
      method: "DELETE"
    })
      .then(() => obtenerTareas());
    };

  const iniciarEdicion = (t) => {

    setEditId(t.id);
    setEditTitulo(t.titulo);
    setEditDescripcion(t.descripcion);
  };

  const guardar = (id) => {

    fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo: editTitulo,
        descripcion: editDescripcion
      })
    })
      .then(() => {
        setEditId(null);
        obtenerTareas();
      });
  };

  return (
    <div style={{ padding: 20 }}>

      <h1>Todo List</h1>

      <div style={{ marginBottom: 20 }}>

        <input
          placeholder="Titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <p></p>
        <input
          placeholder="Descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <p></p>

        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <p></p>

        <button onClick={agregar}>
          Agregar tarea
        </button>

      </div>

      {tareas.map((t) => (

        <div
          key={t.id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10
          }}
        >

          {editId === t.id ? (

            <div>

              <input
                value={editTitulo}
                onChange={(e) =>
                  setEditTitulo(e.target.value)
                }
              />

              <p></p>

              <input
                value={editDescripcion}
                onChange={(e) =>
                  setEditDescripcion(e.target.value)
                }
              />

              <p></p>

              <button onClick={() => guardar(t.id)}>
                Guardar
              </button>

            </div>

          ) : (

            <div>

              <h3>
                {t.titulo}
              </h3>

              <p>
                {t.descripcion}
              </p>

              <small>
                {t.fecha_limite}
              </small>
              
              <p></p>

              <button onClick={() => iniciarEdicion(t)}>
                Editar
              </button>

              <button
                onClick={() => eliminar(t.id)}
                style={{ marginLeft: 10 }}
              >
                Eliminar
              </button> 

            </div>

          )}

        </div>

      ))}

    </div>
  );
}

export default App;