import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import ListSubheader from "@material-ui/core/ListSubheader";
// import ImageList from '@material-ui/core/ImageList';
// import ImageListItem from '@material-ui/core/ImageListItem';

// @material-ui/icons

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button";
import Success from "components/Typography/Success.js";
import Card from "components/Card/Card.js";

import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardAvatar from "components/Card/CardAvatar.js";
import avatar from "assets/img/faces/marc.jpg";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import moment from "moment";
import Server from "../../api/lib/Server";

function Id(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const image = props.card.cards;
  const remove = image.substring(1, image.length - 1);
  const split = remove.split(",");
  const Router = useRouter();

  const cards = ({ src, width, quality }) => {
    return `${
      process.env.NEXT_PUBLIC_SERVER_URL
    }/get-picture/cards/${src}?w=${width}&q=${quality || 75}`;
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
              <GridItem xs={6} sm={6} md={4}>
                {/* <img src={avatar}/> */}
              </GridItem>
              <GridItem xs={6} sm={6} md={4}>
                <GridList>
                  <Image
                    loader={cards}
                    src={split[0].replace(
                      /[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi,
                      ""
                    )}
                    width={300}
                    height={200}
                  />
                  <Image
                    loader={cards}
                    src={split[1].replace(
                      /[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi,
                      ""
                    )}
                    width={300}
                    height={200}
                  />
                </GridList>
              </GridItem>
            </CardBody>

            <CardFooter>
              {props.card.status_name.name == "pending" ? (
                <>
                  <GridItem xs={12} sm={12} md={4}>
                    <Button color="warning" round>
                      Flag Trade
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Button color="success" round>
                      Complete Trade
                    </Button>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Button color="danger" round>
                      Fault Trade
                    </Button>
                  </GridItem>
                </>
              ) : (
                "Trade Completed"
              )}
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{props.card.user.fullname}</h4>
              <h4 className={classes.cardTitle}>
                {" "}
                Total amount: {props.card.total}
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
  const id = context.params.id;
  const cardData = await Server.get(`/admin/card/${id}`);
  const card = await cardData.data.message;
  return {
    props: {
      card,
    },
  };
}
export default Id;
