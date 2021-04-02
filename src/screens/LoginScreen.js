import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MatakIcon from "../images/matak.png";
import MatakModal from "./MatakModal";
import axiosConfig from "../config/axiosConfig";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../redux/users";

const useStyles = makeStyles(theme => ({
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

const usernameRegex = /^(?=.{1,15}$)[a-zA-Z]+[a-zA-Z0-9]*/;
// const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[a-zA-Z]).{8,30}$/;
const passwordRegex = /^(?=.{1,15}$)[a-zA-Z]+[a-zA-Z0-9]*/;

//history.push("/home");
export default function LoginScreen({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameLength, setUsernameLength] = useState(0);
  const [passwordLength, setPasswordLength] = useState(0);
  const [modalText, setModalText] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    if (isPasswordValid && isUsernameValid) {
      handleLogIn();
    } else if (!isUsernameValid) {
      openModal("User name is not valid");
    } else if (!isPasswordValid) {
      openModal("Password is not valid");
    }
  };

  const handleLogIn = async () => {
    const body = { Username: username, Password: password };
    try {
      const { data } = await axiosConfig.post("/users/login", body);
      console.log(data.id);
      dispatch(fetchCurrentUser(data.id));
      history.push("/home");
    } catch (error) {
      openModal("Failed to log in");
    }
    // axiosConfig
    //   .post("/users/login", body)
    //   .catch(data => openModal("Failed to log in"))
    //   .then(response => {
    //     if (response) {
    //       const { data } = response;
    //       console.log(data);
    //       if (data.success) {
    //         // here you can dispatch if user admin
    //         history.push("/home");
    //       }
    //     }
    //   });
  };

  const openModal = text => {
    setShowModal(true);
    setModalText(text);
  };

  const validateUsername = event => {
    const inputText = event.target.value;
    setIsUsernameValid(usernameRegex.test(inputText));
    setUsernameLength(inputText.length);
    setUserName(inputText);
  };

  const validatePassword = event => {
    const inputText = event.target.value;
    setIsPasswordValid(passwordRegex.test(inputText));
    setPasswordLength(inputText.length);
    setPassword(inputText);
  };

  return (
    <Container
      id="login"
      component="main"
      maxWidth="xs"
      onClick={() => showModal && setShowModal(false)}
    >
      <div className={classes.paper}>
        <MatakModal text={modalText} show={showModal} />
        <div className={classes.headline}>
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
          <img className={classes.icon} src={MatakIcon} alt="Matak-Icon" />
        </div>
        <form className={classes.form}>
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
            error={!!(!isUsernameValid && usernameLength)}
            onChange={validateUsername.bind(this)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            error={!!(!isPasswordValid && passwordLength)}
            onChange={validatePassword.bind(this)}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
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
