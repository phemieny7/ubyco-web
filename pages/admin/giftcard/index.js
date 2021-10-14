import React, { useState } from "react";
import Router from "next/router";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import LocalOffer from "@material-ui/icons/LocalOffer";
// layout for this page
import Admin from "layouts/Admin.js";
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

import MaterialTable from "material-table";
import Server from "../../api/lib/Server";
import { getSession } from "next-auth/client";
import moment from "moment";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Giftcard(props) {
  const useStyles = makeStyles(styles);
  const [transaction, setTransaction] = React.useState(props.card)
  const cardOptions = {};
  props.brand.map((option) => {
    const { id, name } = option;
    cardOptions[id] = name;
  });

  const updateRate = async(id, rate) => {
    console.log(rate)
    const res = await fetch("/api/change-rate", {
      body: JSON.stringify({
        id,
        rate
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT"
    })

  }
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardBody>
              <Button
                fullWidth
                color="info"
                onClick={() => Router.push("/admin/giftcard/rate")}
              >
                Rate
              </Button>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardBody color="warning">
              <Button
                fullWidth
                color="warning"
                onClick={() => Router.push("/admin/giftcard/histroy")}
              >
                Histroy
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* Crypto Cards Trade */}

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>
                Gift Card Trade Transaction
              </h4>
            </CardHeader>
            <CardBody>
              <MaterialTable
                columns={[
                  { title: "Customer ID", field: "user.customer_id", editable: false },
                  {
                    title: "Brand",
                    field: "card.card_id",
                    lookup: cardOptions,
                    editable: false
                  },
                  { title: "Card", field: "card.name", editable: false },
                  { title: "Rate", field: "rate"},
                  { title: "Status", field: "status_name.name", editable: false },
                  { title: "Amount", field: "amount", editable: false },
                  { title: "Total", field: "total" , editable: false},
                  {
                    title: "Date",
                    field: `created_at`,
                    editable: false,
                    render: (rowData) => moment(rowData.created_at).fromNow(),

                  },
                ]}
                data={transaction}
                title=""
                actions={[
                  {
                    icon: "visibility",
                    tooltip: "View Trade",
                    onClick: (event, rowData) => {
                      Router.push(`/admin/giftcard/${rowData.id}`);
                    },
                  },
                ]}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(async () => {
          
                        const dataUpdate = [...transaction];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        console.log(newData)
                        const id = dataUpdate[index].id;
                        const rate = dataUpdate[index].rate;
                        updateRate(id, rate);
                        setTransaction([...dataUpdate]);
                        resolve();
                      }, 1000);
                    }),
                }}
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

Giftcard.layout = Admin;
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

  if (session.user.role != 2) {
    return {
      props: {},
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
  const token = session?.accessToken;
  const cardTransaction = await Server.get("/admin/card", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchBrand = await Server.get("/admin/all_card", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const card = await cardTransaction.data.message;
  const brand = await fetchBrand.data.message;
  return {
    props: {
      card,
      brand,
    },
  };
}
export default Giftcard;
