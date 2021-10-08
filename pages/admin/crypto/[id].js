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
  // const remove = image.substring(1, image.length - 1);
  // const split = remove.split(",");
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
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Trade</h4>
              <p className={classes.cardCategoryWhite}>Crypt's</p>
            </CardHeader>
            <CardBody>
            {/* {split.map((src, index) => ( */}
              <GridItem xs={6} sm={6} md={4}>
                  <Image
                  loader={imageLoader}
                  src={image.replace(
                    /[`~!@#$%^&*()|+\-=?;:'",<>\{\}\[\]\\\/]/gi,
                    ""
                  )}
                  width={400}
                  height={700}
                  placeholder='blur'
                  blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </GridItem>
            {/* ))}  */}
            </CardBody>

            <CardFooter>
              {props.coin.status_name.name == "pending" ? (
                <>
                  <GridItem xs={12} sm={12} md={3}>
                    <Button
                      color="danger"
                      round
                      onClick={() => {
                        actionCoin(3);
                      }}
                    >
                      fault Trade
                    </Button>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <Button
                      color="success"
                      round
                      onClick={() => {
                        actionCoin(4);
                      }}
                    >
                      confirm payment
                    </Button>
                  </GridItem>
                </>
              ) : null}

              {props.coin.status_name.name == "completed" &&
              props.coin.completed == false ? (
                <>
                  <GridItem xs={12} sm={12} md={3}>
                    <Button
                      color="success"
                      round
                      onClick={() => {
                        confirmPayment();
                      }}
                    >
                      Payout
                    </Button>
                  </GridItem>
                </>
              ) : null}

              {props.coin.completed == false ? (
                <>
                  <p>Incomplete Trade</p>
                </>
              ) : (
                <p>complete Trade</p>
              )}
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
              {
                  props.coin.user.picture ==! null ? 
                  <Image
                  loader={imageLoader}
                  src={props.coin.user.picture}
                  width={400}
                  height={700}
                /> : <img src={avatar} alt="..." />
                }
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{props.coin.user.fullname}</h4>
              <h4 className={classes.cardTitle}>
                {" "}
                Total amount: {props.coin.total}
              </h4>
              <Button
                color="primary"
                round
                onClick={() =>
                  Router.push(`/admin/users/${props.coin.user_id}`)
                }
              >
                View Profile
              </Button>
            </CardBody>
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
  const coinData = await Server.get(`/admin/coin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const coin = await coinData.data.message;
  return {
    props: {
      coin,
    },
  };
}
export default Id;
