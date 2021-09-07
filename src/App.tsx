import "./App.css";

import { useState } from "react";
import Box from "@material-ui/core/Box";
import AddTask from "./components/AddTask";

interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(
    Array(3_000)
      .fill(0)
      .map((_, i) => ({
        id: Math.random(),
        text: String(i),
        isDone: false,
      }))
  );

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

  return (
    <Box>
      <AddTask addTodo={addTodo} />
      <ul>
        {todos?.map(({ id, text }) => (
          <li key={id}>{`${text}`}</li>
        ))}
      </ul>
    </Box>
  );
}

export default App;
