import React, { useState } from 'react';
import { setTextRange } from 'typescript';
import './App.css';

function App() {
  const [text, setText] = useState("")
  const [todos, setTodos] = useState<Todo[]>([])

  type Todo = {
    id: number,
    text: string,
    checked: boolean,
  }



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      id: todos.length,
      text: text,
      checked: false
    }
    setTodos([newTodo, ...todos])
  }

  const handleEdit = (id: number, value: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.text = value
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleChecked = (value: boolean, id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !value
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
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" onChange={(e) => handleChange(e)} className="inputText" />
          <input type="submit" value="作成" />
        </form>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="text" value={todo.text} onChange={(e) => handleEdit(todo.id, e.target.value)} className="inputText" />
            <input type="checkbox" checked={todo.checked} onChange={() => handleChecked(todo.checked, todo.id)} />
            <button onClick={() => handleDelete(todo.id)}>削除</button>
          </li>
        ))
        }
      </div>
    </div>
  );
}

export default App;

