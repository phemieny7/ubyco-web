import React, { useState } from "react";

// @material-ui/core
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

//form input
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import CustomInput from "components/CustomInput/CustomInput.js";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons
import Store from "@material-ui/icons/Store";
import { BsBank } from "react-icons/bs";
import { MdCardGiftcard } from "react-icons/md";

import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";

import ArrowUpward from "@material-ui/icons/ArrowUpward";

// layout for this page
import User from "layouts/User.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Table from "components/Table/Table.js";
import Success from "components/Typography/Success.js";
import Card from "components/Card/Card.js";

import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Server from "../../api/lib/Server";
import Danger from "components/Typography/Danger.js";

// import Button from "@material-ui/core/Button";
import Button from "components/CustomButtons/Button.js";
import { getSession } from "next-auth/client";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  formControl: {
    minWidth: "100%",
    padding: "5px",
  },
  formTitle: {
    fontSize: "16px",
    color: "#aaa",
  },
  textInput: {
    fontSize: "16px",
    paddingBottom: "4px",
  },
  center: {
    textAlign: "center",
    display: "block",
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
  bolderText: {
    fontWeight: "bold",
    color: "#777",
  },
  cardTitle: {
    color: "grey",
    margin: "40px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "grey",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};


function Withdraw(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [accountId, setAccountId] = React.useState("");
  const [amount, setAmount] = React.useState("");


  const handleChange = (event) => {
    setAccountId(event.target.value);
  };
  const priceChange = (e) => {
      if(props.userData.userAmount === null){
        alert(`You don't have enough amount`)
      }
  }

  let successWithdrawal = []
  let pendingWithdrawal = []
  let failedWithdrawal = []

//   for(let i = 0; i < props.userData.userWithdrawal.length; i++){
//     if(props.userData.userWithdrawal[i].completed === true){
//       successWithdrawal.push(props.userData.userWithdrawal[i])
//     }
//     if(props.userData.userWithdrawal[i].status === 1){
//       pendingWithdrawal.push(props.userData.userWithdrawal[i])
//     }
//     if(props.userData.userWithdrawal[i].status === 2){
//       failedWithdrawal.push(props.userData.userWithdrawal[i])
//     }
//   }



  return (
    <div>
     <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <BsBank />
              </CardIcon>
              {/* <p className={classes.cardCategory}>Success</p> */}
              <h3 className={classes.cardTitle}>
                {successWithdrawal.length > 0 ? successWithdrawal.length : 0}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Success>
                  Successful
                </Success>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
        <Card>
            <CardHeader color="rose" stats icon>
              <CardIcon color="rose">
                <BsBank />
              </CardIcon>
              <h3 className={classes.cardTitle}>
                {pendingWithdrawal.length}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  Pending
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}></a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
        <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="dark">
                <BsBank />
              </CardIcon>
              <h3 className={classes.cardTitle}>
                {failedWithdrawal.length}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                  Failed
                <a href="#pablo" onClick={(e) => e.preventDefault()}></a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Withdrawal</h4>
              <p className={classes.cardCategoryWhite}>
                Kindly Enter your Details
              </p>
            </CardHeader>
            <form
              onSubmit={(e) => formSubmit(e)}
              data-toggle="validator"
              encType="multipart/form-data"
            >
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} className={classes.center}>
                  <div>
                    <h4 className={classes.boldText}>
                      Available Balance (Naira)
                    </h4>
                    <h5 className={classes.bolderText}>{
                        props.userData.userAmount !== null ? props.userData.userAmount : 0
                    }</h5>
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      id="demo-simple-select-label"
                      className={classes.formTitle}
                    >
                      Select Account{" "}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={accountId}
                      onChange={handleChange}
                    >
                      {props.userData.userAccounts.length > 0
                        ? props.userData.userAccounts.map((account) => (
                            <MenuItem value={account.id} key={account.id}>
                              <p>{account.name}</p>
                            </MenuItem>
                          ))
                        : (<MenuItem><p>
                            Add an Account
                            </p></MenuItem>)}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Amount"
                      id="amount"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "number",
                        onChange: (e) => priceChange(e),
                        value: amount,
                        required: true,
                      }}
                    />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="danger">Request Withdrawal</Button>
              {
                props.userData.userAccounts.length === 0 ? <a href="/addaccount"><Button type="button" color="info">Add Account</Button></a> : null
              }
            </CardFooter>
        </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
Withdraw.layout = User;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const token = session?.accessToken;
  const user = await Server.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const userData = user.data.message;

  console.log(userData);

  return {
    props: {
      userData,
    },
  };
}

export default Withdraw;
