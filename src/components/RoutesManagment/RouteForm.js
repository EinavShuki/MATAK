import React, {useMemo, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField/TextField";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import "./RoutesForm.css";
import {MdClose} from "react-icons/md";
import DatePicker from "../DatePicker/DatePicker";
import {useSelector} from "react-redux";
import {phonePrefixes, reasonsArray} from "../../constants/infoConstants";

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
    const [phonePrefix, setPhonePrefix] = useState(routeFormData.route?.Driver_Cellphone.split("-")[0]);
    const [phoneSuffix, setPhoneSuffix] = useState(routeFormData.route?.Driver_Cellphone.split("-")[1]);

    const {
        currentUser: {isAdminOrMatakUser},
    } = useSelector(state => state.users);

    const permissions = useMemo(
        () => ({
            isDisabled: routeData.Status_Name !== "Changes-Required",
        }),
        []
    );

    function handleSubmit(event) {
        event.preventDefault();
        setRouteData({...routeData, Driver_Cellphone: [String(phonePrefix), String(phoneSuffix)].join("-")});
        console.log(routeFormData);
    }

    const isViewOnly = () => {
        return routeFormData.type === "view";
    };

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}
              style={{maxHeight: "88vh"}}>
            <div style={{overflowY: "auto", display: "flex", justifyContent: "space-between"}}>
                <MdClose onClick={onClose} style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    marginTop: "20px",
                    marginRight: "20px",
                    cursor: "pointer"
                }} size={24}/>
                <div style={{width: "350px"}}>
                    <TextField
                        label="Route Name"
                        value={routeData.Path_Name}
                        onChange={e => setRouteData({...routeData, Path_Name: e.target.value})}
                        disabled
                    />
                    {!routeData.Is_Permanent && <DatePicker startingDate={new Date(routeData.Start_Date)}
                                                            setStartingDate={(date) => setRouteData({
                                                                ...routeData,
                                                                Start_Date: date
                                                            })}
                                                            endingDate={new Date(routeData.End_Date)}
                                                            setEndingDate={(date) => setRouteData({
                                                                ...routeData,
                                                                End_Date: date
                                                            })} isDisabled={isViewOnly() || permissions.isDisabled}
                    />}
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
                    <FormControl
                        style={{margin: "8px", width: "200px"}}
                        color="secondary"
                        disabled={isViewOnly() || permissions.isDisabled}
                    >
                        <InputLabel>
                            Reason For Coordination
                        </InputLabel>
                        <Select value={routeData.Reason_Text}
                                onChange={e => setRouteData({...routeData, Reason_Text: e.target.value})}>
                            {reasonsArray.map(reason => (
                                <MenuItem key={reason} value={reason}>
                                    {reason}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div style={{width: "280px"}}>
                    <TextField
                        label="Car Number"
                        value={routeData.Car_Liecene_Number}
                        onChange={e => setRouteData({...routeData, Car_Liecene_Number: e.target.value})}
                        disabled={isViewOnly() || permissions.isDisabled}
                    />
                    <TextField
                        label="Driver's Full Name"
                        value={routeData.Driver_Name}
                        onChange={e => setRouteData({...routeData, Driver_Name: e.target.value})}
                        disabled={isViewOnly() || permissions.isDisabled}
                    />
                    <div style={{display: "flex", margin: "8px"}}>
                        <FormControl
                            disabled={isViewOnly() || permissions.isDisabled}
                            variant="outlined"
                            style={{
                                marginRight: "0.5rem",
                                marginTop: "8px",
                                width: "90px"
                            }}
                        >
                            <Select
                                value={phonePrefix}
                                onChange={e => setPhonePrefix(e.target.value)}
                            >
                                {phonePrefixes.map((prefix, i) => (
                                    <MenuItem key={prefix + i} value={prefix}>
                                        {prefix}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            disabled={isViewOnly() || permissions.isDisabled}
                            variant="outlined"
                            value={phoneSuffix}
                            onChange={e => setPhoneSuffix(e.target.value)}
                            inputProps={{maxLength: 7}}
                        />
                    </div>
                </div>
            </div>
            <TextField
                style={{width: "95%"}}
                label="Terms"
                value={routeData.Terms_Text}
                onChange={e => setRouteData({...routeData, Terms_Text: e.target.value})}
                disabled={isViewOnly() || !isAdminOrMatakUser}
            />
            <TextField
                style={{width: "95%"}}
                label="Remarks"
                value={routeData.Remarks}
                onChange={e => setRouteData({...routeData, Remarks: e.target.value})}
                disabled={isViewOnly() || permissions.isDisabled}
            />
            {!isViewOnly() && <Button
                style={{marginTop: '20px'}}
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={!routeData.Car_Liecene_Number || !routeData.Driver_Cellphone || !routeData.Driver_Name}
            >
                Submit
            </Button>}
        </form>
    );
}