import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
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

interface IProps {
  addTodo: (text: string) => void;
}

const AddTodo = ({ addTodo }: IProps) => {
  const classes = useStyles();
  const [task, setTask] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value: string = event.target.value;
      if (value) setError(false);
      setTask(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLDivElement>): void => {
      console.log("test");
      event.preventDefault();
      if (!task) {
        setError(true);
        return;
      }
      addTodo(task);
      setTask("");
    },
    [task, addTodo]
  );

  return (
    <Paper component="form" onSubmit={handleSubmit} className={classes.root}>
      <FormControl className={classes.input}>
        <>
          <Input
            error={error}
            value={task}
            onChange={handleChange}
            placeholder="Add task"
            inputProps={{ "aria-label": "add task" }}
          />
          {error && (
            <FormHelperText>Task description can't be empty.</FormHelperText>
          )}
        </>
      </FormControl>
      <IconButton type="submit" aria-label="add" className={classes.iconButton}>
        <AddIcon />
      </IconButton>
    </Paper>
  );
};

export default AddTodo;
