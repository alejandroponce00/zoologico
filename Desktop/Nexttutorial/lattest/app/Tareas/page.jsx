import React, { useState, useEffect } from "react";
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";
import { TaskTable } from "./components/TaskTable";
import { Container } from "./components/Container";
'use client'
function App() {
  const [userName, setUserName] = useState("usuario");
  const [taskItems, setTaskItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    let data = localStorage.getItem("tareas");
    if (data) {
      setTaskItems(JSON.parse(data));
    }
    setUserName("[usuario]");
  }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = (taskName, taskDescription) => {
    if (!taskItems.find((t) => t.name === taskName)) {
      setTaskItems([...taskItems, { name: taskName, description: taskDescription, done: false }]);
    }
  };

  const toggleTask = (task) =>
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

  const editTask = (taskName, newTaskName, newTaskDescription) => {
    setTaskItems(
      taskItems.map((t) => {
        if (t.name === taskName) {
          return { ...t, name: newTaskName, description: newTaskDescription };
        }
        return t;
      })
    );
  };

  const cleanTasks = () => {
    setTaskItems(taskItems.filter((task) => !task.done));
    setShowCompleted(false);
  };

  return (
    <main className="bg-dark vh-100 text-white">
      <TaskBanner userName={userName} taskItems={taskItems} />
      <Container>
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable tasks={taskItems} toggleTask={toggleTask} editTask={editTask} />
        <VisibilityControl
          description="las Tareas Completadas"
          isChecked={showCompleted}
          callback={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
        />
        {showCompleted && (
          <TaskTable
            tasks={taskItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
            editTask={editTask}
          />
        )}
      </Container>
    </main>
  );
}

export default App;
