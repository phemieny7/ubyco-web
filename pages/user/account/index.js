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
      if(props.userData.userAmount === null || props.userData.userAmount.amount === 0){
        alert(`You don't have enough amount`)
      }
  }

  let successWithdrawal = []
  let pendingWithdrawal = []
  let failedWithdrawal = []

  



  return (
    <div>
     <GridContainer>
        {
            props.userData.userAccounts.length > 0 ?
            props.userData.userAccounts.map((account) => (
              <GridItem xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                      <BsBank/>
                    </CardIcon>
                    <p className={classes.cardTitle}>
                      {account.account_name}<br/>
                      <small>{account.account_number}</small><br/>
                      {account.bank}
                    </p>
                  </CardHeader>
                  <CardFooter>
                  <Button color="danger">Remove Account</Button>
                  </CardFooter>
                </Card>                  
              </GridItem>
            )): null
          }
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Add An Account</h4>
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
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      id="demo-simple-select-label"
                      className={classes.formTitle}
                    >
                      Select A Bank{" "}
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
                              <p>{account.account_name} {account.account_number} {account.bank}</p>
                            </MenuItem>
                          ))
                        : (<MenuItem><p>
                            Add an Account
                            </p>
                          </MenuItem>)}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Account Number"
                      id="accountNumber"
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
              <Button color="danger">Add Account</Button>
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
