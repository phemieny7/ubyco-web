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
import Card from "components/Card/Card.js";

import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Server from "../../api/lib/Server";
import Danger from "components/Typography/Danger.js";
import { ToastContainer, toast } from "react-toastify";


// import Button from "@material-ui/core/Button";
import Button from "components/CustomButtons/Button.js";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";

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

function Account(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [bank, setBank] = React.useState("");
  const [bankCode, setBankCode] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [accountName, setAccountName] = React.useState("");
  const [submit, setSubmit] = React.useState(true)

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const handleChange = (event) => {
    setBank(event.target.value);
    setBankCode("");
    setAccountNumber("");
    props.bank.find((item) => {
      item.name === event.target.value ? setBankCode(item.code) : null;
    });
  };

  const formSubmit = async() => {
    toast.info("Updating account information...");
    const data = {bank, bankCode, accountName, accountNumber};
    const res = await fetch("/api/user/add-account", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (res.status < 300) {
      toast.success("Account information updated successfully!");
      // refreshData();
    } else {
      toast.error("Failed to update account information!");
    }
    refreshData();
  };

  const deleteAccount = async(id) => {
    toast.info("Deleting account...");
    const res = await fetch("/api/user/delete-account", {
      body: JSON.stringify({
        id
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (res.status < 300) {
      toast.success("Account deleted");
      refreshData();
    } else {
      toast.error("Error deleting account");
    }
  }


  // const deleteAccount = (id) => {
  //   Server.delete(`/user/delete-account/${id}`)
  //     .then((res) => {
  //       toast.success("Account deleted successfully");
  //       props.setAccounts(res.data);
  //     })
  //     .catch((err) => {
  //       toast.error(err.message);
  //     });
  // }

  const handleChangeAccount = async (event) => {
    setAccountNumber(event.target.value);
    setAccountName("");
    if(event.target.value.length === 10) {
      toast.info("Checking account number...");
      const res = await fetch("/api/user/get-account", {
        body: JSON.stringify({
          account_number: event.target.value,
          bank_code : bankCode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      if (res.status < 300){
      toast.success("Account Found");
      const data = await res.json();
        setAccountName(data.data);
        setSubmit(false)
      }else {
        toast.error("Account number not found");
        setAccountName("")
        setAccountNumber("")
        setBank("")
        setBankCode("")
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      <GridContainer>
        {props.userData.userAccounts.length > 0
          ? props.userData.userAccounts.map((account) => (
              <GridItem xs={12} sm={6} md={4} key={account.id}>
                <Card>
                  <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                      <BsBank />
                    </CardIcon>
                    <p className={classes.cardTitle}>
                      {account.account_name}
                      <br />
                      <small>{account.account_number}</small>
                      <br />
                      {account.bank}
                    </p>
                  </CardHeader>
                  <CardFooter>
                    <Button color="danger" onClick={()=>deleteAccount(account.id)}>Remove Account</Button>
                  </CardFooter>
                </Card>
              </GridItem>
            ))
          : null}
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
              onSubmit={() => formSubmit()}
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
                        value={bank}
                        onChange={handleChange}
                      >
                        {props.bank.map((account) => (
                          <MenuItem value={account.name} key={account.id}>
                            <p>{account.name}</p>
                          </MenuItem>
                        ))}
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
                        onChange: (e) => handleChangeAccount(e),
                        value: accountNumber,
                        required: true,
                        minLength: 10,
                        maxLength: 11,
                      }}
                    />
                    {/* <Button color="primary" type="submit" title="Check Account"/> */}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Account Name"
                      id="accountName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        // onChange: (e) => handleChangeAccount(e),
                        value: accountName,
                        disabled: true,
                        // required: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="danger"  type="submit" disabled={submit}>Add Account</Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
Account.layout = User;

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
  const getBank = await Server.get("/list-banks");
  const bank = getBank.data.message;
  const userData = user.data.message;
  // console.log(bank)

  return {
    props: {
      bank,
      userData,
    },
  };
}

export default Account;
