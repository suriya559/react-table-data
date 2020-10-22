import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";

import "./App.css";
import { Container, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import actionTypes from "./components/actions";
import Table from "./components/table";

function App(props) {
  const [obj, updateObj] = useState({
    name: "",
    email: "",
    address: "",
    dob: "",
  });

  const changeHandler = (e, type) => {
    let data = { ...obj };
    if (type === "date") {
      data["dob"] = e;
    } else {
      data[e.target.name] = e.target.value;
    }
    updateObj(data);
  };

  const clickHandler = () => {
    props.setUserDetails(obj);
    updateObj({
      name: "",
      email: "",
      address: "",
      dob: "",
    });
  };

  return (
    <Container>
      <h1>Please Fill the form</h1>
      <hr />
      <form>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={obj.name}
              onChange={(e) => changeHandler(e)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              value={obj.email}
              onChange={(e) => changeHandler(e)}
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              multiline
              rowsMax={4}
              variant="outlined"
              name="address"
              value={obj.address}
              onChange={(e) => changeHandler(e)}
            />
          </Grid>

          <Grid item xs={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="outlined"
                id="date-picker-dialog"
                label="Date Of Birth"
                format="MM/dd/yyyy"
                name="dob"
                //value={obj.dob}
                onChange={(e) => changeHandler(e, "date")}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={clickHandler}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={5}></Grid>
        </Grid>
      </form>
      {props && props.getData.length > 0 && <Table getData={props.getData} />}
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    getData: state.datastorage.details,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserDetails: (data) => dispatch({ type: actionTypes.USER_DATA, data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
