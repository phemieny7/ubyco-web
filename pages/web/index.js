
import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import App_1 from "../../src/assets/img/app-1.png";
import Logo from "../../src/assets/img/logo.png";
import App_2 from "../../src/assets/img/app-2.png";
import App_3 from "../../src/assets/img/app-1.png";
import App_4 from "../../src/assets/img/app-4.png";
import App_5 from "../../src/assets/img/app-5.png";
import User_1 from "../../src/assets/img/user1.jpg";
import User_2 from "../../src/assets/img/user2.jpg";
import User_3 from "../../src/assets/img/user3.jpg";
// import Logo from "../../src/assets/logo.png";
import Link from "next/link";
import "../../src/css/aos.css";
import Aos from "aos";
// import validator from 'bootstrap-validator'

import Head from "next/head";
import { Button } from "@material-ui/core";

export default function Index() {
  const [session, loading] = useSession();
  React.useEffect(() => {
    Aos.init();
  });


  return (
    <>
      <div className="light-grey">
        {/* <!-- Content Starts --> */}
        <header className="">
          {/* <div className="container">
            <!-- Change path logo here -->
            <div className="logo left"><a href="#"><mark className="light-yellow"><span className="t-red">.</span>Ubyco</mark></a></div>
            <div className="logo left"><img src={Logo} alt="Ubyco" className="logo-navbar"/></div>
            
            <ul className="d-flex ml-auto">
              <li><a className="primary-btn small light-grey t-blue-vibrant" href="#about">LOGIN</a></li>
              <li>Home</li>
              <li>Contacts</li>
              
            </ul>
          </div> */}

          <nav className="navbar navbar-expand-lg navbar-light px-4 py-0">
            {/* <a className="navbar-brand" href="#">Navbar</a> */}
            <img src={Logo} alt="Ubyco" className="logo-navbar" />
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="fa fa-bars"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item mx-2 active">
                  <a className="nav-link" href="#">Contact Us</a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link" href="#">Sign In</a>
                </li>
                <li className="nav-item mx-2"><a className="primary-btn small light-grey t-blue-vibrant" href="#about">LOGIN</a></li>
               
              </ul>
            </div>
          </nav>
        </header>

        {/* <!-- Section --> */}
        <div id="start" className="section light-grey back one">
          <div className="container">
            <div className="content row">
              <div className="col-lg-6" data-aos="fade-right" data-aos-anchor-placement="center-bottom">
                <h1 className="top-h1">Launch your app with a <mark className="f">reliable</mark> partner.</h1>
                <h5>The best and easiest way to get your business up and running. Save money and time!</h5>
                <div className="cta-container">
                  <a href="#" className="primary-btn red t-white"><i className="fab fa-apple"></i>Get it on Apple Store</a>
                  <a href="#" className="primary-line-btn b-blue-vibrant t-blue-vibrant"><i className="fab fa-google-play"></i>Get it on Play Store</a>
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
                  <div className="t-blue-vibrant"><i className="far fa-clone"></i></div>
                  <h4>Cross-Platform Availiability</h4>
                  <p>Ubyco is available for users on both the Android and iOS platforms.</p>
                </div>
              </div>
              <div className="col-lg-4" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <div className="info-box white">
                  <div className="t-blue-vibrant"><i className="fas fa-code"></i></div>
                  <h4>Trusted and Secure</h4>
                  <p>With over 7 years of experience, We have grown to become the best gift cards and cryptocurrencies trader</p>
                </div>
              </div>
              <div className="col-lg-4" data-aos="fade-down" data-aos-anchor-placement="center-bottom">
                <div className="info-box">
                  <div className="t-blue-vibrant"><i className="fas fa-fill-drip"></i></div>
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
                <h1>Getting started around the <span className="t-blue-vibrant">platform?</span></h1>
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
        <div className="section dark back five half-padding">
          <div className="container">

            <div className="calculator-section" data-aos="fade-down" data-aos-anchor-placement="center-bottom">
              <h1 className="center text-white" data-aos="fade-down" data-aos-anchor-placement="center-bottom">Rate Calculator.</h1>
              <h5 className="center" data-aos="fade-up" data-aos-anchor-placement="center-bottom">Enter details in each field to calculate how much you will be paid for certain gift cards on Ubyco..</h5>
              
              <form>
                <div className="row">
                  <div className="input-group col-md-12">
                    <input type="number" placeholder="0.00" className="form-control py-3" />
                  </div>
                  <div className="input-group col-md-12">
                    <div className="col-md-6 p-0 pr-1">
                      <select className="d-inline-block py-3 col-12">
                        <option value="1" selected>Select Category</option>
                        <option value="1">Lorem ipsum</option>
                        <option value="2">Lorem ipsum</option>
                        <option value="3">Lorem ipsum</option>
                      </select>
                    </div>

                    <div className="col-md-6 p-0 pl-1">
                      <select className="d-inline-block py-3 col-12">
                        <option value="1" selected>Select Sub-category</option>
                        <option value="1">Lorem ipsum</option>
                        <option value="2">Lorem ipsum</option>
                        <option value="3">Lorem ipsum</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-12 d-flex justify-content-between">
                    <h3 className="text-white">Total: <span>0:00</span> </h3>

                    <h3 className="text-white">Rate: <span>0:00</span> </h3>
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
                <span className="align-middle"><img src={App_5} alt="Ubyco" className="img-fluid"/></span>
              </div>
              <div className="col-lg-6" data-aos="fade-left" data-aos-anchor-placement="center-bottom">
                <div className="featured-icon"><i className="fas fa-spinner t-blue-vibrant"></i></div>
                <h3>Take <mark><span className="t-red">.</span>Ubyco</mark> for a Spin</h3>
                <p>We understand how overwhelming launching a business can be. This is why we've developed the easiest and fastest way to launch your product.</p>
                <h4 className="t-blue-vibrant">Give us a try!</h4>
                <p>Take a quick look at the top features. <br/>We promise you won't regret it.</p>
                <ul data-aos="fade-down" data-aos-anchor-placement="center-bottom">
                  <li><i className="fas fa-check t-blue-vibrant"></i> Transparency</li>
                  <li><i className="fas fa-check t-blue-vibrant"></i> 24/7 Support</li>
                  <li><i className="fas fa-check t-blue-vibrant"></i> Fast Payment</li>
                  <li><i className="fas fa-check t-blue-vibrant"></i> Experience</li>
                  <li><i className="fas fa-check t-blue-vibrant"></i> Fast Trading Platform</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Section Ends --> */}

        {/* <!-- Section --> */}
        <div className="section half-padding light-grey">
          <div className="container">
            <div className="banner white" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
              <h3>Want to know more about  <mark className="light-yellow t-dark"><span className="t-red">.</span>Ubyco</mark>?</h3>
              <p className="center">Reach out to us.</p>
              <div id="fields">

                {/* <!-- CONTACT Form--> */}
                <form id="contact-form" method="POST" action="http://www.schintudesign.com/envato/Ubyco/php/contact.php" role="form">
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
              <a href="#" className="primary-line-btn b-blue-vibrant t-blue-vibrant"><i className="fab fa-facebook"></i>Follow us on Facebook</a>
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
