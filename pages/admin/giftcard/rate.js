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
  const [brand, setBrand] = useState(props.cardBrand);
  const [card, setCard] = useState(props.cardRate);

  const cardOptions = {};
  brand.map(option => {
    const { id, name } = option;
    cardOptions[id]  = name
})
// console.log(cardOptions)

  const createCard = async (name) => {
    const res = await fetch("/api/create-card", {
      body: JSON.stringify({
        name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  const createCardRate = async (id, name, rate) => {
    const res = await fetch("/api/create-card-rate", {
      body: JSON.stringify({
        id,
        name,
        rate
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  const updateCardRate = async (id, card_id, name, rate) => {
    const res = await fetch("/api/update-card-rate", {
      body: JSON.stringify({
        id,
        card_id,
        name,
        rate
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
  };

  const deleteCardRate = async (id) => {
    const res = await fetch("/api/delete-card-rate", {
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  const updateCard = async (id, name) => {
    const res = await fetch("/api/update-card", {
      body: JSON.stringify({
        id,
        name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
  };

  const deleteCard = async (id) => {
    const res = await fetch("/api/delete-card", {
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
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Gift Card Rate</h4>
              <p className={classes.cardCategoryWhite}>
                List of Gift Card Rate
              </p>
            </CardHeader>
            <CardBody>
              <MaterialTable
                columns={[
                  {
                    title: "Card Brand",
                    field: "card.id",
                    lookup: cardOptions,
                    editable:false
                  },
                  { title: "Card", field: "name" },
                  { title: "Rate", field: "rate" },
                ]}
                data={card}
                title=""
                editable={{
                  
                  onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      setCard([...card, newData]);
                      const id = newData.card.id                     
                      const{name ,rate}= newData
                      createCardRate(id, name, rate);
                      resolve();
                    }, 1000);
                  }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataUpdate = [...card];
                        const id= oldData.tableData.id;
                        dataUpdate[id] = newData;
                        const card_id = newData.card.id
                        const {name, rate} = newData
                        setCard([...dataUpdate]);
                        updateCardRate(id, card_id, name, rate);
                        resolve();
                      }, 1000);
                    }),

                    onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataDelete = [...card];
                        const index = oldData.tableData.id;
                        const pending = dataDelete.splice(index, 1);
                        const {id} = pending[0];
                        deleteCardRate(id)
                        setCard([...dataDelete]);
                        resolve();
                      }, 1000);
                    }),
                }}
                options={{
                  actionsColumnIndex: -1,
                }}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Card Brand</h4>
              <p className={classes.cardCategoryWhite}>List of Card brands</p>
            </CardHeader>
            <CardBody>
              <MaterialTable
                columns={[
                  {
                    title: "Brand",
                    field: "name",
                  },
                  // { title: "Counts",  field: `cardTypes`, render: data => {data.cardTypes.length},  editable: 'never', initialEditValue: '0' },
                ]}
                data={brand}
                title=""
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        setBrand([...brand, newData]);
                        const name = newData.name;
                        createCard(name);
                        resolve();
                      }, 1000);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataUpdate = [...brand];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        setBrand([...dataUpdate]);
                        const id = newData.id;
                        const name = newData.name;
                        updateCard(id, name);
                        resolve();
                      }, 1000);
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataDelete = [...brand];
                        const index = oldData.tableData.id;
                        const pending = dataDelete.splice(index, 1);
                        const {id} = pending[0];
                        deleteCard(id)
                        setBrand([...dataDelete]);
                        resolve();
                      }, 1000);
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

  const card = await Server.get("/admin/card_rate", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const brand = await Server.get("/admin/all_card", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const cardRate = card.data.message;
  const cardBrand = brand.data.message;
  return {
    props: {
      cardRate,
      cardBrand,
    },
  };
}
export default Rate;
