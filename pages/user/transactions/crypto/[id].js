import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { getSession } from "next-auth/client";

// @material-ui/icons
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card.js";

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardAvatar from "components/Card/CardAvatar.js";
import avatar from "assets/img/faces/user.png";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import moment from "moment";
import Server from "../../api/lib/Server";


function Id(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const image = props.coin.receipt;
  const remove = image.substring(1, image.length - 1);
  const split = remove.split(",");
  const Router = useRouter();

  const imageLoader = ({ src, width, quality }) => {
    return `http://res.cloudinary.com/ubycohub/${src}.jpg?w=${width}&q=${quality || 75}`;
  };

  const actionCoin = async (status) => {
    const res = await fetch("/api/update-cointransaction", {
      body: JSON.stringify({
        id: props.coin.id,
        status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    Router.reload(window.location.pathname);
  };

  const confirmPayment = async () => {
    const res = await fetch("/api/confirm-coin", {
      body: JSON.stringify({
        id: props.coin.id,
        user_id: props.coin.user_id,
        amount: props.coin.total,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
  };

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>

          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Update Coin Transaction</h4>
              <p className={classes.cardCategoryWhite}>Kindly select all required</p>
            </CardHeader>
            <form onSubmit={(e) => handleLogin(e)} data-toggle="validator" enctype="multipart/form-data">
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label" className={classes.formTitle}>Coin</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={brandValue}
                      onChange={(e) => onBrandSelect(e)}
                      required
                    >
                        {props.coins.length > 0 ? props.coins.map(coin => (
                        <MenuItem value={coin.id} key={coin.id}>
                          <p>{coin.name}</p>
                        </MenuItem>
                      )) : 0}
                    </Select>
                  </FormControl>
                </GridItem>
                
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Amount"
                    id="amount"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      
                    }}
                    value={amount}
                    onChange={(e) => priceChange(e)}
                    required
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Total"
                    id="total"
                    placeholder="0"
                    onChange ={setTotal}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={total}
                    inputProps={{
                      type: "number",
                      disabled: true,
                    }}
                    disabled
                
                  />
                </GridItem>
              
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Comments</InputLabel>
                  <CustomInput
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 3,
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Adress</InputLabel>
                  <Image
                    loader={btc}
                    src={wallet}
                    alt={"address"}
                    width={200}
                    height={200}
                  />
                  {wallet !== "null" ? <p>{wallet}</p> : <p>Select a Coin to generate address</p>}
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="success">Update Coin Transaction</Button>
              <p className="danger"><strong>Note: </strong> Only app screenshot of transaction should be upload</p>
            </CardFooter>
          </form>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}

Id.layout = Admin;

export async function getServerSideProps(context) {
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
  const token = session?.accessToken;
  const id = context.params.id;
  const userData = await Server.get(`/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const coin = await userData.data.message.coinTransaction;
  return {
    props: {
      coin,
    },
  };
}
export default Id;
