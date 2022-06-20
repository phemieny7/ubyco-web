import React, { useState } from "react";
import Error from 'next/error'

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

import {useRouter} from 'next/router'

function Dashboard(props) {
  const router = useRouter()
  
  const useStyles = makeStyles(styles);
  const coinOptions = {};
  props.coinBrand.map((option) => {
    const { id, name } = option;
    coinOptions[id] = name;
  });

  // let coinBrand = coinOptions[props.coinBrand[0].id];
  let cardOptions = {};
  let cardName = {}
  props.cardBrand.map((option) => {
    const { id, name, cardTypes } = option;
    cardTypes.map((card) => { return (
      cardName[card.id] = card.name,
      cardOptions[card.id] = option.name
      )}) 
  });
  

  // console.log(cardOptions[2]);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
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
              <p className={classes.cardCategory}>Crypto Trades</p>
              <h3 className={classes.cardTitle}>
                {props.user.coinTransaction.length}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                All times trade
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
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
                All time trade
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      {/* Charts */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Gift Card Transaction</h4>
            </CardHeader>
            <CardBody>
              <MaterialTable
                columns={[
                  {
                    title: "Brand",
                    field: "card_type_id",
                    lookup: cardOptions,
                    editable: false
                  },
                  {
                    title: "Type",
                    field: "card_type_id",
                    lookup: cardName,
                    editable: false,
                  },
                  // { title: "Card", field: "card.name", editable: false },
                  { title: "Amount", field: "amount", editable: "never" },
                  {
                    title: "Date",
                    field: `created_at`,
                    render: (rowData) => moment(rowData.created_at).fromNow(),
                  },

                  {
                    title: "Status",
                    field: "status",
                    lookup: {
                      1: "Pending",
                      2: "Processing",
                      3: "Fault Trade",
                      4: "Completed",
                    },
                  },
                  {
                    title: "Total",
                    field: "total",
                    render: (rowData) => rowData.amount * rowData.rate,
                  },
                ]}
                data={props.user.cardTransaction}
                title=""
                // actions={[
                //   {
                //     icon: "visibility",
                //     tooltip: "View Trade",
                //     onClick: (event, rowData) => {
                //       Router.push(`/giftcard/${rowData.id}`);
                //     },
                //   },
                // ]}
                options={{
                  actionsColumnIndex: -1,
                }}
              />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Crypto Transaction</h4>
            </CardHeader>
            <CardBody>
            <MaterialTable
                columns={[
                  {
                    title: "Coin",
                    field: "coin_id",
                    lookup: coinOptions,
                    editable: "never",
                  },

                  { title: "Amount", field: "amount", editable: "never" },
                  {
                    title: "Date",
                    field: `created_at`,
                    render: (rowData) => moment(rowData.created_at).fromNow(),
                  },

                  {
                    title: "Status",
                    field: "status",
                    lookup: {
                      1: "Pending",
                      2: "Processing",
                      3: "Fault Trade",
                      4: "Completed",
                    },
                  },
                  {
                    title: "Total",
                    field: "total",
                  },
                ]}
                data={props.user.coinTransaction}
                title=""
                // actions={[
                //   {
                //     icon: "visibility",
                //     tooltip: "View Trade",
                //     onClick: (event, rowData) => {
                //       Router.push(`/user/transaction/crypto/${rowData.id}`);
                //     },
                //   },
                // ]}
                options={{
                  actionsColumnIndex: -1,
                }}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Gift Card Rates</h4>
              <p className={classes.cardCategoryWhite}>
                Last Updated 2 days ago
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Brand", "Card", "Rate"]}
                tableData={[
                  ["1", "Apple", "Itunes Card 100 - 200", "400"],
                  ["2", "Google", "Google Play", "200"],
                  ["3", "Vanila Card", "Vanilla 200", "300"],
                  ["4", "Apple", "Itunes 400- 1000", "390"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Crypto Exchange Rate</h4>
              <p className={classes.cardCategoryWhite}>
                Last Updated 2 days ago
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Coins", "Rate"]}
                tableData={[
                  ["1", "BTC", "500"],
                  ["2", "Litecoin", "350"],
                  ["3", "Dodgecoin", "430"],
                  ["4", "Etherum", "560"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

Dashboard.layout = User;
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
  // console.log(user)

  const fetchBrand = await Server.get("/user/coin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const coinBrand = await fetchBrand.data.message;

  const fetchCard = await Server.get("/user/all_card", {
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

export default Dashboard;
