import React, {useMemo, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField/TextField";
import {Button, Select} from "@material-ui/core";
import "./RoutesForm.css";
import {MdClose} from "react-icons/md";
import DatePicker from "../DatePicker/DatePicker";
import {useSelector} from "react-redux";
import RoutesInfoDetails from "../RoutesInfoDetails/RoutesInfoDetails";

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
                value={routeData.Path_Name}
                onChange={e => setRouteData({...routeData, Path_Name: e.target.value})}
                disabled={isViewOnly()}
            />
            {!routeData.Is_Permanent && <DatePicker startingDate={new Date(routeData.Start_Date)} setStartingDate={(date) => setRouteData({...routeData, Start_Date: date})}
                endingDate={new Date(routeData.End_Date)} setEndingDate={(date) => setRouteData({...routeData, End_Date: date})} isDisabled={isViewOnly() || permissions.isDisabled}
            />}
            <TextField
                label="Car Number"
                value={routeData.Car_Liecene_Number}
                onChange={e => setRouteData({...routeData, Car_Liecene_Number: e.target.value})}
                disabled={isViewOnly()}
            />
            <TextField
                label="Driver's Full Name"
                value={routeData.Driver_Name}
                onChange={e => setRouteData({...routeData, Driver_Name: e.target.value})}
                disabled={isViewOnly()}
            />
            <TextField
                label="Driver's Cellphone"
                value={routeData.Driver_Cellphone}
                onChange={e => setRouteData({...routeData, Driver_Cellphone: e.target.value})}
                disabled={isViewOnly()}
            />
            <TextField
                label="Terms"
                value={routeData.Terms_Text}
                onChange={e => setRouteData({...routeData, Terms_Text: e.target.value})}
                disabled={isViewOnly() || !isAdminOrMatakUser}
            />
            <TextField
                label="Reason"
                value={routeData.Reason_Text}
                onChange={e => setRouteData({...routeData, Reason_Text: e.target.value})}
                disabled={isViewOnly()}
            />
            <TextField
                label="Remarks"
                value={routeData.Remarks}
                onChange={e => setRouteData({...routeData, Remarks: e.target.value})}
                disabled={isViewOnly()}
            />
            {!routeData.Is_Permanent && <TextField
                label="Route Status"
                value={routeData.Status_Name}
                onChange={e => setRouteData({...routeData, Status_Name: e.target.value})}
                disabled={isViewOnly() || !isAdminOrMatakUser}
            />}
            <TextField
                label="Permanent"
                value={routeData.Is_Permanent}
                onChange={e => setRouteData({...routeData, Is_Permanent: e.target.value})}
                disabled={isViewOnly() || !isAdminOrMatakUser}
            />
            {!routeData.Is_Permanent && (
                <RoutesInfoDetails
                    reson={routeData.Reason_Text} setReason={(val) => setRouteData({...routeData, Reason_Text: val})}
                    driversName={routeData.Driver_Name} setDriversName={(val) => setRouteData({...routeData, Driver_Name: val})}
                    vehicleID={routeData.Car_Liecene_Number} setVehicle={(val) => setRouteData({...routeData, Car_Liecene_Number: val})}
                    phonePrefix={routeData.Driver_Cellphone.split("-")[0]} setPhonePrefix={(val) => setRouteData({...routeData, Driver_Cellphone: [val, routeData.Driver_Cellphone.split("-")[1]].join("-")})}
                    phonePostfix={routeData.Driver_Cellphone.split("-")[1]} setPhonePostfix={(val) => setRouteData({...routeData, Driver_Cellphone: [ routeData.Driver_Cellphone.split("-")[0], val].join("-")})}
                    isDisabled={permissions.isDisabled}
                />
            )}
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