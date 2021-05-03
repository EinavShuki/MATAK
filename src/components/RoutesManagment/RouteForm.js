import React, {useMemo, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField/TextField";
import {Button, Select} from "@material-ui/core";
import "./RoutesForm.css";
import {MdClose} from "react-icons/md";
import DatePicker from "../DatePicker/DatePicker";
import {useSelector} from "react-redux";

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

    const {
        currentUser: { isAdminOrMatakUser },
    } = useSelector(state => state.users);

    const permissions = useMemo(
        () => ({
            isDisabled: routeData.Status_Name !== "Changes-Required",
        }),
        []
    );

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        console.log(routeFormData);
    }

    const isViewOnly = () => {
        console.log(isAdminOrMatakUser)
        return routeFormData.type === "view";
    };

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} style={{maxHeight: "88vh", overflowY: "auto"}}>
            <MdClose onClick={onClose} style={{position: "absolute", right: 0, top: 0, marginTop: "20px", marginRight: "20px", cursor: "pointer"}} size={24}/>
            <TextField
                label="Route Name"
                defaultValue={routeData.Path_Name}
                disabled={isViewOnly()}
            />
            {!routeData.Is_Permanent && <DatePicker startingDate={new Date(routeData.Start_Date)} setStartingDate={(date) => setRouteData({...routeData, Start_Date: date})}
                endingDate={new Date(routeData.End_Date)} setEndingDate={(date) => setRouteData({...routeData, End_Date: date})} isDisabled={isViewOnly() || permissions.isDisabled}
            />}
            <TextField
                label="Car Number"
                defaultValue={routeData.Car_Liecene_Number}
                disabled={isViewOnly()}
            />
            <TextField
                label="Driver's Full Name"
                defaultValue={routeData.Driver_Name}
                disabled={isViewOnly()}
            />
            <TextField
                label="Driver's Cellphone"
                defaultValue={routeData.Driver_Cellphone}
                disabled={isViewOnly()}

            />
            <TextField
                label="Terms"
                defaultValue={routeData.Terms_Text}
                disabled={isViewOnly() || !isAdminOrMatakUser}
            />
            <TextField
                label="Reason"
                defaultValue={routeData.Reason_Text}
                disabled={isViewOnly()}
            />
            <TextField
                label="Remarks"
                defaultValue={routeData.Remarks}
                disabled={isViewOnly()}
            />
            {!routeData.Is_Permanent && <TextField
                label="Route Status"
                defaultValue={routeData.Status_Name}
                disabled={isViewOnly() || !isAdminOrMatakUser}
            />}
            <TextField
                label="Permanent"
                defaultValue={routeData.Is_Permanent}
                disabled={isViewOnly()}
            />

            { !isViewOnly() && <Button
                style={{marginTop: '20px'}}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={!routeData.Car_Liecene_Number || !routeData.Driver_Cellphone|| !routeData.Driver_Name}
            >
                Submit
            </Button>}
        </form>
    );
}