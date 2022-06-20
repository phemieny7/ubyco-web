import React,{useState} from "react";
import Router from "next/router";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import LocalOffer from "@material-ui/icons/LocalOffer";
// layout for this page
import User from "layouts/User.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import moment from 'moment'

// import { bugs, website, server } from "variables/general.js";

import MaterialTable from "material-table";
import Server from '../../../api/lib/Server'
import { getSession } from "next-auth/client";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Index(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <div>
        

      {/* Crypto Cards Trade */}

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>All Withdrawals</h4>
            </CardHeader>
            <CardBody>
            <MaterialTable
                columns={[
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
                ]}
                data={props.user.userWithdrawal}
                title=""
                // actions={[
                //   {
                //     icon: "visibility",
                //     tooltip: "View Trade",
                //     onClick: (event, rowData) => {
                //       Router.push(`#`);
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
  

    </div>
  );
}

Index.layout = User;
export async function getServerSideProps(context){
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  const token = session?.accessToken;
  const userData = await Server.get('/user',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const user = await userData.data.message
  const fetchBrand = await Server.get("/user/card", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const brand = await fetchBrand.data.message;
  return {
    props: {
      user,
      brand
    }
  };
}
export default Index;