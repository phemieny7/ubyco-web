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
import Button from "components/CustomButtons/Button.js";

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import { getSession } from "next-auth/client";
import Server from "./../../api/lib/Server"
import {useRouter} from 'next/router'
import moment from "moment";
function WithDrawal(props) {
  const [data, setData] = useState(props.withdrawal);
  const useStyles = makeStyles(styles);
  const Router = useRouter()
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
                onClick={() => Router.push("/admin/withdrawal")}
              >
                All Active Withdrawal
              </Button>
            </CardBody>
           </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
        <Card>
            <CardBody color="warning">
              <Button
                fullWidth
                color="success"
                onClick={() => Router.push("/admin/withdrawal/failed")}
              >
               Completed Withdrawal
              </Button>
            </CardBody>
           </Card>
        </GridItem>
       </GridContainer>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>failed Withdrawal request</h4>
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
                {
                  title: "Date",
                  field: `created_at`,
                  render: (rowData) => moment(rowData.created_at).fromNow(),
                },
                // { title: "Available Amount", field: "userAmount.amount", editable: 'never',},
                {title: "Withdraw Request", field:'amount', editable: 'never',},
                {title: "status", field:"status_name.name", editable: 'never',},
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
    </div>
  );
}

WithDrawal.layout = Admin;

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
    
  const userData = await Server.get("/admin/successwithdrawal",{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const withdrawal = await userData.data.message;

  return {
    props: {
      withdrawal,
    }
  };
}
export default WithDrawal;
