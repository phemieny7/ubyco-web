import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
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
import CardFooter from "components/Card/CardFooter.js";

import Server from "../../api/lib/Server";

import avatar from "assets/img/faces/marc.jpg";
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

function Rate(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [data, setData] = React.useState(props.coinRate);

  const createCoin = async (name, wallet, rate) => {
    const res = await fetch("/api/create-coin", {
      body: JSON.stringify({
        name,
        wallet,
        rate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  const updateCoin = async (id, wallet, rate, name) => {
    const res = await fetch("/api/update-coin", {
      body: JSON.stringify({
        id,
        name,
        wallet,
        rate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
  };

  const deleteCoin = async (id) => {
    const res = await fetch("/api/delete-coin", {
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Crypto Rate</h4>
              <p className={classes.cardCategoryWhite}>List of Crypto Rate</p>
            </CardHeader>
            <CardBody>
              <MaterialTable
                columns={[
                  {
                    title: "Coin Brand",
                    field: "name",
                  },
                  {
                    title: "Rate",
                    field: "rate",
                  },
                  {
                    title: "Wallet",
                    field: "wallet",
                  },
                ]}
                data={data}
                title=""
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        setData([...data, newData]);
                        console.log(newData)
                        const { name, wallet, rate } = newData;
                        createCoin(name, wallet, rate);
                        resolve();
                      }, 1000);
                    }),

                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataUpdate = [...data];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        const { id, name, wallet, rate } = newData;
                        updateCoin(id, name, wallet, rate);
                        setData([...dataUpdate]);
                        resolve();
                      }, 1000);
                    }),

                    onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataDelete = [...data];
                        const index = oldData.tableData.id;
                        const pending = dataDelete.splice(index, 1);
                        const {id} = pending[0];
                        deleteCoin(id)
                        setData([...dataDelete]);
                        resolve()
                      }, 1000)
                    }),
                }}
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

Rate.layout = Admin;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (session.user.role != 2) {
    return {
      props: {},
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }

  const token = session?.accessToken;
  const coin = await Server.get("/user/coin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const coinRate = coin.data.message;
  return {
    props: {
      coinRate,
    },
  };
}
export default Rate;
