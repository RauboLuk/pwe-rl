import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const AddTodo = ({ addTodo }: { addTodo: (text: string) => void }) => {
  const classes = useStyles();
  const [task, setTask] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    addTodo(task);
    setTask("");
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} className={classes.root}>
      <InputBase
        value={task}
        onChange={handleChange}
        placeholder="Add task"
        inputProps={{ "aria-label": "add task" }}
        className={classes.input}
      />
      <IconButton type="submit" aria-label="add" className={classes.iconButton}>
        <AddIcon />
      </IconButton>
    </Paper>
  );
};

export default AddTodo;
