import type { ITodo } from "../App.js";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: 10,
  },
}));

interface IProps {
  todos: ITodo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const ListTodo = ({ todos, toggleTodo, removeTodo }: IProps) => {
  const classes = useStyles();

  if (!todos.length)
    return <Typography>There are no tasks to do :)</Typography>;

  return (
    <List className={classes.root}>
      {todos?.map(({ id, text, isDone }) => {
        const labelId: string = `checkbox-list-label-${id}`;

        return (
          <ListItem
            key={id}
            role={undefined}
            dense
            button
            onClick={() => toggleTodo(id)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={isDone}
                onClick={() => toggleTodo(id)}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={text} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeTodo(id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListTodo;
