import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Router from "next/router";
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
import Server from "../../api/lib/Server";
import { getSession } from "next-auth/client";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
function Users(props) {
  const useStyles = makeStyles(styles);
  const [data, setData] = React.useState(props.user);
  const classes = useStyles();
  const updateStatus = async (id, status) => {
    const res = await fetch("/api/user_status", {
      body: JSON.stringify({
        id,
        status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    Router.reload(window.location.pathname);
  };

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
                {
                  title: "Email",
                  field: "email",
                  editable: "never",
                },
                { title: "Phone", field: "phone", editable: "never" },
                {
                  title: "Status",
                  field: "banned",
                  lookup: { false: "Active", true: "Banned" },
                },
                {
                  title: "Verified",
                  field: "is_verified",
                  lookup: { false: "Not Verified", true: "Confirmed" },
                  editable: "never",
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
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(async () => {
                      const dataUpdate = [...data];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      const id = dataUpdate[index].id;
                      const status = dataUpdate[index].banned;
                      setData([...dataUpdate]);
                      resolve();
                      updateStatus(id, status);
                    }, 1000);
                  })
              }}
              actions={[
                {
                  icon: "visibility",
                  tooltip: "View User",
                  onClick: (event, rowData) => {
                    if (rowData.is_verified == true) {
                      Router.push(`/admin/users/${rowData.id}`);
                    }
                    null
                  },
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
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const token = session?.accessToken;
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
  };
}
export default Users;
