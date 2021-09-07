import { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";

import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";

export interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(
    Array(30)
      .fill(0)
      .map((_, i) => ({
        id: Math.random(),
        text: String(i),
        isDone: false,
      }))
  );

  useEffect(() => {
    console.log(todos?.filter((todo) => todo.isDone === true));
  }, [todos]);

  const addTodo = (text: string): void => {
    setTodos((todos) => [
      ...todos,
      {
        id: Math.random(),
        text,
        isDone: false,
      },
    ]);
  };

  const toggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <Container maxWidth="md">
      <AddTodo addTodo={addTodo} />
      <ListTodo todos={todos} toggleTodo={toggleTodo} />
    </Container>
  );
}

export default App;
