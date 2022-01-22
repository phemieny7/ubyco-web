
import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Server from "../api/lib/Server";
import App_1 from "../../src/assets/img/app-1.png";
import Logo from "../../src/assets/img/logo.png";
import App_2 from "../../src/assets/img/app-2.png";
import App_3 from "../../src/assets/img/app-1.png";
import App_4 from "../../src/assets/img/app-4.png";
import "../../src/css/aos.css";
import Aos from "aos";
// import validator from 'bootstrap-validator'

import Head from "next/head";
import { Button } from "@material-ui/core";

export default function Index(props) {
  const [session, loading] = useSession();
  React.useEffect(() => {
    Aos.init();
  });

  const [brandValue, setBrandValue] = React.useState("");
  const [typeValue, setTypeValue] = React.useState("");
  const [type, setType] = React.useState([]);
  const [amount, setAmount] = React.useState("");
  const [total, setTotal] = React.useState("0.00");
  const [rate, setRate] = React.useState("0.00");


   //when brand selected
   const cardBrandSelect = async (event) => {
    setBrandValue(event.target.value);
    setAmount("");
    setTotal(0);
    const res = props.cards.find((card) => card.id == event.target.value);
    setRate("0.00");
    setType(res.cardTypes);
  };

  const cardTypeSelect = async (event) => {
    setTypeValue(event.target.value);
    setAmount("");
    setTotal(0);
    setRate('0.00');
  };

  //when price changes multiply the amount by the rate
  const priceChange = async (event) => {
    
    setAmount(event.target.value);
    const value = type.find((card) => card.id == typeValue);
    if (type.length == 0 || typeValue == "") {
      alert("Please select a Brand and card type");
    } else if (value.rate == "0") {
      setTotal("We are not accepting this card at this time");
    } else {
      setRate(value.rate);
      const sum = Number(event.target.value * value.rate);
      setTotal(sum);
    }
  };


  return (
    <>
    <Head>
      <meta charSet="utf-8" />
      <title>
        Ubycohub Home
      </title>
    </Head>
      <div className="light-grey">
        {/* <!-- Content Starts --> */}
        <header className="">
          {/* <div className="container">
            <!-- Change path logo here -->
            <div className="logo left"><a href="#"><mark className="light-yellow"><span className="t-red">.</span>Ubyco</mark></a></div>
            <div className="logo left"><img src={Logo} alt="Ubyco" className="logo-navbar"/></div>
            
            <ul className="d-flex ml-auto">
              <li><a className="primary-btn small light-grey t-red" href="#about">LOGIN</a></li>
              <li>Home</li>
              <li>Contacts</li>
              
            </ul>
          </div> */}

          <nav className="navbar navbar-expand-lg navbar-light px-4 py-0">
            {/* <a className="navbar-brand" href="#">Navbar</a> */}
            <a  href="/"><img src={Logo} alt="Ubyco" className="logo-navbar" /></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="fa fa-bars"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item mx-2 active">
                  <a className="nav-link" href="#contact">Contact Us</a>
                </li>

                <li className="nav-item mx-2 active">
                  <a className="nav-link" href="#rate-calculator">Rate Calculator</a>
                </li>
                {!session && (
                  <li className="nav-item mx-2">
                    <a className="nav-link" href="/login">Sign In</a>
                  </li>
                )}

                {session?.role == 2 && (
                   <>
                  
                     
                     <li className="nav-item mx-2 active">
                        <a className="nav-link" href="/admin/dashboard">Admin Dashboard</a>
                      </li>
                      <button variant="contained" color="primary" onClick={()=>signOut()}>
                       sign Out
                      </button>
               </>
                )}

          {session?.role == 1 && (
              <>
               
                  
                  
                  <li className="nav-item mx-2 active">
                     <a className="nav-link" href="/user/dashboard">Dashboard</a>
                  </li>
                  <li className="nav-item mx-2">
                  <button variant="contained" color="primary" onClick={()=>signOut()}>
                    sign Out
                   </button>
                   </li>
            </>
                ) }
                
               
              </ul>
            </div>
          </nav>
        </header>

        {/* <!-- Section --> */}
        <div id="start" className="section light-grey back one">
          <div className="container">
            <div className="content row">
              <div className="col-lg-6" data-aos="fade-right" data-aos-anchor-placement="center-bottom">
                <h1 className="top-h1">Start exchanging <mark className="f">giftcards and crypto's</mark> with reliable partner..</h1>
                <h5>We offer the best and easiest way to trade your giftcards and crypto for cash.</h5>
                <div className="cta-container">
                  <a href="#" className="primary-btn red t-white"><i className="fab fa-apple"></i>Get it on Apple Store</a>
                  <a href="#" className="primary-line-btn b-blue-vibrant t-red"><i className="fab fa-google-play"></i>Get it on Play Store</a>
                </div>
              </div>
              <div className="col-lg-6" data-aos="fade-left" data-aos-anchor-placement="center-bottom">
                <div className="app-container">
                  <div id="nav-item" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                      <li data-target="#nav-item" data-slide-to="0" className="active"></li>
                      <li data-target="#nav-item" data-slide-to="1"></li>
                      <li data-target="#nav-item" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                      <div className="carousel-item active"><img src={App_1} alt="Ubyco" className="img-fluid"/></div>
                      <div className="carousel-item"><img src={App_2} alt="Ubyco" className="img-fluid"/></div>
                      <div className="carousel-item"><img src={App_3} alt="Ubyco" className="img-fluid"/></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Section Ends --> */}

        {/* <!-- Section --> */}
        <div className="section light-grey">
          <div className="container">
            <div className="content row center">
              <div className="col-lg-4" data-aos="fade-down" data-aos-anchor-placement="center-bottom">
                <div className="info-box">
                  <div className="t-red"><i className="far fa-user"></i></div>
                  <h4>Cross-Platform Availiability</h4>
                  <p>Ubyco is available for users on both the Android and iOS platforms.</p>
                </div>
              </div>
              <div className="col-lg-4" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <div className="info-box white">
                  <div className="t-red"><i className="fas fa-money"></i></div>
                  <h4>Trusted and Secure</h4>
                  <p>With over 7 years of experience, We have grown to become the best gift cards and cryptocurrencies trader</p>
                </div>
              </div>
              <div className="col-lg-4" data-aos="fade-down" data-aos-anchor-placement="center-bottom">
                <div className="info-box">
                  <div className="t-red"><i className="far fa-circle"></i></div>
                  <h4>Flexible and Versatile</h4>
                  <p>We offer the best giftcard and crypo acceptance rate that suit the value</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Section Ends --> */}

        {/* <!-- Section --> */}
        <div className="section light-grey back two">
          <div className="container">
            <div className="content row">
              <div className="col-lg-6" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <span className="align-middle"><img src={App_4} alt="Ubyco" className="img-fluid"/></span>
              </div>
              <div className="col-lg-6" data-aos="fade-down" data-aos-anchor-placement="center-bottom">
                <h1>Getting started around the <span className="t-red">platform?</span></h1>
                <h5>We offer both in-app and web app(next update) transaction for our users this allows a flow of purpose for our users.
                  This 2 minute video can help.</h5>
                <div className="cta-container">
                  <a href="#" className="primary-line-btn  b-red t-red"><i className="far fa-file-alt"></i>Watch Video</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Section Ends --> */}

        {/* <!-- Section --> */}
        <div className="section dark back five half-padding" id="rate-calculator">
          <div className="container">

            <div className="calculator-section" data-aos="fade-down" data-aos-anchor-placement="center-bottom">
              <h1 className="center text-white" data-aos="fade-down" data-aos-anchor-placement="center-bottom">Rate Calculator.</h1>
              <h5 className="center" data-aos="fade-up" data-aos-anchor-placement="center-bottom">Enter details in each field to calculate how much you will be paid for certain gift cards on Ubyco..</h5>
              
              <form>
                <div className="row">
                  
                  <div className="input-group col-md-12">
                    <div className="col-md-6 p-0 pr-1">
                      <select className="d-inline-block py-3 col-12" value={brandValue} onChange={(e) => cardBrandSelect(e)}>
                      <option selected>Select a card</option>
                        {props.cards.length > 0
                          ? props.cards.map((card) => (
                              <option value={card.id} key={card.id}>
                                {card.name}
                              </option>
                            ))
                          : 0}
                      </select>
                    </div>

                    <div className="col-md-6 p-0 pl-1">
                      <select className="d-inline-block py-3 col-12" value={typeValue}   onChange={(e) => cardTypeSelect(e)}>
                      <option selected>Select card types</option>
                        {type.length > 0 ? (
                          type.map((card) => (
                            <option value={card.id} key={card.id}>
                              {card.name}
                            </option>
                          ))
                        ) : (
                          <option>
                            Not Available
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="input-group col-md-12">
                    <input type="number" placeholder="Enter an amount" value={amount} onChange={(e)=>priceChange(e)} className="form-control py-3" />
                  </div>

                  <div className="col-md-12 d-flex justify-content-between">
                    <h3 className="text-white">Total: <span>{total}</span> </h3>

                    <h3 className="text-white">Rate: <span>{rate}</span> </h3>
                  </div>

                  <div className="col-md-6">
                    <input type="submit" className="primary-btn red t-white" value="Sell Gift Card" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <!-- Section Ends --> */}

        {/* <!-- Section --> */}
        <div className="section light-grey" id="about">
          <div className="container">
            <div className="content row">
              <div className="col-lg-6">
                <span className="align-middle"><img src={App_2} alt="Ubyco" className="img-fluid" width={300} height={500}/></span>
              </div>
              <div className="col-lg-6" data-aos="fade-left" data-aos-anchor-placement="center-bottom">
                <div className="featured-icon"><i className="fas fa-spinner t-red"></i></div>
                <h3>Why to choose<mark><span className="t-red">.</span>Ubyco</mark> as your trading partner</h3>
                <p>We understand how overwhelming it can get when choosing a crypto and giftcard Exchange platform, we also know how quick it can get messy cause of lack of transparency.</p>
                <h4 className="t-red">Give us a try!</h4>
                <p>Take a quick look at the top features. <br/>We promise you won't regret it.</p>
                <ul data-aos="fade-down" data-aos-anchor-placement="center-bottom">
                  <li><i className="fas fa-check t-red"></i> Transparency</li>
                  <li><i className="fas fa-check t-red"></i> 24/7 Support</li>
                  <li><i className="fas fa-check t-red"></i> Fast Payment</li>
                  <li><i className="fas fa-check t-red"></i> Experience</li>
                  <li><i className="fas fa-check t-red"></i> Fast Trading Platform</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Section Ends --> */}

        {/* <!-- Section --> */}
        <div className="section half-padding light-grey" id="contact">
          <div className="container">
            <div className="banner white" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
              <h3>Want to know more about  <mark className="light-yellow t-dark"><span className="t-red">.</span>Ubyco</mark>?</h3>

              <p className="center">Reach out to us.</p>
              <div id="fields">

                {/* <!-- CONTACT Form--> */}
                <form id="contact-form" method="POST" action="#" role="form">
                  <div id="note" className="messages t-snow"></div>
                  <div className="controls center">

                    {/* <!-- form-group--> */}
                    <div className="form-group">
                      {/* <input  type="text" name="email" className="form-control light-grey" placeholder="Email address*" required="required" data-error="Valid email is required."/> */}
                      <div className="row">
                        <div className="col-md-6">
                          <input type="text" placeholder="First Name" className="form-control" />
                        </div>

                        <div className="col-md-6">
                          <input type="text" placeholder="Last Name" className="form-control" />
                        </div>

                        <div className="col-md-12">
                          <input type="email" placeholder="Email Address" className="form-control" />
                        </div>

                        <div className="col-md-12">
                          <textarea className="form-control" placeholder="Your Message"></textarea>
                        </div>
                      </div>
                        <input type="submit" name="submit" id="submit" className="primary-btn blue-vibrant" value="Send Message"/>
                          <div className="help-block with-errors"></div>
                        </div>
                    </div>
                </form>
                {/* <!-- END CONTACT Form--> */}
              </div>
            </div>
          </div>
        </div>

        <div className="section dark back three">
          <div className="container" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
            <h1 className="t-white center">Join the community.</h1>
            <h5 className="t-grey center">#appUbyco</h5>
            <div className="cta-container center">
              <a href="#" className="primary-line-btn b-pink t-pink"><i className="fab fa-instagram"></i>Follow us on Instagram</a>
              <a href="#" className="primary-line-btn b-blue-vibrant t-red"><i className="fab fa-facebook"></i>Follow us on Facebook</a>
            </div>
          </div>
          {/* <!-- Footer --> */}
          <footer>
            <div className="copyright t-white center">All rights reserved to &copy;Ubyco</div>
          </footer>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // const session = await getSession(context);
  const card = await Server.get("/card");
  const cards = card.data.message;
  // console.log(cards)
  return {
    props: {
      cards,
      // cardTransactions,
    },
  };
}