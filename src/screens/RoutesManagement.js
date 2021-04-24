import React from "react";
import ButtonAppBar from "../components/NavBar";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import "./RoutesManagement.css";
import { Button } from "@material-ui/core";
import exportFromJSON from "export-from-json";
import {RiFileExcel2Fill} from "react-icons/all";

const useStyles = makeStyles(theme => ({
  container: {
    // width: "100vw",
    height: "80vh",
    width: "100%",
    paddingTop: "25px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative"
  },
  table: {},
}));

export default function RoutesManagement() {
  const exportedFileName = "Routes";
  const exportType = "xls";

  // TODO: We need to receive the full name of the user who opened a route on each route from the server, and then display it in table
  const routes = useSelector(state => {
    const { routes } = state.userRoutes;
    return routes.map(route => {
      return {
        ...route,
        id: route._id,
        Start_Date: new Date(route.Start_Date).toLocaleString(),
        End_Date: new Date(route.End_Date).toLocaleString(),
        createdAt: new Date(route.createdAt).toLocaleString()
      };
    });
  });

  const classes = useStyles();

  const columns = [
    { field: "Path_Name", headerName: "Name", width: 200 },
    { field: "Status_Name", headerName: "Status", width: 160 },
    { field: "Start_Date", headerName: "Start Date", width: 200 },
    { field: "End_Date", headerName: "End Date", width: 200 },
    { field: "Reason_Text", headerName: "Reason", width: 160 },
    { field: "Remarks", headerName: "Remarks", width: 160 },
    { field: "createdAt", headerName: "Creation Date", width: 200 },
  ];

  const exportRoutes = () => {
    let filteredData = [...routes];
    filteredData = filteredData.map((route) => {
      const excelRoute = {...route};
      excelRoute["__v"] !== undefined && delete excelRoute["__v"];
      excelRoute["id"] !== undefined && delete excelRoute["id"];
      excelRoute["_id"] !== undefined && delete excelRoute["_id"];
      excelRoute["Applicant_User_Id"] !== undefined && delete excelRoute["Applicant_User_Id"];
      return excelRoute;
    })
    exportFromJSON({ data: filteredData, fileName: exportedFileName, exportType });
  };

  return (
    <>
      <ButtonAppBar />
      <div style={{backgroundColor: "#f5f5f5", width: "100vw", height: "100vh"}}>
        <div id={"table-container"} className={classes.container}>
            <div style={{ alignSelf: "center", marginTop: 20, width: "94vw", height: "60px", top: 0, right: 0, display: "flex", justifyContent: "space-between"}}>
                <div style={{ width: "70vw", height: "60px", fontWeight: 500, textTransform: "capitalize", letterSpacing: "0.0075em", display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column"}}>
                    <p style={{fontSize: "1.9em"}}>Routes Management</p>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "60px", height: "60px"}}
                    onClick={() => exportRoutes()}
                >
                    <RiFileExcel2Fill size={"1x"}/>
                </Button>
            </div>
          <div style={{ backgroundColor: "#ffffff", height: "70vh", width: "94vw", boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)"}}>
            <DataGrid
              sortingOrder={["desc", "asc"]}
              rows={routes}
              columns={columns}
              pageSize={10}
            />
          </div>
        </div>
      </div>
    </>
  );
}
