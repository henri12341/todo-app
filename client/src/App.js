import './App.css';
import React from "react";
import { useState, useEffect, useContext, useCallback } from "react";
import { getTasks, createTask, deleteTask } from './Api.js';


function App() {

  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");

  const add_task = () => {
    let data = createTask(input)
    getTasks().then((data) => {
      setTodoList(data)
    })
    setInput("");
  }

  const textChanged = (event) => {
    setInput(event.target.value);
  }

  useEffect(() => {
    getTasks().then((data) => {
      setTodoList(data)
    });
  }, []);

  const delete_task = (props) => {
    const id_to_delete = props.target.id
    console.log(props.target.id)
    deleteTask(id_to_delete)
    getTasks().then((data) => {
      setTodoList(data)
    })
  }

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <div class="textarea-wrapper">
        <textarea id="input_field" rows="3" cols="50" value={input} onChange={textChanged}></textarea>
      </div>
      <br></br><button id="add_button" onClick={add_task}>Add task</button><br></br><br></br>
      <table>
          {todoList.map(item => <tr key={item.id}>{item.item} <button id={item.id} class="delete" onClick={delete_task}>X</button></tr>)}
      </table>
    </div>
  );
}

export default App;
