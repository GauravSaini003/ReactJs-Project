import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [input, setInput] = useState(""); // Input for new tasks
  const [task, setTask] = useState([]); // Task list state
  const [editingIndex, setEditingIndex] = useState(null); // Track which task is being edited
  const [editingText, setEditingText] = useState(""); // Track the text being edited

  // Function to handle input change
  function inputchange(e) {
    setInput(e.target.value);
  }

  // Function to add a new task
  function addTask() {
    if (input.trim() !== "") {
      setTask([...task, input]); // Add the new task to the list
      setInput(""); // Clear the input field
    }
  }

  // Function to delete a task
  function deleteTask(index) {
    const newTasks = task.filter((_, i) => i !== index); // Remove the task at the specified index
    setTask(newTasks);
  }

  // Function to start editing a task
  function EditTask(index) {
    setEditingIndex(index); // Set the index of the task being edited
    setEditingText(task[index]); // Set the current text of the task to be edited
  }

  // Function to handle editing input change
  function handleEditingChange(e) {
    setEditingText(e.target.value); // Update the editing text state
  }

  // Function to save the edited task
  function saveTask() {
    const updatedTasks = task.map((t, index) => 
      index === editingIndex ? editingText : t // Update the task at the editing index
    );
    setTask(updatedTasks); // Update the tasks in the state
    setEditingIndex(null); // Clear the editing index
    setEditingText(""); // Clear the editing text
  }

  // Function to handle key press
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      editingIndex === null ? addTask() : saveTask(); // Either add or save task based on whether editing or not
    }
  }

  return (
    <>
      <div className="bg-red-200 flex flex-col p-12 border gap-6">
        <h1 className="text-center cursor-pointer transition-all duration-300 hover:scale-110 border shadow-2xl shadow-purple-500/50 rounded-full p-5 uppercase inline-block text-6xl font-extrabold text-orange-400">
          TO Do List
        </h1>
        <div className="flex flex-row justify-center">
          <input
            value={input}
            onChange={inputchange}
            onKeyDown={handleKeyDown} // Listen for key down events
            className="w-1/2 text-2xl p-3 border rounded-lg"
            type="text"
            placeholder="Enter the Task"
            id="input"
          />
          <FontAwesomeIcon
            onClick={addTask}
            className="text-6xl p-1 ps-2 cursor-pointer"
            icon={faArrowRight}
            beat
          />
        </div>

        <div>
          <ul id="list" className="border border-red-600 rounded-lg p-6">
            {task.map((taskItem, index) => (
              <div key={index} className="flex flex-row justify-between items-center  bg-slate-200 p-6 border rounded-lg m-4">
                {editingIndex === index ? (
                  // Show an input field if editing the current task
                  <input
                    value={editingText}
                    onChange={handleEditingChange}
                    className="p-1 shadow-2xl text-gray-500 font-bold"
                  />
                ) : (
                  // Show the task normally if not being edited
                  <li className="p-1 shadow-2xl text-gray-500 font-bold">
                    {taskItem}
                  </li>
                )}
                <div className="flex flex-row items-center">
                  {editingIndex === index ? (
                    // Show Save button when editing
                    <button onClick={saveTask} className="text-xl ms-3 me-3 p-1 cursor-pointer border rounded-lg border-black">
                      Save
                    </button>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        onClick={() => EditTask(index)}
                        className="cursor-pointer text-xl ms-3 me-3"
                        icon={faPenToSquare}
                      />
                      <FontAwesomeIcon
                        onClick={() => deleteTask(index)}
                        className="cursor-pointer text-xl ms-6 me-6"
                        icon={faTrash}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
