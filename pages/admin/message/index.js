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

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Index(props) {
  const [data, setData] = useState([{
    id: 1,
    customer: 'CUS_1232434',
    category: 'Gift Card',
    status: 'Open',
    received: 'Two Days Ago',
    updated: '2 minutes ago'
  },
  {
    id: 2,
    customer: 'CUS_1232434',
    category: 'Crypto',
    status: 'Awaiting Customer reply',
    received: 'Four Days Ago',
    updated: '2 days ago'
  },
  {
    id: 3,
    customer: 'CUS_1232334',
    category: 'Gift Card',
    status: 'Open',
    received: 'Two Days Ago',
    updated: '2 minutes ago'
  }
])
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>
                All messages
              </h4>
            </CardHeader>
            <CardBody>
              <MaterialTable
                columns={[
                  { title: "Customer ID", field: "customer" },
                  { title: "Category", field: "category" },
                  { title: "Status", field: "status" },
                  { title: "Last updated", field: "updated" },
                  { title: "receive", field: "received" },
                ]}
                data={data}
                title=""
                actions={[
                  {
                    icon: "message",
                    tooltip: "View Message",
                    onClick: (event, rowData) => {
                      Router.push(`/admin/message/${rowData.id}`);
                    },
                  },
                ]}
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

Index.layout = Admin;
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
  const card = await cardTransaction.data.message;
  return {
    props: {
      card,
    },
  };
}
export default Index;
