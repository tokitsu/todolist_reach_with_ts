import React, { useState } from 'react';
import { setTextRange, TodoCommentDescriptor } from 'typescript';
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    id: number,
    text: string,
    checked: boolean,
  }

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const changeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      id: todos.length,
      text: inputText,
      checked: false,
    }
    setTodos([newTodo, ...todos])
  }

  const changeEdit = (id: number, value: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.text = value
      }
      return todo
    })
    setTodos(newTodos)
  }

  const onClickDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const changeCheck = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked
      }
      return todo
    })
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <h2>practice_with_ts</h2>
      <div>
        <form onSubmit={(e) => changeSubmit(e)}>
          <input type="text" onChange={(e) => changeInput(e)} />
          <input type="submit" value="登録" />
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="text" value={todo.text} onChange={(e) => changeEdit(todo.id, e.target.value)} disabled={todo.checked} />
              <input type="checkbox" onClick={() => changeCheck(todo.id, todo.checked)} />
              <button onClick={() => onClickDelete(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

