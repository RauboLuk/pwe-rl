import { useCallback, useEffect, useState } from "react";

import Container from "@material-ui/core/Container";

import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";

export interface ITodo {
  id: number;
  text: string;
  isDone: boolean;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>(
    Array(30)
      .fill(0)
      .map((_, i) => ({
        id: Math.random(),
        text: String(i),
        isDone: false,
      }))
  );

  useEffect(() => {
    setTodos(todos.sort((a, b) => a.isDone && !b.isDone ? -1 : 0));
  }, [todos, setTodos]);

  const logDoneTodos = useCallback((todos: ITodo[]): void => {
    console.log(todos?.filter((todo) => todo.isDone === true));
  }, []);

  const addTodo = useCallback((text: string): void => {
    setTodos((todos) => [
      ...todos,
      {
        id: Math.random(),
        text,
        isDone: false,
      },
    ]);
  }, []);

  const toggleTodo = useCallback(
    (id: number): void => {
      const toggledTodo = todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      );
      logDoneTodos(toggledTodo);
      setTodos(toggledTodo);
    },
    [todos, logDoneTodos]
  );

  const removeTodo = useCallback(
    (id: number): void => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    },
    [todos]
  );

  return (
    <Container maxWidth="md">
      <AddTodo addTodo={addTodo} />
      <SortButton sortTodos={sortTodos} />
      <ListTodo todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    </Container>
  );
}

export default App;
