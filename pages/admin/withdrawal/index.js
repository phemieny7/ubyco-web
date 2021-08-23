import React, { useState } from "react";
import MaterialTable from "material-table";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Success from "components/Typography/Success.js"
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

import Server from "./../../api/lib/Server"
import {useRouter} from 'next/router'
function WithDrawal(props) {
  const [data, setData] = useState(props.withdrawal);
  const useStyles = makeStyles(styles);
  const Router = useRouter()
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>User Withdrawal request</h4>
          </CardHeader>
          <CardBody>
            <MaterialTable
              columns={[
                {
                  title: "Name",
                  field: "user.fullname",
                  editable: 'never',
                },
                { title: "Customer ID", field: "user.customer_id", editable: 'never', },
                { title: "Phone", field: "user.phone", editable: 'never', },
                { title: "Available Amount", field: "userAmount.amount", editable: 'never',},
                {title: "Withdraw Request", field:'amount', editable: 'never',},
                {title: "status", field:"status_name.name"}
              ]}
              data={data}
              title=""

              actions={[
                {
                  icon: "visibility",
                  tooltip: "View User",
                  onClick: (event, rowData) =>
                    Router.push(`/admin/withdrawal/${rowData.id}`),
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
  );
}

WithDrawal.layout = Admin;

export async function getStaticProps() {
  
  const userData = await Server.get("/admin/withdrawal");

  const withdrawal = await userData.data.message;

  return {
    props: {
      withdrawal,
    },
    revalidate: 10,
  };
}
export default WithDrawal;
