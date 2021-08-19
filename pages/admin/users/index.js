import React, { useState } from "react";
import MaterialTable from "material-table";
import Router from "next/router";
import axios from "axios";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Success from "components/Typography/Success.js";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Server from "../../api/Server";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
const token ="NA.8CLdZK2WVnNpzQkmCxXT22MKM9flWULai47qR_8TFvSR0iLdgVAxLKSpbMDI";

function Users(props) {
  const useStyles = makeStyles(styles);
  const [data, setData] = React.useState(props.user);
  const classes = useStyles();
  const updateStatus = async () => {
    const res = await fetch('/api/user_status', {
      body: props.user.id
    },{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })

    const result = await res.json()
    console.log(result)
  }

    
  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="danger">
            <h4 className={classes.cardTitleWhite}>Users</h4>
            <p className={classes.cardCategoryWhite}>Last Updated 2 days ago</p>
          </CardHeader>
          <CardBody>
            <MaterialTable
              columns={[
                {
                  title: "Name",
                  field: "fullname",
                  editable: "never",
                },
                {
                  title: "Customer ID",
                  field: "customer_id",
                  editable: "never",
                },
                { title: "Phone", field: "phone", editable: "never" },
                {
                  title: "Status",
                  field: "banned",
                  lookup: { false: "Active", true: "Banned" },
                },
                {
                  title: "Available Amount",
                  field: "userAmount.amount",
                  editable: "never",
                },
              ]}
              data={data}
              title=""
              editable={{
                onRowUpdate:(newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(async() => {
                      
                      const dataUpdate = [...data];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      setData([...dataUpdate]);
                      resolve();
                      updateStatus()
                    }, 1000);
                  }),
              }}
              actions={[
                {
                  icon: "visibility",
                  tooltip: "View User",
                  onClick: (event, rowData) =>
                    Router.push(`/admin/users/${rowData.id}`),
                },
              ]}
              options={{
                actionsColumnIndex: -1,
              }}
            />
          </CardBody>
          {/* <CardFooter stats>
              <div className={classes.stats}>
                <Success>
                  <ArrowUpward />
                </Success>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  up by 5% today
                </a>
              </div>
            </CardFooter> */}
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Users.layout = Admin;
export async function getStaticProps() {
  
  const userData = await Server.get("/admin/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await userData.data.message;

  return {
    props: {
      user,
    },
    revalidate: 10,
  };
}
export default Users;
