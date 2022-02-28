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

function Profile(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [email, setEmail] = React.useState(props.userData.email);
  const [name, setName] = React.useState(props.userData.fullname);
  const [phone, setPhone] = React.useState(props.userData.phone);
  const [submit, setSubmit] = React.useState(true);
  const imageLoader = ({ src, width, quality }) => {
    return `https://res.cloudinary.com/ubycohub/${src}.jpg?w=${width}&q=${quality || 75}`;
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Withdrawal</h4>
              <p className={classes.cardCategoryWhite}>
                Kindly Update your Details
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
                      <h5 className={classes.bolderText}>
                        {props.userData.userAmount !== null
                          ? props.userData.userAmount.amount
                          : 0}
                      </h5>
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
                        {props.userData.userAccounts.length > 0 ? (
                          props.userData.userAccounts.map((account) => (
                            <MenuItem value={account.id} key={account.id}>
                              <p>
                                {account.account_name} {account.account_number}{" "}
                                {account.bank}
                              </p>
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>
                            <p>Add an Account</p>
                          </MenuItem>
                        )}
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
                <Button color="danger" type="submit" disable={submit}>
                  Request Withdrawal
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
        <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                 {
                  props.user.picture !== null ? 
                  <Image
                  loader={imageLoader}
                  src={props.user.picture}
                  width={400}
                  height={700}
                /> : <img src={avatar} alt="..." />
                }
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardCategory}>Balance: N{props.user.userAmount.amount}</h4>
              <h4 className={classes.cardTitle}>{props.user.fullname}</h4>
              <p className={classes.description}>
               { props.user.userAccounts.length > 0 ?
                  props.user.userAccounts.map((x) => [
                    <p>Bank: {x.bank} <br/> Account Number : {x.account_number}</p>
                  ] ) :
                  'User Has No Account Yet'
                }
              </p>
              
              {
                props.user.banned == true ? <Button color="primary" round onClick={unbanned}>Unbanned user</Button> : null
              }
           
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
Profile.layout = User;

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

  return {
    props: {
      userData,
    },
  };
}

export default Profile;
