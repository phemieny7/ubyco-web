import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import CheckIcon from '@material-ui/icons/Check';
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Success from "components/Typography/Success.js"
import Card from "components/Card/Card.js";

import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// import { useSession} from 'next-auth/client'
// import { useRouter } from 'next/router'
// import { useEffect } from 'react'

import Server from '../../api/lib/Server'

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Dashboard(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();	
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>people</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Users</p>
              <h3 className={classes.cardTitle}>
                {props.user_count}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Success>
                  <ArrowUpward />
                </Success>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  up by 5% today
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="dark">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>&#8358; {props.revenue}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
               All time Revenue
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Pending Trades</p>
              <h3 className={classes.cardTitle}>{props.pending}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked all Pending Trades
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      {/* Charts */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Gift cards Daily Exchanges</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="primary">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Crypto Daily Exchanges</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>


       </GridContainer>
      <GridContainer>
       <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Gift Card Rates</h4>
              {/* <p className={classes.cardCategoryWhite}>
               Last Updated 2 days ago
              </p> */}
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Brand", "Rate"]}
                tableData={
                  props.cardRate.map((name) => [name.id, name.name, name.rate]).sort()
                }
              />
            </CardBody>
          </Card>
        </GridItem>
      
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Crypto Exchange Rate</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Coins", "Rate"]}
                tableData={
                  props.coinRate.map((name) => [name.id, name.name, name.rate]).sort()
                }
              />
            </CardBody>
          </Card>
        </GridItem>
      
      </GridContainer>
    </div>
  );
}

Dashboard.layout = Admin;

export async function getStaticProps(){
  const userData = await Server.get('/admin/user');

  //fetch revenue
  const revenueData = await Server.get('/admin/revenue')
  //pending counter
  const pendingData = await Server.get('/admin/pending-trade')

  //card  grapht data
  const cardGraphData = await Server.get('/admin/weekly-card-exchange')

  //card rate data
  const cardRateData = await Server.get('/admin/card_rate')

  //card rate data
  const coinRateData = await Server.get('/admin/coin_rate')

  const user = await userData.data.message
  const revenue = await revenueData.data.message
  const pending = await pendingData.data.message
  const cardGraph = await cardGraphData.data.message
  const cardRate = await cardRateData.data.message
  const coinRate = await coinRateData.data.message

  // const cardGraphString= JSON.stringify(cardGraph)
 
  return {
    props: {
      user_count : user.length,
      revenue,
      pending,
      cardGraph,
      cardRate,
      coinRate,
    },
    revalidate: 10
  };
}

export default Dashboard;
