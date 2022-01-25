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
import Server from '../../../api/lib/Server'




function Id(props) {
  // const [split, setSplit] = React.useState([])
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const data = props.card.cards;
  const obj = JSON.parse(data)
  const image = Object.values(obj);
  console.log(image)
  
  const Router = useRouter();
  const imageLoader = ({ src, width, quality }) => {
    return `https://res.cloudinary.com/ubycohub/${src}.jpg?w=${width}&q=${quality || 75}`;
  };


  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Trade</h4>
              <p className={classes.cardCategoryWhite}>Giftcards</p>
            </CardHeader>
            <CardBody>
              
            <GridContainer>
              {image.map(function(name, index){
                return (
                  <GridItem xs={6} sm={6} md={4}>
                    <Image
                    loader={imageLoader}
                    src={name}
                    width={400}
                    height={700}
                    key={index}
                  />
                 </GridItem>
                );
              })}
              </GridContainer>

            </CardBody>

            <CardFooter>
              {props.card.status_name.name == "pending" ? (
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

              {props.card.status_name.name == "completed" &&
              props.card.completed == false ? (
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

              {props.card.completed == false ? (
                <>
                  <p><strong>Status</strong>: Incomplete Trade</p>
                </>
              ) : (
                <p><strong>Status</strong>: Complete Trade</p>
              )}
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                {
                  props.card.user.picture !== null ? 
                  <Image
                  loader={imageLoader}
                  src={props.card.user.picture}
                  width={400}
                  height={700}
                /> : <img src={avatar} alt="..." />
                }
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{props.card.user.fullname}</h4>
              <h4 className={classes.cardTitle}>
                {" "}
                Total amount: &#8358;{Number(props.card.amount * props.card.rate).toFixed(2)}
              </h4>

              <h4>
              {" "}
              Comment: {props.card.comments}
              </h4>
              <Button
                color="primary"
                round
                onClick={() =>
                  Router.push(`/admin/users/${props.card.user_id}`)
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
  const cardData = await Server.get(`/user/card/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const card = await cardData.data.message;
  return {
    props: {
      card,
    },
  };
}
export default Id;
