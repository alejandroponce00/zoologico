import { useState } from "react";

export const TaskCreator = ({ createNewTask }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState(""); // Estado añadido para la descripción

  const handleSubmit = (e) => {
    if (newTaskName.trim() === "") {
      alert("Ingresa el nombre de la tarea");
      return;
    }

    e.preventDefault();
    createNewTask(newTaskName, newTaskDescription); // Pasar la descripción a createNewTask
    setNewTaskName("");
    setNewTaskDescription("");
  };

  return (
    <form className="my-2 row" onSubmit={handleSubmit}>
      <div className="col-6"> {/* Ajustar el ancho de columna */}
        <input
          type="text"
          className="form-control"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Ingrese una nueva Tarea..."
          autoFocus
        />
      </div>
      <div className="col-4"> {/* Ajustar el ancho de columna */}
        <input
          type="text"
          className="form-control"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="descripción"
        />
      </div>
      <div className="col-2 p-0 d-flex align-items-center">
        <button className="btn btn-primary btn-sm" type="submit">
          Guardar Tarea
        </button>
      </div>
    </form>
  );
};
