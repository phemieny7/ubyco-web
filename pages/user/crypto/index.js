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


// layout for this page
import User from "layouts/User.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Table from "components/Table/Table.js";
import Success from "components/Typography/Success.js";
import Danger from "components/Typography/Danger.js";

import Card from "components/Card/Card.js";
import { getSession } from "next-auth/client";
import Server from "../../api/lib/Server";

import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BiBitcoin } from "react-icons/bi";

import Button from "components/CustomButtons/Button.js";

var FormData = require("form-data");
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
  img: {
    width: "230px",
    height: "300px",
    objectFit: "cover",
    padding: "0.75rem",
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

function Crypto(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  //card and type selected value
  const [brandValue, setBrandValue] = React.useState("");
  const [rate, setRate] = React.useState(0);
  const [wallet, setWallet] = React.useState("null");
  const [id, setId] = React.useState("");
  //amount state
  const [amount, setAmount] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  //when brand is selected
  const onBrandSelect = async (event) => {
    setImage(null);
    setImageUrl(null);
    setBrandValue(event.target.value);
    setAmount("");
    setTotal(0);
    const res = props.coins.find((coin) => coin.id === event.target.value);
    setId(res.id);
    setWallet(res.wallet);
    setRate(res.rate);
  };

  const qrCode = ({ src, width, quality }) => {
    return `https://www.bitcoinqrcodemaker.com/api/?style=bitcoin&prefix=on&address=${src}`;
  };
  //when price changes multiply the amount by the rate
  const priceChange = async (event) => {
    setAmount(event.target.value);
    const sum = Number(event.target.value * rate);
    setTotal(sum);
  };

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    // console.log(e.target.files[0])
  };

  const renderPhotos = (source) => {
    return <img src={source} style={styles.img} alt="" />;
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    console.log(image);
    if (
      brandValue === "" ||
      amount === 0 ||
      wallet === "null" ||
      image === null
    ) {
      toast.error("Please enter a valid Data");
      return;
    }
    toast.info("Submitting Trade");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("id", id);
    formData.append("rate", rate);
    formData.append("amount", amount);
    formData.append("comment", comment);

    const response = await axios.post(
      "/api/user/initiate-coin-trade",
      formData
    );
    if (response.status === 200) {
      setTimeout(() => {
        toast.success("Trade Submitted");
      }, 2000);
        setId("");
        setAmount(0);
        setComment("");
        setTotal(0);
        setImage(null);
        setRate(0);
        setBrandValue("");
        setWallet("null");
        setImageUrl(null);
        // window.location.reload();
    } else {
      toast.error("Error Submitting Trade");
    }
    window.location.reload();

  };

  let successTradeCount = []
  let pendingTradeCount = []
  let failedTradeCount = []


  for(let i = 0; i < props.coinTransactions.length; i++){
    if(props.coinTransactions[i].completed === true){
      successTradeCount.push(props.coinTransactions[i])
    }
    if(props.coinTransactions[i].status === 1){
      pendingTradeCount.push(props.coinTransactions[i])
    }
    if(props.coinTransactions[i].status === 2){
      failedTradeCount.push(props.coinTransactions[i])
    }
  }

  return (
    <div>
      <ToastContainer/>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <BiBitcoin />
              </CardIcon>
              {/* <p className={classes.cardCategory}>Success</p> */}
              <h3 className={classes.cardTitle}>
                {successTradeCount.length > 0 ? successTradeCount.length : 0}
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
                <BiBitcoin />
              </CardIcon>
              <h3 className={classes.cardTitle}>
                {pendingTradeCount.length}
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
                <BiBitcoin />
              </CardIcon>
              <h3 className={classes.cardTitle}>
                {failedTradeCount.length}
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
              <h4 className={classes.cardTitleWhite}>Trade Coin</h4>
              <p className={classes.cardCategoryWhite}>
                Kindly select all required
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
                        Coin
                      </InputLabel>
                      <Select
                        label="Coin"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={brandValue}
                        onChange={(e) => onBrandSelect(e)}
                        required
                      >
                        {props.coins.length > 0
                          ? props.coins.map((coin) => (
                              <MenuItem value={coin.id} key={coin.id}>
                                <p>{coin.name}</p>
                              </MenuItem>
                            ))
                          : 0}
                      </Select>
                    </FormControl>
                  </GridItem>

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
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Total"
                      id="total"
                      placeholder="0"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={total}
                      inputProps={{
                        type: "number",
                        value: total,
                        disabled: true,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={6} md={6}>
                    <InputLabel style={{ color: "#AAAAAA" }}>
                      Upload coin receipt
                    </InputLabel>
                    <input
                      className="form-control"
                      type="file"
                      id="formFileMultiple"
                      accept="image/*"
                      onChange={onImageChange}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <InputLabel style={{ color: "#AAAAAA", marginTop: "5px" }}>
                      Comments
                    </InputLabel>
                    <CustomInput
                      id="comment"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 3,
                        onChange: (e) => setComment(e.target.value),
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <InputLabel style={{ color: "#AAAAAA" }}>Adress</InputLabel>
                    <div style={{ marginTop: "10px" }}>
                      <Image
                        loader={qrCode}
                        src={wallet}
                        alt={"address"}
                        width={200}
                        height={200}
                      />
                    </div>
                    {wallet !== "null" ? (
                      <p>{wallet}</p>
                    ) : (
                      <p>Select a Coin to generate address</p>
                    )}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <div>{renderPhotos(imageUrl)}</div>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="danger">
                  Trade Coin
                </Button>
                <p className="danger" color="danger">
                  <strong>Note: </strong> Only app screenshot of transaction
                  should be upload
                </p>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
Crypto.layout = User;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const token = session?.accessToken;
  const user = await Server.get("/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!session || user.status === 401) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const coin = await Server.get("/user/coin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const transactions = await Server.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const coinTransactions = transactions.data.message.coinTransaction;
  const coins = coin.data.message;
  return {
    props: {
      coins,
      coinTransactions,
    },
  };
}
export default Crypto;
