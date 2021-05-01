import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField/TextField";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));


export default function RouteForm({routeFormData, handleFormSubmit}) {
    const classes = useStyles();
    const [routeData, setRouteData] = useState(routeFormData.route);

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        console.log(routeFormData);
    }

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                label="Route Name"
                value={routeData["Path_Name"]}
            />
            <TextField
                label="Car Number"
                value={routeData["Car_Liecene_Number"]}
            />
            <TextField
                label="Driver's Full Name"
                value={routeData["Driver_Name"]}
            />
            <TextField
                label="Driver's Cellphone"
                value={routeData["Driver_Cellphone"]}
            />
            <Button
                style={{marginTop: '20px'}}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
            >
                Submit
            </Button>
        </form>
    );
}