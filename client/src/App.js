import './App.css';
import React from "react";
import { useState, useEffect, useContext, useCallback } from "react";

function App() {

  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");

  const add_comment = () => {
    setTodoList(arr => [...arr, `${input}`]);
    setInput("");
  }

  const textChanged = (event) => {
    setInput(event.target.value);
  }

  return (
    <div className="App">
      <h1>CLIENT</h1>
      <textarea id="input_field" rows="3" cols="50" value={input} onChange={textChanged}></textarea>
      <br></br><button id="add_button" onClick={add_comment}>Add task</button>
      <div>{todoList.map(item => <div key={item}>{item}</div>)}</div>
    </div>
  );
}

export default App;
