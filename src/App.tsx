import { useCallback, useState } from "react";

import Container from "@material-ui/core/Container";

import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";
import SortButton from "./components/SortButton";

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

  const sortTodos = useCallback((): void => {
    const sortCompletedTop = (todos: ITodo[]): ITodo[] =>
      [...todos].sort((a: ITodo, b: ITodo): number =>
        a.isDone && !b.isDone ? -1 : 0
      );
    setTodos(sortCompletedTop);
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
