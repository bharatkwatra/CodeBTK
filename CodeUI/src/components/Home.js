import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import PageHeader from "../components/PageHeader";
//import Zoom from "@material-ui/core/Zoom";
import {
  Paper,
  makeStyles,
  Grid,
  Card,
  CardContent
} from "@material-ui/core";
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
  iconspecs: {
    display: "flex",
    padding: theme.spacing(0),
    color: "#c00",
  },
  gridspecs: {
      width: "300px",
      height : "200px",
      marginTop: "5px"
  },
}));
function getcategorycost() {
  //return fetch("http://localhost:56118/api/GetAllemployee")
  return fetch("http://localhost:23372/api/gettotalcost")
    .then((out) => out.json())
    .then((out) => out);
}
export default function Home() {
    const [checked, setChecked] = React.useState(true);

    const handleChange = () => {
      setChecked((prev) => !prev);
    };
  const [records, setData] = useState([]);
  useEffect(() => {
    const getEmployee = async () => {
      const records = await getcategorycost();
      setData(records);
    };
    getEmployee();
  }, [records]);

  const history = useHistory();
  const handleRoute = () => {
    history.push("/category");
  };

  const classes = useStyles();
  return (
    <>
      <Paper className={classes.pageContent}>
      <PageHeader
                title="Dashboard"
                //subTitle="Form design with validation"
                icon={<DashboardSharpIcon fontSize="large" />}
            />
          <Grid item xs={12} sm={6} md={4} className={classes.gridspecs}>
            <Card className= "mb-10">
              <CardContent className="p-3">
                <PollOutlinedIcon
                  style={{ fontSize: "55px" }}
                  className={classes.iconspecs}
                />
                <h2 className="card-title font-weight-bold font-size-lg">
                  Capacity breakdown
                </h2>
                <p className="card-text">
                  <span onClick={handleRoute}>
                   
                      {records.map((item) =>
                        convertToInternationalCurrencySystem(item.totalTeamCost)
                      )}
                   
                  </span>
                </p>
              </CardContent>
            </Card>
          </Grid>
      </Paper>
    </>
  );
}
function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B$"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M$"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K$"
    : Math.abs(Number(labelValue));
}
