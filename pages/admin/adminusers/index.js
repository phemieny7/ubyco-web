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

  const updateAdmin = async (id, email, phone, fullname, banned) => {
    const data = {id, email, phone, fullname, banned}
    const res = await fetch("/api/update-admin", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
  };

  const createAdmin = async (email, phone, fullname) => {
    const data = {email, phone, fullname}
    const res = await fetch("/api/create-admin", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  
  const deleteAdmin = async (id) => {
    const res = await fetch("/api/delete-admin", {
      body: JSON.stringify({
        id
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="danger">
            <h4 className={classes.cardTitleWhite}>Admin Users</h4>
            <p className={classes.cardCategoryWhite}></p>
          </CardHeader>
          <CardBody>
            <MaterialTable
              columns={[
                {
                  title: "Name",
                  field: "fullname",
                },
                { title: "Phone", field: "phone" },
                {
                  title: "Status",
                  field: "banned",
                  lookup: { false: "Active", true: "Banned" },
                },
                {
                  title: "Email",
                  field: "email",
                },
              ]}
              data={data}
              title=""
              editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        setData([...data, newData]);
                        const { email, phone, fullname } = newData;
                        createAdmin(email, phone, fullname);
                        resolve();
                      }, 1000);
                    }),

                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(async () => {
                      const dataUpdate = [...data];
                      const index = oldData.tableData.id;
                      dataUpdate[index] = newData;
                      const{id, banned, email,phone,fullname} = dataUpdate[index]
                      setData([...dataUpdate]);
                      resolve();
                      updateAdmin(id, email, phone, fullname, banned);
                    }, 1000);
                  }),

                  onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataDelete = [...data];
                      const index = oldData.tableData.id;
                      const pending = dataDelete.splice(index, 1);
                      const {id} = pending[0];
                      deleteAdmin(id)
                      setData([...dataDelete]);
                      resolve()
                    }, 1000)
                  }),
              }}
             
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
  const userData = await Server.get("/admin/adminuser", {
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
