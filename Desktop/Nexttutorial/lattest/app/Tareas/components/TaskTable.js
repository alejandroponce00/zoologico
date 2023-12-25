import React, { useState } from "react";
import { TaskRow } from "./TaskRow";

export function TaskTable({ tasks, toggleTask, editTask, showCompleted = false }) {
  const [editedTask, setEditedTask] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const handleEdit = (task) => {
    setEditedTask(task);
    setEditedName(task.name);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = () => {
    if (editedTask && editedName.trim() !== "") {
      editTask(editedTask.name, editedName, editedDescription);
      setEditedTask(null);
      setEditedName("");
      setEditedDescription("");
    }
  };

  const taskTableRows = (doneValue) =>
    tasks
      .filter((task) => task.done === doneValue)
      .map((task) => (
        <TaskRow
          key={task.name}
          task={editedTask === task ? { ...task, name: editedName, description: editedDescription } : task}
          toggleTask={toggleTask}
          editTask={editTask}
          editMode={editedTask === task}
          onEdit={() => handleEdit(task)}
          onSaveEdit={handleSaveEdit}
        />
      ));

  return (
    <table className="table table-striped table-bordered table-dark border-secondary">
      <thead>
        <tr className="table-primary">
          <th>Tarea</th>
        </tr>
      </thead>
      <tbody>{taskTableRows(showCompleted)}</tbody>
    </table>
  );
}
