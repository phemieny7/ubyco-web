// export default function Index() {
//   const [ session, loading ] = useSession()
//   return <>
//     {!session && <>
//       Not signed in <br/>
//       <button onClick={() => signIn()}>Sign in</button>
//     </>}
//     {session && <>
//       Signed in as {session.user.email} <br/>
//       <button onClick={() => signOut()}>Sign out</button>
//     </>}
//   </>
// }
import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import App_1 from "../../src/assets/img/app-1.png";
import App_2 from "../../src/assets/img/app-2.png";
import App_3 from "../../src/assets/img/app-3.png";
import App_4 from "../../src/assets/img/app-4.png";
import App_5 from "../../src/assets/img/app-5.png";
import User_1 from "../../src/assets/img/user1.jpg";
import User_2 from "../../src/assets/img/user2.jpg";
import User_3 from "../../src/assets/img/user3.jpg";
import Logo from "../../src/assets/logo.png";


import "../../src/css/bootstrap.min.css";
import "../../src/css/style.css";
import "../../src/css/animate.css";
import "../../src/css/aos.css";
import Aos from "aos";
// import validator from 'bootstrap-validator'

import Head from "next/head";

export default function Index() {
  const [session, loading] = useSession();
  React.useEffect(() => {
    Aos.init();
  });
  return (
    <>
      <body className="dark">
        <header className="header">
          <div className="container">

            <div className="logo left">
              <a href="#">
                <img src={Logo} alt="Ubycohub" height={70}/>

                <mark className="light-blue">
                {/* <img src={Logo} alt="Ubycohub" height={70}/> */}
                  {/* <span className="t-red">.</span>Ubycohub */}
                </mark>
              </a>
            </div>
            <div className="menu right">
               
              {!session && (
                <>
                  Not signed in 
                  <a
                    className="primary-btn small round light-blue t-blue-vibrant"
                    onClick={() => signIn()}
                  >
                   Sign in
                  </a>
                </>
              )}
              {session && (
                <>
                  {" "}
                  Signed in as {session.user.email}
                  <button
                    className="primary-btn small round light-blue t-blue-vibrant"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        <div id="start" className="section back one">
          <div className="container">
            <div className="content row">
              <div
                className="col-lg-6"
                data-aos="fade-right"
                data-aos-anchor-placement="center-bottom"
              >
                <h1 className="t-white">
                  Start trading your giftcards and crypto's with{" "}
                  <span className="t-red">reliable</span> partner.
                </h1>
                <h5 className="t-white">
                  We offer the best and easiest way to trade your giftcards and
                  crypto for cash.
                </h5>
                <div className="cta-container">
                  <a
                    href="#"
                    className="primary-line-btn round b-blue-vibrant t-blue-vibrant"
                  >
                    <i className="fab fa-apple"></i>Get it on Apple Store
                  </a>
                  <a href="#" className="primary-line-btn round b-red t-red">
                    <i className="fab fa-google-play"></i>Get it on Play Store
                  </a>
                </div>
              </div>
              <div
                className="col-lg-6"
                data-aos="fade-left"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="app-container">
                  <div
                    id="nav-item"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <ol className="carousel-indicators">
                      <li
                        data-target="#nav-item"
                        data-slide-to="0"
                        className="active red"
                      ></li>
                      <li
                        data-target="#nav-item"
                        data-slide-to="1"
                        className="red"
                      ></li>
                      <li
                        data-target="#nav-item"
                        data-slide-to="2"
                        className="red"
                      ></li>
                    </ol>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src={App_1} alt="Ubycohub" className="img-fluid" />
                      </div>
                      <div className="carousel-item">
                        <img src={App_2} alt="Ubycohub" className="img-fluid" />
                      </div>
                      <div className="carousel-item">
                        <img src={App_3} alt="Ubycohub" className="img-fluid" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section dark">
          <div className="container">
            <div className="content row center">
              <div
                className="col-lg-3"
                data-aos="fade-right"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="info-box border b-blue-vibrant">
                  <div className="t-blue-vibrant">
                    <i className="fab fa-bitcoin"></i>
                  </div>
                  <h4 className="t-light-blue">Start Trade</h4>
                  <p className="t-white">
                   It only takes you few minutes to get started with trading your
                   giftcard and crypto for real cash
                  </p>
                </div>
              </div>
              <div
                className="col-lg-3"
                data-aos="fade-down"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="info-box border b-blue-vibrant">
                  <div className="t-blue-vibrant">
                    <i className="fas fa-money"></i>
                  </div>
                  <h4 className="t-light-blue">Fast Payment</h4>
                  <p className="t-white">
                    Once your trade is confirmed, our wallet technology allows you
                    to withdraw in your own convenience
                  </p>
                </div>
              </div>
              <div
                className="col-lg-3"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="info-box border b-red">
                  <div className="t-red">
                    <i className="far fa-heart"></i>
                  </div>
                  <h4 className="t-white">Tested & Trusted</h4>
                  <p className="t-white">
                    With over <span className="t-red">7</span> years of experience, 
                    We have grown to become the best gift cards and cryptocurrencies trader
                  </p>
                </div>
              </div>
              <div
                className="col-lg-3"
                data-aos="fade-left"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="info-box border b-blue-vibrant">
                  <div className="t-blue-vibrant">
                    <i className="fas fa-fill-drip"></i>
                  </div>
                  <h4 className="t-light-blue">Flexible and Versatile</h4>
                  <p className="t-white">
                   We offer the best giftcard and crypo acceptance rate that
                   suit the value
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section dark back two">
          <div className="container">
            <div className="content row">
              <div
                className="col-lg-6"
                data-aos="fade-up"
                data-aos-anchor-placement="center-bottom"
              >
                <span className="align-middle">
                  <img src={App_4} alt="Ubycohub" className="img-fluid" />
                </span>
              </div>
              <div
                className="col-lg-6"
                data-aos="fade-down"
                data-aos-anchor-placement="center-bottom"
              >
                <h1 className="t-white">
                  <span className="t-red">Geting</span> started around the 
                  platform.
                </h1>
                <h5>
                  We offer both in-app and web app(next update) transaction for our users
                  this allows a flow of purpose for our users.
                   <br /> This 2 minute video can help.
                </h5>
                <div className="cta-container">
                  <a href="#" className="primary-line-btn  round b-red t-red">
                    <i className="fas fa-tv"></i>Watch Video
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section dark-two back five half-padding">
          <div className="container">
            {/* <!-- Testimonials --> */}
            <div
              className="testimonial-container"
              data-aos="fade-down"
              data-aos-anchor-placement="center-bottom"
            >
              <div id="t-item" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li
                    data-target="#t-item"
                    data-slide-to="0"
                    className="active blue-vibrant"
                  ></li>
                  <li
                    data-target="#t-item"
                    data-slide-to="1"
                    className="blue-vibrant"
                  ></li>
                  <li
                    data-target="#t-item"
                    data-slide-to="2"
                    className="blue-vibrant"
                  ></li>
                </ol>
                <div className="carousel-inner content">
                  {/* <!-- Testimonial Item --> */}
                  <div className="carousel-item active">
                    <div className="item">
                      <div className="img center">
                        <img src={User_2} alt="Ubycohub" className="img-fluid" />
                      </div>
                      <div className="icon t-white">
                        <i className="fas fa-quote-right"></i>
                      </div>
                      <div className="text t-white">
                        {/* Ubycohub is a must-have tool. Maybe one of the best
                        product launch templates so far in the market.
                        Recommended 100%. */}
                      </div>
                      <div className="name t-blue-vibrant">MARIA De ANDRE'</div>
                      <div className="role t-light-blue">Artist</div>
                    </div>
                  </div>

                  {/* <!-- Testimonial Item --> */}
                  <div className="carousel-item">
                    <div className="item">
                      <div className="img center">
                        <img src={User_1} alt="Ubycohub" className="img-fluid" />
                      </div>
                      <div className="icon t-white">
                        <i className="fas fa-quote-right"></i>
                      </div>
                      <div className="text t-white">
                        {/* Extremelly flexible and easy to use. Code is clean and
                        all files well organized. Great job guys. */}
                      </div>
                      <div className="name t-blue-vibrant">JOHN E. PERRY</div>
                      <div className="role t-light-blue">
                        Moravian Ltd - CEO
                      </div>
                    </div>
                  </div>

                  {/* <!-- Testimonial Item --> */}
                  <div className="carousel-item">
                    <div className="item ">
                      <div className="img center">
                        <img src={User_3} alt="Ubycohub" className="img-fluid" />
                      </div>
                      <div className="icon t-white">
                        <i className="fas fa-quote-right"></i>
                      </div>
                      <div className="text t-white">
                        {/* Fast, easy, reliable, fun, flexible, modern. Many
                        options, colors, widgets. +++ */}
                      </div>
                      <div className="name t-blue-vibrant">LINDA FALANGY</div>
                      <div className="role t-light-blue">Graphic Designer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section dark" id="about">
          <div className="container">
            <div className="content row">
              <div
                className="col-lg-6"
                data-aos="fade-right"
                data-aos-anchor-placement="center-bottom"
              >
                <span className="align-middle">
                  <img src={App_5} alt="Ubycohub" className="img-fluid" />
                </span>
              </div>
              <div
                className="col-lg-6"
                data-aos="fade-left"
                data-aos-anchor-placement="center-bottom"
              >
                <div className="featured-icon">
                  <i className="fas fa-spinner t-red"></i>
                </div>
                <h4 className="t-white">
                  Why{" "}
                  <mark>
                    <span className="t-red">.</span>Ubycohub
                  </mark>{" "}
                  you should choose us as your trading partner
                </h4>
                <p>
                  We understand how overwhelming it can get when choosing a crypto and giftcard Exchange
                  platform, we also know how quick it can get messy cause of lack of transparency .
                </p>
                <h4 className="t-red">Give us a try!</h4>
                <p>
                  Take a quick look at the top features. <br />
                  We promise you won't regret it.
                </p>
                <ul
                  data-aos="fade-down"
                  data-aos-anchor-placement="center-bottom"
                >
                  <li>
                    <i className="fas fa-check t-red"></i>Transparency
                  </li>
                  <li>
                    <i className="fas fa-check t-red"></i> 24/7 Customer support
                  </li>
                  <li>
                    <i className="fas fa-check t-red"></i> Fast Payment
                  </li>
                  <li>
                    <i className="fas fa-check t-red"></i> Experience 
                  </li>
                  <li>
                    <i className="fas fa-check t-red"></i> Fast trading platform
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="section half-padding dark">
          <div className="container">
            <div
              className="banner dark-two"
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
            >
              <h3 className="t-white">
                Want to know what matters{" "}
                <mark className="light-yellow t-dark">
                  <span className="t-red">.</span>Ubycohub
                </mark>
                ?
              </h3>
              <p className="center">
                Subscribe our newsletter for occasional updates.
              </p>
              <div id="fields">
                {/* <!-- CONTACT Form--> */}
                <form id="contact-form" method="POST" role="form">
                  <div id="note" className="messages t-snow"></div>
                  <div className="controls center">
                    {/* <!-- form-group--> */}
                    <div className="form-group">
                      <input
                        id="form_email"
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address*"
                        required="required"
                        data-error="Valid email is required."
                      />
                      <input
                        type="submit"
                        name="submit"
                        id="submit"
                        className="primary-btn round red"
                        value="Notify Me"
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                </form>
                {/* <!-- END CONTACT Form--> */}
              </div>
            </div>
          </div>
        </div>

        <div className="section dark back four">
          <div
            className="container"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
          >
            <h1 className="t-white center">Join the community.</h1>
            <h5 className="t-grey center">#ubycohub</h5>
            <div className="cta-container center">
              <a href="#" className="primary-line-btn round b-red t-red">
                <i className="fab fa-instagram"></i>Follow us on Instagram
              </a>
              <a
                href="#"
                className="primary-line-btn round b-blue-vibrant t-blue-vibrant"
              >
                <i className="fab fa-facebook"></i>Follow us on Facebook
              </a>
            </div>
          </div>
          {/* <!-- Footer --> */}
          <footer>
            <div className="copyright t-white center">
              All rights reserved to &copy;Ubycohub
            </div>
          </footer>
        </div>
      </body>
    </>
  );
}
