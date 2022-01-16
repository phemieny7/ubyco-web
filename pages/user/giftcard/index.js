import React, { useState, useEffect } from "react";

// @material-ui/core
import { makeStyles, withStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";

import CustomInput from "components/CustomInput/CustomInput.js";
import MenuItem from "@material-ui/core/MenuItem";

// @material-ui/icons

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
// import Button from "@material-ui/core/Button";
import Button from "components/CustomButtons/Button.js";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GiBanknote } from "react-icons/gi";
import { grey } from "@material-ui/core/colors";
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
    width: "120px",
    height: "60px",
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

function Giftcard(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  //card and type selected value
  const [brandValue, setBrandValue] = React.useState("");
  const [brandId, setBrandId] = React.useState("");
  const [typeValue, setTypeValue] = React.useState("");
  const [typeId, setTypeId] = React.useState("");
  const [rate, setRate] = React.useState("");

  const [type, setType] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  //amount state
  const [amount, setAmount] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [total, setTotal] = React.useState("");
  const [images, setImage] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState([]);

  //when brand selected
  const cardBrandSelect = async (event) => {
    setBrandValue(event.target.value);
    setAmount("");
    setTotal(0);
    setImage([]);
    const res = props.cards.find((card) => card.id === event.target.value);
    setType(res.cardTypes);
  };

  const cardTypeSelect = async (event) => {
    setTypeValue(event.target.value);
    setAmount("");
    setTotal(0);
  };

  //when price changes multiply the amount by the rate
  const priceChange = async (event) => {
    setAmount(event.target.value);
    const value = type.find((card) => card.id === typeValue);
    if (type.length == 0 || typeValue == "") {
      alert("Please select a Brand and card type");
    } else if (value.rate == "0") {
      setTotal("We are not accepting this card at this time");
    } else {
      setTypeId(value.id);
      setRate(value.rate);
      const sum = Number(event.target.value * value.rate);
      setTotal(sum);
    }
  };

  const onImageChange = (e) => {
    setImage([]);
    setImageUrl([]);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setImage(e.target.files);

      setImageUrl((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return <img src={photo} style={styles.img} alt="" key={photo} />;
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    console.log(images);
    if (
      brandValue === "" ||
      amount === 0 ||
      typeId === "null" ||
      images === null
    ) {
      toast.error("Please enter a valid Data");
      return;
    }
    toast.info("Please wait while we process your request");
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append(`card${[i]}`, images[i]);
    }
    formData.append("image", images);
    formData.append("id", typeId);
    formData.append("rate", rate);
    formData.append("amount", amount);
    formData.append("comment", comment);

    const response = await axios.post(
      "/api/user/initiate-card-trade",
      formData
    );
    if (response.status === 200) {
      setTimeout(() => {
        toast.success("Trade Submitted");
      }, 2000);
      setTypeId("");
      setAmount(0);
      setComment("");
      setTotal(0);
      setImage([]);
      setRate(0);
      setBrandValue("");
      setTypeValue("");
      setImageUrl([]);

      window.location.reload();
    } else {
      toast.error("Error Submitting Trade");
    }
  };
  let successTradeCount = [];
  let pendingTradeCount = [];
  let failedTradeCount = [];

  for (let i = 0; i < props.cardTransactions.length; i++) {
    if (props.cardTransactions[i].completed === true) {
      successTradeCount.push(props.cardTransactions[i]);
    }
    if (props.cardTransactions[i].status === 1) {
      pendingTradeCount.push(props.cardTransactions[i]);
    }
    if (props.cardTransactions[i].status === 2) {
      failedTradeCount.push(props.cardTransactions[i]);
    }
  }

  return (
    <div>
      <ToastContainer />
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <GiBanknote />
              </CardIcon>
              {/* <p className={classes.cardCategory}>Success</p> */}
              <h3 className={classes.cardTitle}>
                {successTradeCount.length > 0 ? successTradeCount.length : 0}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Success>Successful</Success>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="rose" stats icon>
              <CardIcon color="rose">
                <GiBanknote />
              </CardIcon>
              <h3 className={classes.cardTitle}>{pendingTradeCount.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>Pending</Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}></a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="dark">
                <GiBanknote />
              </CardIcon>
              <h3 className={classes.cardTitle}>{failedTradeCount.length}</h3>
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
              <h4 className={classes.cardTitleWhite}>Trade Gift Cards</h4>
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
                        Brand
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={brandValue}
                        onChange={(e) => cardBrandSelect(e)}
                        required
                      >
                        {props.cards.length > 0
                          ? props.cards.map((card) => (
                              <MenuItem value={card.id} key={card.id}>
                                <p>{card.name}</p>
                              </MenuItem>
                            ))
                          : 0}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel
                        id="demo-simple-select-label"
                        className={classes.formTitle}
                      >
                        Card Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={typeValue}
                        onChange={(e) => cardTypeSelect(e)}
                        required
                      >
                        {type.length > 0 ? (
                          type.map((card) => (
                            <MenuItem value={card.id} key={card.id}>
                              <p>{card.name}</p>
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>
                            <p>Not Available</p>
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
                        min: 0,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      // labelText="Total"
                      id="total"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: total,
                        disabled: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Comment"
                      id="comment"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 3,
                        value: comment,
                        onChange: (e) => setComment(e.target.value),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <InputLabel style={{ color: "#AAAAAA" }}>
                      Upload Giftcard
                    </InputLabel>
                    <br />
                    <input
                      className="form-control"
                      type="file"
                      id="formFileMultiple"
                      multiple
                      accept="image/*"
                      onChange={onImageChange}
                    />
                    <GridContainer>
                      {imageUrl !== null ? (
                        <div className="form-group multi-preview">
                          <div className="result">{renderPhotos(imageUrl)}</div>
                        </div>
                      ) : null}
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="danger" type="submit" disabled={loading}>
                  Trade Card
                </Button>
                <p className="danger" color="danger">
                  <strong>Note: </strong> Terms and Conditions apply's
                </p>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
Giftcard.layout = User;

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
  await fetch(`${process.env.NEXTAUTH_URL}/api/check-user`)
  
  const token = session?.accessToken;
  const user = await Server.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const card = await Server.get("/user/card", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  

  const cards = card.data.message;
  const cardTransactions = user.data.message.cardTransaction;

  return {
    props: {
      cards,
      cardTransactions,
    },
  };
}
export default Giftcard;
