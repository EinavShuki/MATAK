import React from "react";
import ButtonAppBar from "../components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import "./RoutesManagement.css";
import { Button, List } from "@material-ui/core";
import exportFromJSON from "export-from-json";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "rgba(245, 245, 245)",
    // width: "100vw",
    height: "93vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  table: {},
}));

export default function RoutesManagement() {
  const exportedFileName = "Routes";
  const exportType = "xls";

  const routes = useSelector(state => {
    const { routes } = state.userRoutes;
    return routes.map(route => {
      return { ...route, id: route._id };
    });
  });

  const classes = useStyles();

  const columns = [
    { field: "Path_Name", headerName: "Name", width: 200 },
    { field: "Applicant_User_Id", headerName: "Applicant ID", width: 200 },
    { field: "Status_Name", headerName: "Status", width: 160 },
    { field: "Start_Date", headerName: "Start Date", width: 200 },
    { field: "End_Date", headerName: "End Date", width: 200 },
    { field: "Reason_Text", headerName: "Reason", width: 160 },
    { field: "Remarks", headerName: "Remarks", width: 160 },
    { field: "createdAt", headerName: "Creation Date", width: 200 },
  ];

  const exportRoutes = () => {
    exportFromJSON({ data: routes, fileName: exportedFileName, exportType });
  };

  return (
    <>
      <ButtonAppBar />
      <div>
        <div id={"table-container"} className={classes.container}>
          <div
            style={{
              backgroundColor: "#ffffff",
              height: "60vh",
              width: "80vw",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <DataGrid
              sortingOrder={["desc", "asc"]}
              rows={routes}
              columns={columns}
              pageSize={10}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{ alignSelf: "center", marginTop: 20, width: 190 }}
            onClick={() => exportRoutes()}
          >
            Export (Excel)
          </Button>
        </div>
      </div>
    </>
  );
}
