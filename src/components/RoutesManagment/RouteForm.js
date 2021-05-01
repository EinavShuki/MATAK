import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField/TextField";
import {Button} from "@material-ui/core";
import "./RoutesForm.css";
import {MdClose} from "react-icons/md";
import DatePicker from "../DatePicker/DatePicker";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        }
    },
}));


export default function RouteForm({routeFormData, handleFormSubmit, onClose}) {
    const classes = useStyles();
    const [routeData, setRouteData] = useState(routeFormData.route);

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        console.log(routeFormData);
    }

    const isViewOnly = () => {
        return routeFormData.type === "view";
    };

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <MdClose onClick={onClose} style={{position: "absolute", right: 0, top: 0, marginTop: "20px", marginRight: "20px", cursor: "pointer"}} size={24}/>
            <TextField
                label="Route Name"
                defaultValue={routeData["Path_Name"]}
                disabled={isViewOnly()}
            />
            <DatePicker startingDate={new Date(routeData["Start_Date"])} setStartingDate={(date) => setRouteData({...routeData, Start_Date: date})}
                endingDate={new Date(routeData["End_Date"])} setEndingDate={(date) => setRouteData({...routeData, End_Date: date})} isDisabled={isViewOnly()}
            />
            <TextField
                label="Car Number"
                defaultValue={routeData["Car_Liecene_Number"]}
                disabled={isViewOnly()}
            />
            <TextField
                label="Driver's Full Name"
                defaultValue={routeData["Driver_Name"]}
                disabled={isViewOnly()}
            />
            <TextField
                label="Driver's Cellphone"
                defaultValue={routeData["Driver_Cellphone"]}
                disabled={isViewOnly()}

            />
            <TextField
                label="Reason"
                defaultValue={routeData["Reason_Text"]}
                disabled={isViewOnly()}
            />
            <TextField
                label="Permanent"
                defaultValue={routeData["Is_Permanent"]}
                disabled={isViewOnly()}
            />

            {   !isViewOnly() && <Button
                style={{marginTop: '20px'}}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
            >
                Submit
            </Button>}
        </form>
    );
}