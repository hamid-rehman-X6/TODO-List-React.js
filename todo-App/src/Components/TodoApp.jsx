import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

const TodoApp = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  const [todoTask, setTodoTask] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const [taskCompleted, setTaskCompleted] = useState([]);

  const handleAddTodo = () => {
    if (!taskTitle || !taskDescription) {
      alert("Please fill in both title and description before adding a task.");
      return;
    }
    let newTodo = {
      title: taskTitle,
      description: taskDescription,
    };

    let updatedTodoArr = [...todoTask];
    updatedTodoArr.push(newTodo);
    setTodoTask(updatedTodoArr);
    setTaskTitle("");
    setTaskDescription("");
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const handleDelete = (index) => {
    let newArr = [...todoTask];
    newArr.splice(index, 1);
    setTodoTask(newArr);
    localStorage.setItem("todolist", JSON.stringify(newArr));
  };

  const handleComplete = (index) => {
    const filteredArr = {
      ...todoTask[index],
    };

    const updatedCompleteTask = [...taskCompleted];
    updatedCompleteTask.push(filteredArr);
    setTaskCompleted(updatedCompleteTask);
    alert("Task Completed and Stored in the Completed Section");
    handleDelete(index);
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompleteTask));
  };

  const handleDeleteCompleted = (index) => {
    let newArr = [...taskCompleted];
    newArr.splice(index, 1);
    setTaskCompleted(newArr);
    localStorage.setItem("completedTasks", JSON.stringify(newArr));
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTask = JSON.parse(localStorage.getItem("completedTasks"));
    if (savedTodo) {
      setTodoTask(savedTodo);
    }

    if (savedCompletedTask) {
      setTaskCompleted(savedCompletedTask);
    }
  }, []);

  return (
    <>
      <div className="App">
        <h1>Todo Application</h1>

        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-items">
              <label htmlFor="Title">Title</label>
              <input
                type="text"
                placeholder="Enter your Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>

            <div className="todo-input-items">
              <label htmlFor="Description">Description</label>
              <input
                type="text"
                placeholder="Enter your Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>

            <div className="todo-input-items">
              <button
                type="button"
                className="primaryBtn"
                onClick={handleAddTodo}
              >
                Add
              </button>
            </div>
          </div>

          <div className="todo-btn-area">
            <button
              className={`secondaryBtn ${
                isCompleteScreen === false && "active"
              }`}
              onClick={() => setIsCompleteScreen(false)}
            >
              Todo
            </button>
            <button
              className={`secondaryBtn ${
                isCompleteScreen === true && "active"
              }`}
              onClick={() => setIsCompleteScreen(true)}
            >
              Complete
            </button>
          </div>

          <div className="todo-list">
            {isCompleteScreen === false &&
              todoTask.map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={handleDelete}
                      />
                      <BsCheckLg
                        className="check-icon"
                        onClick={() => handleComplete(index)}
                      />
                    </div>
                  </div>
                );
              })}

            {isCompleteScreen === true &&
              taskCompleted.map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteCompleted(index)}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoApp;
