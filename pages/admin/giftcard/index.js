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

import MaterialTable from "material-table";
import Server from '../../api/lib/Server'

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

function Giftcard(props) {
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
            <h4 className={classes.cardTitleWhite}>Gift Card Trade Transaction</h4>
          </CardHeader>
          <CardBody>
            <MaterialTable
              columns={[
                { title: "Customer ID", field: "user.customer_id" },
                { title: "Brand", field: "card.name"},
                { title: "Rate", field: "card.rate"},
                { title: "Status", field: "status_name.name"},
                { title: "Amount", field: "amount"},
                { title: "Total", field: "total"},
              ]}
              data={props.card}
              title=""
              actions={[
                {
                  icon: 'visibility',
                  tooltip: 'View Trade',
                  onClick: (event, rowData) => {Router.push(`/admin/giftcard/${rowData.id}`)}
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

Giftcard.layout = Admin;
export async function getStaticProps(){
  const cardTransaction = await Server.get('/admin/card')
  const card = await cardTransaction.data.message
  return {
    props: {
      card,
    },
    revalidate: 10
  };
}
export default Giftcard;
