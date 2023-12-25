import React, { useState } from "react";

export function TaskRow({ task, toggleTask, editTask, editMode, onEdit, onSaveEdit }) {
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    if (editedName.trim() !== "") {
      onSaveEdit();
    }
  };

  return (
    <tr>
      <td>
        {editMode ? (
          <>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <button className="btn btn-success btn-sm" onClick={handleSave}>
              Guardar
            </button>
          </>
        ) : (
          <>
            {task.name}
            <button
              className="btn btn-info btn-sm mx-2"
              onClick={onEdit}
            >
              Editar
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => toggleTask(task)}
            >
              Completada
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
