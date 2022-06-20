import React, { useState } from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import { BiBitcoin } from "react-icons/bi";
import { MdCardGiftcard } from "react-icons/md";

import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";

import ArrowUpward from "@material-ui/icons/ArrowUpward";

// layout for this page
import User from "layouts/User.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Success from "components/Typography/Success.js";
import Card from "components/Card/Card.js";

import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import MaterialTable from "material-table";
import Server from "../../api/lib/Server";
import { getSession } from "next-auth/client";
import moment from "moment";

import { GiBanknote } from "react-icons/gi";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Transaction(props) {
  const useStyles = makeStyles(styles);
  const coinOptions = {};
  props.coinBrand.map((option) => {
    const { id, name } = option;
    coinOptions[id] = name;
  });

  const cardOptions = {};
  props.cardBrand.map((option) => {
    const { id, name } = option;
    cardOptions[id] = name;
  });
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <GiBanknote />
              </CardIcon>
              <p className={classes.cardCategory}>Available Balance</p>
              <h3 className={classes.cardTitle}>
                &#8358;{props.user.userAmount !== null ? props.user.userAmount.amount: 0}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Success>
                  <ArrowUpward />
                </Success>
                <a href="transactions/withdrawal">View All Withdrawal</a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="dark">
                <BiBitcoin />
              </CardIcon>
              <p className={classes.cardCategory}>Crypto Trades</p>
              <h3 className={classes.cardTitle}>
                {props.user.coinTransaction.length}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                <a href="transactions/crypto">View all Cryto Transactions</a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <MdCardGiftcard />
              </CardIcon>
              <p className={classes.cardCategory}>Gift Card Trades</p>
              <h3 className={classes.cardTitle}>
                {props.user.cardTransaction.length}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                <a href="transactions/giftcard">View All Giftcard Transactions</a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Transaction.layout = User;
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
  const userData = await Server.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await userData.data.message;

  const fetchBrand = await Server.get("/user/coin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const coinBrand = await fetchBrand.data.message;

  const fetchCard = await Server.get("/user/card", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const cardBrand = await fetchCard.data.message;
  // console.log(cardBrand.);

  return {
    props: {
      user,
      coinBrand,
      cardBrand
    },
  };
}

export default Transaction;
