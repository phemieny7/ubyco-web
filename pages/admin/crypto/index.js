import React,{useState} from "react";
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

// import { bugs, website, server } from "variables/general.js";

import MaterialTable from "material-table";
import Server from '../../api/lib/Server'
import { getSession } from "next-auth/client";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Crypto(props) {
  const useStyles = makeStyles(styles);
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
                onClick={() => Router.push("/admin/crypto/rate")}
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
                // onClick={() => showNotification("tl")}
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
            <h4 className={classes.cardTitleWhite}>Crypto Trade Transaction</h4>
          </CardHeader>
          <CardBody>
            <MaterialTable
              columns={[
                { title: "Customer ID", field: "user.customer_id" },
                { title: "Brand", field: "coin.name"},
                { title: "Rate", field: "coin.rate"},
                { title: "Status", field: "status_name.name"},
                { title: "Amount", field: "amount"},
              ]}
              data={props.coin}
              title=""
              actions={[
                {
                  icon: 'visibility',
                  tooltip: 'View Trade',
                  onClick: (event, rowData) => {Router.push(`/admin/crypto/${rowData.id}`)}
                },
              ]}
              options={{
                actionsColumnIndex: -1
              }}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  

    </div>
  );
}

Crypto.layout = Admin;
export async function getServerSideProps(context){
  const session = await getSession(context);
  console.log(session)
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  if (session.user.role != 2){
    return {
      props: {},
      redirect: {
        destination: '/error',
        permanent: false
      }
    };
  }
  const token = session?.accessToken;
  const coinTransaction = await Server.get('/admin/coin',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const coin = await coinTransaction.data.message
  return {
    props: {
      coin,
    }
  };
}
export default Crypto;
