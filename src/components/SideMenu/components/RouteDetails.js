import React, { useState, useEffect } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import { ROUTE_ADDITIONAL_DETAILS } from "../../../constants/pageConstants";
import { Switch } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewRoute,
  togglePermanentRoute,
  removeLastRoute,
  editAvailableOn,
  editAvailableOff,
  removeLastPoint,
  addToStartingPosition,
  addToEndingPosition,
} from "../../../redux/createdRoute";
import { toggleIsHidden } from "../../../redux/userRoutes";

function RouteDetails({ setPage }) {
  const [isBeingCreated, setIsBeingCreated] = useState(false);

  //are we willing to add a new route. in order to clear the "selection" of route type
  const [isAddedRoute, setIsAddedRoute] = useState(false);

  const [canAddAnotherRoute, setCanAddAnotherRoute] = useState(false);

  const [startingLngPosition, setStartingLngPosition] = useState("");
  const [startingLatPosition, setStartingLatPosition] = useState("");
  const [endingLngPosition, setEndingLngPosition] = useState("");
  const [endingLatPosition, setEndingLatPosition] = useState("");

  const dispatch = useDispatch();

  const {
    currentCreatedRoute,
    isPermanent,
    startingPosition,
    endingPosition,
  } = useSelector(state => {
    return state.createdRoute;
  });

  const {
    currentUser: { isAdminOrMatakUser },
  } = useSelector(state => state.users);

  const { isHidden } = useSelector(state => {
    return state.userRoutes;
  });

  const handleNext = () => {
    dispatch(editAvailableOff());

    setPage({ open: ROUTE_ADDITIONAL_DETAILS });
  };

  const handleRouteType = type => {
    dispatch(editAvailableOn());
    setIsBeingCreated(true);
    setIsAddedRoute(false);
    dispatch(createNewRoute(type));
  };
  const handleAddRoute = () => {
    setIsBeingCreated(false);
    setIsAddedRoute(true);
  };

  const handleRemoveLastPoint = () => {
    dispatch(removeLastPoint());
  };

  const handleRemoveLastRoute = () => {
    setIsBeingCreated(false);
    dispatch(removeLastRoute());
    dispatch(editAvailableOff());
  };

  useEffect(() => {
    const latestRoute = currentCreatedRoute[0];
    switch (latestRoute?.routeType) {
      case "Point":
        if (latestRoute?.positions.length) {
          setCanAddAnotherRoute(true);
          break;
        } else {
          setCanAddAnotherRoute(false);
          break;
        }
      case "LineString":
        if (latestRoute?.positions.length > 1) {
          setCanAddAnotherRoute(true);
          break;
        } else {
          setCanAddAnotherRoute(false);
          break;
        }
      case "Polygon":
        if (latestRoute?.positions.length > 2) {
          setCanAddAnotherRoute(true);
          break;
        } else {
          setCanAddAnotherRoute(false);
          break;
        }
      default:
        setCanAddAnotherRoute(false);
        break;
    }
  }, [currentCreatedRoute]);

  return (
    <>
      <h1>Create a New Route</h1>
      {isAdminOrMatakUser && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FormControlLabel
            control={
              <Switch
                checked={isHidden}
                onChange={() => dispatch(toggleIsHidden())}
                name="hide-routes"
                color="secondary"
              />
            }
            label="Hide Routes"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isPermanent}
                onChange={() => dispatch(togglePermanentRoute())}
                name="permanentRoute"
                disabled={!currentCreatedRoute.length}
              />
            }
            label="C.L.A Remark"
          />
        </div>
      )}
      <h4>Starting Position:</h4>
      <div>
        <TextField
          style={{
            marginRight: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          }}
          color="secondary"
          id="outlined-number"
          label="Latitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          required
          variant="outlined"
          value={startingLatPosition}
          onChange={e => setStartingLatPosition(e.target.value)}
        />

        <TextField
          style={{
            marginRight: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          }}
          color="secondary"
          id="outlined-number"
          label="Longitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          required
          variant="outlined"
          value={startingLngPosition}
          onChange={e => setStartingLngPosition(e.target.value)}
        />
        <Button
          variant={startingPosition ? "contained" : ""}
          color="secondary"
          style={{ fontSize: "1.6rem" }}
          disabled={!startingLatPosition || !startingLngPosition}
          onClick={() =>
            dispatch(
              addToStartingPosition({
                lat: startingLatPosition,
                lng: startingLngPosition,
              })
            )
          }
        >
          +
        </Button>
      </div>
      <h4>Ending Position:</h4>
      <div>
        <TextField
          style={{
            marginRight: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          }}
          color="secondary"
          id="outlined-number"
          label="Latitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          required
          variant="outlined"
          value={endingLatPosition}
          onChange={e => setEndingLatPosition(e.target.value)}
        />

        <TextField
          style={{
            marginRight: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          }}
          color="secondary"
          id="outlined-number"
          label="Longitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          required
          variant="outlined"
          value={endingLngPosition}
          onChange={e => setEndingLngPosition(e.target.value)}
        />
        <Button
          variant={endingPosition ? "contained" : ""}
          color="secondary"
          style={{ fontSize: "1.6rem" }}
          disabled={!endingLatPosition || !endingLngPosition}
          onClick={() =>
            dispatch(
              addToEndingPosition({
                lat: endingLatPosition,
                lng: endingLngPosition,
              })
            )
          }
        >
          +
        </Button>
      </div>
      <h4>Route Type:</h4>
      <ButtonGroup color="secondary" aria-label="outlined primary button group">
        <Button
          onClick={() => handleRouteType("LineString")}
          variant={
            !isAddedRoute && currentCreatedRoute[0]?.routeType === "LineString"
              ? "contained"
              : ""
          }
          style={{ width: "100%" }}
          disabled={isBeingCreated}
        >
          Line Route
        </Button>
        <Button
          variant={
            !isAddedRoute && currentCreatedRoute[0]?.routeType === "Polygon"
              ? "contained"
              : ""
          }
          onClick={() => handleRouteType("Polygon")}
          style={{ width: "100%" }}
          disabled={isBeingCreated}
        >
          Area
        </Button>
        <Button
          variant={
            !isAddedRoute && currentCreatedRoute[0]?.routeType === "Point"
              ? "contained"
              : ""
          }
          onClick={() => handleRouteType("Point")}
          style={{ width: "100%" }}
          disabled={isBeingCreated}
        >
          Point
        </Button>
      </ButtonGroup>

      <Button
        style={{ marginTop: "1.33em" }}
        variant="contained"
        color="secondary"
        disabled={!canAddAnotherRoute}
        onClick={handleAddRoute}
      >
        Add Another Route Type
      </Button>
      <Button
        style={{ marginTop: "1.33em" }}
        variant="contained"
        color="secondary"
        onClick={handleRemoveLastPoint}
        disabled={!currentCreatedRoute[0]?.positions.length}
      >
        Delete Last Point Added
      </Button>

      <Button
        style={{ marginTop: "1.33em" }}
        variant="contained"
        color="secondary"
        onClick={handleRemoveLastRoute}
        disabled={!currentCreatedRoute[0]?.positions.length}
      >
        Delete Last Route
      </Button>

      <h4 className="pt-5">Add Manually:</h4>
      <div>
        <TextField
          style={{
            marginRight: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          }}
          color="secondary"
          id="outlined-number"
          label="Latitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <TextField
          style={{
            marginRight: "0.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.06)",
          }}
          color="secondary"
          id="outlined-number"
          label="Longitude"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="secondary"
          style={{ fontSize: "1.6rem" }}
        >
          +
        </Button>
      </div>
      <Button
        variant="contained"
        color="secondary"
        style={{
          alignSelf: "flex-end",
          padding: "0.5rem 2rem",
          margin: "2rem 0 1rem 0",
        }}
        onClick={handleNext}
        disabled={
          !currentCreatedRoute[0]?.positions.length ||
          !startingPosition ||
          !endingPosition
        }
      >
        Next
      </Button>
    </>
  );
}

export default RouteDetails;
