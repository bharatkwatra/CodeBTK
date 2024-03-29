import React, { useState, useEffect } from "react";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import useTable from "../components/useTable";
import PageHeader from "../components/PageHeader";
import Controls from "../components/controls/Controls";
import { Search } from "@material-ui/icons";
import * as employeeService from "../services/employeeservice";

const CubeheadCells = [
    { id: "capacityCategory", label: "Category Name" },
    { id: "teamCost", label: "Team Cost" }
  ];
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(0)
  },
  tblcell: {
    textAlign: "center"
  },
  searchInput: {
    width: "100%",
    marginTop:"20px",
  },
 
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));
function convertToInternationalCurrencySystem (labelValue) {

    // Nine Zeroes for Billions
    return  Math.abs(Number(labelValue)) >= 1.0e+9

    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B$"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M$"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K$"

    : Math.abs(Number(labelValue));

}

function getAllData() {
  //return fetch("http://localhost:56118/api/GetAllemployee")
  return fetch("http://localhost:23372/api/getcategories")  
  .then((out) => out.json())
    .then((out) => out);
}
export default function Employee() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [records, setRecords] = useState(employeeService.getemployeedata())
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  console.log(records);

    
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, CubeheadCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.capacityCategory.toLowerCase().includes(target.value) || x.teamCost.toLowerCase().includes(target.value)
          );
      },
    });
  };
  return (
    <>
    <Paper className={classes.pageContent}>
    <PageHeader
                title="Categories Details"
                //subTitle="Form design with validation"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
    </Paper>
   
      <Paper className={classes.pageContent}>
      <Toolbar>
                    <Controls.Input
                        label ="Search Categories"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
        <TblContainer  className={classes.pageContent}>
            <TblHead/>
                        <TableBody>
                          {recordsAfterPagingAndSorting().map()

                          }
                        </TableBody>
        </TblContainer>
      </Paper>
</>
  );
}
