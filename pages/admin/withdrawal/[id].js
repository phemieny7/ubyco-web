import React, { useState } from "react";
import MaterialTable from "material-table";
import CardIcon from "components/Card/CardIcon.js";

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
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import moment from 'moment'

import { getSession } from "next-auth/client";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

import Server from "./../../api/lib/Server";
import { useRouter } from "next/router";
function WithDrawal(props) {
  const [data, setData] = useState(props.withdrawal);
  const useStyles = makeStyles(styles);
  const Router = useRouter();
  const classes = useStyles();
  const initiateWithdrawal = async () => {
    const res = await fetch("/api/initiate-withdrawal", {
      body: JSON.stringify({
        id: data.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
  };
  const verifyWithdrawal = async() =>{
    const res = await fetch("/api/verify-withdrawal", {
      body: JSON.stringify({
        id: data.id
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT"
    })
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader>
              <p className={classes.cardCategory}>User Details</p>
              <p>Name: {data.user.fullname}</p>
              <p>Phone: {data.user.phone}</p>
              <p>Customer_id: {data.user.customer_id}</p>
            </CardHeader>

            <CardFooter stats>
              <div className={classes.stats}>
                Customer Id is used by paystack to process payment
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader>
              <p className={classes.cardCategory}>Withdrawal Details</p>
              <p>Amount: {data.amount}</p>
              <p>Available Balance: {data.userAmount.amount}</p>
              <p>Status: {data.status_name.name}</p>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {data.completed == true
                  ? "This transaction has been completed"
                  : "Yet to be completed"}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader>
              <p className={classes.cardCategory}>Bank Details</p>
              <p>Bank Name: {data.account.bank}</p>
              <p>Available Balance: {data.account.account_number}</p>
              <p>Bank Code: {data.account.bank_code}</p>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {data.completed == true
                  ? "This transaction has been completed"
                  : "Yet to be completed"}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        {data.receipt == null && data.completed == false ? (
          <>
            <GridItem xs={12} sm={6} md={4}>
              <Button
                color="warning"
                fullWidth
                onClick={() => {
                  initiateWithdrawal();
                }}
              >
                Generate Receipt
              </Button>
            </GridItem>

            <GridItem xs={12} sm={6} md={4}>
              <Button
                color="danger"
                fullWidth
                onClick={() => {
                  initiateWithdrawal();
                }}
              >
               Decline Withdrawal
              </Button>
            </GridItem>
          </>
        ) : null}
        {data.receipt != null && data.completed == false ?
          <>
            <GridItem xs={12} sm={6} md={4}>
              <Button color="success" onClick={()=>{verifyWithdrawal()}} fullWidth>
                Confirm Payment
              </Button>
            </GridItem>
          </>
         : null}
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>
                User Past Withdrawals records
              </h4>
            </CardHeader>
            <CardBody>
              <MaterialTable
                columns={[
                  {
                    title: "Amount",
                    field: "amount",
                    editable: "never",
                  },
                  { title: "Date",  field: `created_at`, render: rowData => moment(rowData.created_at).fromNow(), editable: "never" },
                  {
                    title: "status",
                    field: "status",
                    lookup: {
                      1: "Pending",
                      2: "Processing",
                      3: "flagged",
                      4: "Completed",
                    },
                  },
                ]}
                data={props.user.userWithdrawal}
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
  const id = context.params.id;
  const userData = await Server.get(`/admin/withdrawal/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  const withdrawal = await userData.data.message;
  const requestuserWithdrawal = await Server.get(
    `/admin/user/${withdrawal.user_id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const user = await requestuserWithdrawal.data.message;
  return {
    props: {
      withdrawal,
      user,
    },
  };
}

export default WithDrawal;
