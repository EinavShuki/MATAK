import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
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

const usernameRegex = /^[a-zA-Z0-9]{6,}[a-zA-Z]+[0-9]*$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export default function LoginScreen({history}) {
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [usernameLength, setUsernameLength] = useState(0);
    const [passwordLength, setPasswordLength] = useState(0);

    const handleClick = () => {
        if (isPasswordValid && isUsernameValid) {
            history.push("/home");
        } else if (!isUsernameValid) {
            alert('User name is not valid');
        } else if (!isPasswordValid) {
            alert('Password is not valid');
        }
    };
    const classes = useStyles();

    const validateUsername = (event) => {
        const inputText = event.target.value;
        setIsUsernameValid(usernameRegex.test(inputText));
        setUsernameLength(inputText.length);
    };

    const validatePassword = (event) => {
        const inputText = event.target.value;
        setIsPasswordValid(passwordRegex.test(inputText));
        setPasswordLength(inputText.length);
    };

    return (
        <Container id="login" component="main" maxWidth="xs">
            <div className={classes.paper}>
                <div className={classes.headline}>
                    <Typography component="h1" variant="h3">
                        Sign in
                    </Typography>
                    <img className={classes.icon} src={MatakIcon} alt="Matak-Icon"/>
                </div>
                <form className={classes.form}>
                    <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username"
                               name="username" autoComplete="username" autoFocus error={!!(!isUsernameValid && usernameLength)}
                               onChange={validateUsername.bind(this)}
                    />
                    <TextField variant="outlined" margin="normal" required error={!!(!isPasswordValid && passwordLength)}
                               onChange={validatePassword.bind(this)}
                               fullWidth name="password" label="Password" type="password" id="password"
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
