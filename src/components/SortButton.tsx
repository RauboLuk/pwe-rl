import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

interface IProps {
  sortTodos: any;
}

const SortButton = ({ sortTodos }: IProps) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      variant="contained"
      color="primary"
      onClick={sortTodos}
    >
      Move completed tasks to the top
    </Button>
  );
};

export default SortButton;
