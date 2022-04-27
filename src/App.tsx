import React, { useState } from 'react';
import { setTextRange } from 'typescript';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    id: number,
    text: string,
    checked: boolean
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setInputText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = {
      id: todos.length,
      text: inputText,
      checked: false,
    }
    setTodos([todo, ...todos]);
  }

  const handleEdit = (value: string, id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.text = value
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <div>
        <h2>todo_with_ts</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" onChange={(e) => handleInput(e)} />
          <input type="submit" value="登録" />
        </form>
        {todos.map((todo) => (
          <li>
            <input type="text" value={todo.text} onChange={(e) => handleEdit(e.target.value, todo.id)} disabled={todo.checked} />
            <input type="checkbox" onChange={() => handleChecked(todo.id, todo.checked)} />
            <button onClick={() => handleDelete(todo.id)}>削除</button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;

