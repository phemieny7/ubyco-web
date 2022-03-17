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
import Modal from 'react-modal';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";
import { InputLabel } from "@material-ui/core";
import moment from 'moment'
import axios from 'axios'

import { getSession } from "next-auth/client";
// import {router} from "next/router";

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

import Server from "./../../api/lib/Server";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WithDrawal(props) {
  const [data, setData] = useState(props.withdrawal);
  const [images, setImage] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState([]);
  const useStyles = makeStyles(styles);
  const Router = useRouter();
  const classes = useStyles();
  const customStyles = {
    content: {
      margin: ' 100px auto',
      padding: '20px',
      background: ' #ffefc',
      border: '1px solid #666',
      width: '300px',
      borderRadius: '6px',
      boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)',
      position: 'relative',
      overlay: 'auto'
    },
  };
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement('#__next');
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   // subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false);
  }

  const refreshData = () => {
    Router.replace(Router.asPath);
  }

  const initiateWithdrawal = async () => {
    toast.info("Initiating Withdrawal")
    const res = await fetch("/api/initiate-withdrawal", {
      body: JSON.stringify({
        id: data.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    refreshData()

  };
  const verifyWithdrawal = async () => {
    toast.info("Verify Withdrawal")
    const res = await fetch("/api/verify-withdrawal", {
      body: JSON.stringify({
        id: data.id
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "PUT"
    })
    refreshData()
  }

  const onImageChange = (e) => {
    setImage([]);
    setImageUrl([]);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setImage(e.target.files);

      setImageUrl((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return <img src={photo} style={styles.img} alt="" key={photo} />;
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    console.log(images);
    toast.info("Please wait while we process your request");
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append(`card${[i]}`, images[i]);
    }
    formData.append("image", images);
    formData.append("id", data.id);
    const response = await axios.put(
      "/api/manual-withdrawal",
      formData
    );
    console.log(response)
    if (response.status == 200) {
      setTimeout(() => {
        toast.success("withdrawal Submitted");
      }, 2000);
    } else {
      toast.error("Error Submitting Trade");
    }
    refreshData()
  };


  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <form
          onSubmit={(e) => formSubmit(e)}
          data-toggle="validator"
          encType="multipart/form-data">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <InputLabel style={{ color: "#AAAAAA" }}>
                Upload Receipt
              </InputLabel>
              <br />
              <input
                className="form-control"
                type="file"
                id="formFileMultiple"
                multiple
                accept="image/*"
                onChange={onImageChange}
              />
              <GridContainer>
                {imageUrl !== null ? (
                  <div className="form-group multi-preview">
                    <div className="result">{renderPhotos(imageUrl)}</div>
                  </div>
                ) : null}
              </GridContainer>
            </GridItem>
            <GridItem>
              <Button color="danger" type="submit">
                Confirm
              </Button>
            </GridItem>
          </GridContainer>
        </form>
      </Modal>
      <ToastContainer />
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader>
              <p className={classes.cardCategory}>User Details</p>
              <p>Name: {data.user.fullname}</p>
              <p>Phone: {data.user.phone}</p>
              <p>Customer_id: {data.user.customer_id}</p>
              <p>Available Balance: {props.user.userAmount.amount}</p>

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
              <p>Status: {data.status_name.name}</p>
              <p>Receipt: {data.receipt != null ? data.receipt : "no receipt"}</p>
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
                Generate Paystack Receipt
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

            <GridItem xs={12} sm={6} md={4}>
              <Button
                color="success"
                fullWidth
                onClick={openModal}
                id="#manual"
              >
                Confirm Manually / upload receipt
              </Button>
            </GridItem>
          </>
        ) : null}
        {data.receipt != null && data.completed == false ?
          <>
            <GridItem xs={12} sm={6} md={4}>
              <Button color="success" onClick={() => { verifyWithdrawal() }} fullWidth>
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
                  { title: "Date", field: `created_at`, render: rowData => moment(rowData.created_at).fromNow(), editable: "never" },
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

  if (session.user.role != 2) {
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
  const userData = await Server.get(`/admin/withdrawal/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const withdrawal = await userData.data.message;
  // console.log(withdrawal)
  const requestuserWithdrawal = await Server.get(
    `/admin/user/${withdrawal.user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );
  const user = await requestuserWithdrawal.data.message;
  // const withdraw = 
  // console.log(user)
  return {
    props: {
      withdrawal,
      user,
    },
  };
}

export default WithDrawal;
