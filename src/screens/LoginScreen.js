import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MatakIcon from "../images/matak.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    width: "10%",
    height: "auto",
  },
  headline: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function LoginScreen({ history }) {
  const handleClick = () => {
    history.push("/home");
  };
  const classes = useStyles();

  return (
    <Container id="login" component="main" maxWidth="xs">
      <div className={classes.paper}>
        <div className={classes.headline}>
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
          <img className={classes.icon} src={MatakIcon} alt="Matak-Icon" />
        </div>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
