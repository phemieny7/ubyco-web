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

import Server from '../../api/lib/Server'

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
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
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
                    editable: 'never',
                  },
                  {
                    title: "Rate",
                    field: "rate",
                  },
                ]}
                data={data}
                title=""
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataUpdate = [...data];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        setData([...dataUpdate]);
                        resolve();
                      }, 1000)
                    })
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
              <h4 className={classes.cardTitleWhite}>Crypto Brand</h4>
              <p className={classes.cardCategoryWhite}>List of Crypto brands</p>
            </CardHeader>
            <CardBody>
              <MaterialTable
                columns={[
                  {
                    title: "Brand",
                    field: "name",
                  }
                ]}
                data={data}
                title=""
                editable={{
                  onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        setData([...data, newData]);
                        resolve();
                      }, 1000)
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataUpdate = [...brand];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        setBrand([...dataUpdate]);
          
                        resolve();
                      }, 1000)
                    }),
                  onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataDelete = [...data];
                        const index = oldData.tableData.id;
                        dataDelete.splice(index, 1);
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
  const coin = await Server.get('/user/coin',{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const coinRate = coin.data.message
  return {
    props: {
      coinRate,
    }
  };
}
export default Rate;
