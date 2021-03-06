import { useCallback, useEffect, useState } from "react";

import Container from "@material-ui/core/Container";

import AddTodo from "./components/AddTodo";
import ListTodo from "./components/ListTodo";
import SortButton from "./components/SortButton";
import { Typography } from "@material-ui/core";

const API_URL = process.env.REACT_APP_API_PATH;

export interface ITodo {
  id: string;
  text: string;
  isDone: boolean;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (signal: AbortSignal) => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/todos`, {
          method: "GET",
          signal,
        });

        const data = await response.json();

        setTodos(data);
      } catch (error: unknown) {
        if (error instanceof Error) console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    const controller = new AbortController();
    const { signal } = controller;
    fetchData(signal);
    return () => {
      controller.abort();
    };
  }, []);

  const logDoneTodos = useCallback((todos: ITodo[]): void => {
    console.log(todos?.filter((todo) => todo.isDone === true));
  }, []);

  const addTodo = useCallback(async (text: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });
      const newTodo: ITodo = await response.json();
      setTodos((todos) => [...todos, newTodo]);
    } catch (error) {
      console.log("Create failed");
    }
  }, []);

  const sortTodos = useCallback((): void => {
    const sortCompletedTop = (todos: ITodo[]): ITodo[] =>
      [...todos].sort((a: ITodo, b: ITodo): number =>
        a.isDone && !b.isDone ? -1 : 0
      );
    setTodos(sortCompletedTop);
  }, []);

  const toggleTodo = useCallback(
    async (id: string): Promise<void> => {
      try {
        const todo: ITodo = todos.filter((todo) => todo.id === id)[0];
        await fetch(`${API_URL}/api/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isDone: !todo.isDone,
          }),
        });
        const toggledTodo = todos.map((todo) =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        );
        logDoneTodos(toggledTodo);
        setTodos(toggledTodo);
      } catch (error) {
        console.log("Toggle failed");
      }
    },
    [todos, logDoneTodos]
  );

  const removeTodo = useCallback(
    async (id: string): Promise<void> => {
      try {
        await fetch(`${API_URL}/api/todos/${id}`, {
          method: "DELETE",
        });
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      } catch (error) {
        console.log("Delete failed");
      }
    },
    [todos]
  );

  return (
    <Container maxWidth="md">
      <AddTodo addTodo={addTodo} />
      <SortButton sortTodos={sortTodos} />
      {loading ? (
        <Typography>Loading data...</Typography>
      ) : (
        <ListTodo
          todos={todos}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        />
      )}
    </Container>
  );
}

export default App;
