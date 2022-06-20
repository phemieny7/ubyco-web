import React, {useState} from "react";
import {useRouter} from 'next/router'
import Router from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomSelect/CustomSelect.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import CardFooter from "components/Card/CardFooter.js";
import MaterialTable from "material-table";
import moment from 'moment'
import Image from "next/image";

import avatar from "assets/img/faces/user.png";
import Server from "../../api/lib/Server";
import { getSession } from "next-auth/client";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

function UserProfile(props) {
  const imageLoader = ({ src, width, quality }) => {
    return `https://res.cloudinary.com/ubycohub/${src}.jpg?w=${width}&q=${quality || 75}`;
  };
  const router = useRouter()
  const refreshData = () => {
    router.replace(router.asPath);
  }

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const unbanned = async()=> {
    const res = await fetch('/api/user_status',{
      body: JSON.stringify({
        id: props.user.id,
        status: false
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    refreshData()
    // Router.reload(window.location.pathname);
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{props.user.fullname} Profile</h4>
              <p className={classes.cardCategoryWhite}>User available info</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                    id="username"
                    labelText="Fullname"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      value: props.user.fullname,                     
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Phone"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      value: props.user.phone,                     
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Customer Id"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      value: props.user.customer_id,                     
                    }}
                  />
                </GridItem>
              </GridContainer>
              

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Customer email"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                      value: props.user.email,                     
                    }}
                  />
                </GridItem>
              </GridContainer>
              
              
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <MaterialTable
              columns={[
                {
                  title: "Card",
                  field: "card_type_id",
                  editable: "never",
                },
                {
                  title: "Rate",
                  field: "rate",
                  editable: "never",
                },
                { title: "Amount", field: "amount", editable: "never" },
                { title: "Date", field: `created_at`, render: rowData => moment(rowData.created_at).fromNow()},

                {
                  title: "Status",
                  field: "status",
                  lookup: { 1: "Pending", 2: "Processing", 3: "Fault Trade", 4: "Completed" },
                },
                {
                  title: "Paid",
                  field: "completed",
                  lookup:{true: "Yes", false: "No"}
                },
                {
                  title: "Total",
                  field: "total",
                },
              ]}
              data={props.user.cardTransaction}
              title="User Card Transactions"
              options={{
                actionsColumnIndex: -1,
              }}
            />
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                <MaterialTable
              columns={[
                {
                  title: "Coin",
                  field: "coin_id",
                },
                {
                  title: "Rate",
                  field: "rate",
                },
                { title: "Amount", field: "amount",},
                { title: "Date", field: `created_at`, render: rowData => moment(rowData.created_at).fromNow()},

                {
                  title: "Status",
                  field: "status",
                  lookup: { 1: "Pending", 2: "Processing", 3: "Flagged", 4: "Complete" },
                },
                {
                  title: "Total",
                  field: "total",
                },
              ]}
              data={props.user.coinTransaction}
              title="User Crypto Transactions"
              options={{
                actionsColumnIndex: -1,
              }}
            />
                </GridItem>
              </GridContainer>
              
            </CardBody>
            {/* <CardFooter>
              {
                props.user.banned == true ? <Button color="primary">Unbanned user</Button> : null
              }
             
            </CardFooter> */}
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                 {
                  props.user.picture !== null ? 
                  <Image
                  loader={imageLoader}
                  src={props.user.picture}
                  width={400}
                  height={700}
                /> : <img src={avatar} alt="..." />
                }
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardCategory}>Balance: N{props.user.userAmount.amount}</h4>
              <h4 className={classes.cardTitle}>{props.user.fullname}</h4>
              <p className={classes.description}>
               { props.user.userAccounts.length > 0 ?
                  props.user.userAccounts.map((x) => [
                    <p>Bank: {x.bank} <br/> Account Number : {x.account_number}</p>
                  ] ) :
                  'User Has No Account Yet'
                }
              </p>
              
              {
                props.user.banned == true ? <Button color="primary" round onClick={unbanned}>Unbanned user</Button> : null
              }
           
            </CardBody>
          </Card>

         
        <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>All Withdrawals</h4>
              {/* <p className={classes.cardCategoryWhite}>
               Last Updated 2 days ago
              </p> */}
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Amount", "Status", "Date"]}
                tableData={
                  props.user.userWithdrawal.map((name) => [name.amount, name.status, moment(name.created_at).fromNow()]).sort()
                }
              />
            </CardBody>
          </Card>
        
        </GridItem>

       
      </GridContainer>
    </div>
  );
}

UserProfile.layout = Admin;

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
  
  const id = context.params.id 
  const userData = await Server.get(`/admin/user/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  const user = await userData.data.message;
  return {
    props: {
      user:user
    },
  };
}

export default UserProfile;
