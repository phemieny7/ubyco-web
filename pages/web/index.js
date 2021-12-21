
import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import App_1 from "../../src/assets/img/app-1.png";
import App_2 from "../../src/assets/img/app-2.png";
import App_3 from "../../src/assets/img/app-1.png";
import App_4 from "../../src/assets/img/app-4.png";
import App_5 from "../../src/assets/img/app-5.png";
import User_1 from "../../src/assets/img/user1.jpg";
import User_2 from "../../src/assets/img/user2.jpg";
import User_3 from "../../src/assets/img/user3.jpg";
import Logo from "../../src/assets/logo.png";
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
          <div className="container">
            {/* <!-- Change path logo here --> */}
            <div className="logo left"><a href="#"><mark className="light-yellow"><span className="t-red">.</span>Lancio</mark></a></div>
            
            <ul className="menu right">
              <li>Contacts</li>
              <li>Home</li>
              <li><a className="primary-btn small light-grey t-blue-vibrant" href="#about">GIVE IT A TRY</a></li>
            </ul>
          </div>
        </header>

        {/* <!-- Section --> */}
        <div id="start" className="section light-grey back one">
          <div className="container">
            <div className="content row">
              <div className="col-lg-6" data-aos="fade-right" data-aos-anchor-placement="center-bottom">
                <h1>Launch your app with a <mark className="light-yellow">reliable</mark> partner.</h1>
                <h5>The best and easiest way to get your business up and running. Save money and time!</h5>
                <div className="cta-container">
                  <a href="#" className="primary-btn blue-vibrant t-white"><i className="fab fa-apple"></i>Get it on Apple Store</a>
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
                      <div className="carousel-item active"><img src={App_1} alt="Lancio" className="img-fluid"/></div>
                      <div className="carousel-item"><img src={App_2} alt="Lancio" className="img-fluid"/></div>
                      <div className="carousel-item"><img src={App_3} alt="Lancio" className="img-fluid"/></div>
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
                  <h4>Boostrap 4 / Font Awesome 5</h4>
                  <p>Coded friendly built on the Latest Bootstrap & Font Awesome.</p>
                </div>
              </div>
              <div className="col-lg-4" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <div className="info-box white">
                  <div className="t-blue-vibrant"><i className="fas fa-code"></i></div>
                  <h4>Clean & Fresh Design</h4>
                  <p>Elegant, minimalistic & fresh design with attention to details.</p>
                </div>
              </div>
              <div className="col-lg-4" data-aos="fade-down" data-aos-anchor-placement="center-bottom">
                <div className="info-box">
                  <div className="t-blue-vibrant"><i className="fas fa-fill-drip"></i></div>
                  <h4>Flexible and Versatile</h4>
                  <p>Great selection of most used web colors. Super easy to modify.</p>
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
                <span className="align-middle"><img src={App_4} alt="Lancio" className="img-fluid"/></span>
              </div>
              <div className="col-lg-6" data-aos="fade-down" data-aos-anchor-placement="center-bottom">
                <h1>A good <span className="t-blue-vibrant">start</span> is half of the job.</h1>
                <h5>We understand how overwhelming launching a business can be. This is why we've developed the easiest and fastest way to launch your product. <br/> Take a detailed look at our innovative business model.</h5>
                <div className="cta-container">
                  <a href="#" className="primary-line-btn  b-red t-red"><i className="far fa-file-alt"></i>Download white paper</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Section Ends --> */}

        {/* <!-- Section --> */}
        <div className="section dark back five half-padding">
          <div className="container">

            {/* <!-- Testimonials --> */}
            <div className="testimonial-container" data-aos="fade-down" data-aos-anchor-placement="center-bottom">
              <div id="t-item" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#t-item" data-slide-to="0" className="active blue-vibrant"></li>
                  <li data-target="#t-item" data-slide-to="1" className="blue-vibrant"></li>
                  <li data-target="#t-item" data-slide-to="2" className="blue-vibrant"></li>
                </ol>
                <div className="carousel-inner content">

                  {/* <!-- Testimonial Item --> */}
                  <div className="carousel-item active">
                    <div className="item">
                      <div className="img center"><img src={User_1} alt="Lancio" className="img-fluid"/></div>
                      <div className="icon t-white"><i className="fas fa-quote-right"></i></div>
                      <div className="text t-white">Lancio is a must-have tool. Maybe one of the best product launch templates so far in the market. Recommended 100%.</div>
                      <div className="name t-blue-vibrant">MARIA De ANDRE'</div>
                      <div className="role t-light-blue">Artist</div>
                    </div>
                  </div>

                  {/* <!-- Testimonial Item --> */}
                  <div className="carousel-item">
                    <div className="item">
                      <div className="img center"><img src={User_1} alt="Lancio" className="img-fluid"/></div>
                      <div className="icon t-white"><i className="fas fa-quote-right"></i></div>
                      <div className="text t-white">Extremelly flexible and easy to use. Code is clean and all files well organized. Great job guys.</div>
                      <div className="name t-blue-vibrant">JOHN E. PERRY</div>
                      <div className="role t-light-blue">Moravian Ltd - CEO</div>
                    </div>
                  </div>

                  {/* <!-- Testimonial Item --> */}
                  <div className="carousel-item">
                    <div className="item ">
                      <div className="img center"><img src={User_3} alt="Lancio" className="img-fluid"/></div>
                      <div className="icon t-white"><i className="fas fa-quote-right"></i></div>
                      <div className="text t-white">Fast, easy, reliable, fun, flexible, modern. Many options, colors, widgets. +++</div>
                      <div className="name t-blue-vibrant">LINDA FALANGY</div>
                      <div className="role t-light-blue">Graphic Designer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Section Ends --> */}

        {/* <!-- Section --> */}
        <div className="section half-padding light-grey">
          <div className="container">
            <h1 className="center" data-aos="fade-down" data-aos-anchor-placement="center-bottom">Price Packages Plans.</h1>
            <h5 className="center" data-aos="fade-up" data-aos-anchor-placement="center-bottom">Upgrade to a Pro plan and get more features, styles, kits, & actual human tech support.</h5>
            <div className="content row center price-plans-container">

              {/* <!-- Price Table --> */}
              <div className="col-lg-4" data-aos="fade-right" data-aos-anchor-placement="center-bottom">
                <div className="info-box white">
                  <div className="t-dark mini-title">Free</div>
                  <div className="price t-blue-vibrant"><span className="currency">$</span>0<span className="value">/mo</span></div>
                  <ul className="highlights">
                    <li className="hg-item t-dark"><i className="fas fa-check t-green"></i> Create unique websites</li>
                    <li className="hg-item t-dark"><i className="fas fa-check t-green"></i> Built in Boostrap 4</li>
                    <li className="hg-item not-included t-dark"><i className="fas fa-times t-red"></i> Stunning ready colors</li>
                    <li className="hg-item not-included t-dark"><i className="fas fa-times t-red"></i> Limiteless variations</li>
                    <li className="hg-item not-included t-dark"><i className="fas fa-times t-red"></i> Optimize all your efforts</li>
                    <li className="hg-item t-dark"><i className="fas fa-check t-green"></i> Basic Support</li>
                    <li className="hg-item"><a href="#" className="primary-line-btn b-blue-vibrant t-blue-vibrant">Get Started</a></li>
                  </ul>
                </div>
              </div>
              {/* <!-- End --> */}

              {/* <!-- Price Table Featured--> */}
              <div className="col-lg-4" data-aos="fade-down" data-aos-anchor-placement="center-bottom">
                <div className="info-box dark featured">
                  <span className="top-border blue-vibrant"></span>
                  <div className="t-white mini-title">Basic</div>
                  <div className="price t-white"><span className="currency">$</span>9,99<span className="value">/mo</span></div>
                  <ul className="highlights">
                    <li className="hg-item t-light-blue"><i className="fas fa-check t-green"></i> Create unique websites</li>
                    <li className="hg-item t-light-blue"><i className="fas fa-check t-green"></i> Built in Boostrap 4</li>
                    <li className="hg-item t-light-blue"><i className="fas fa-check t-green"></i> Stunning ready colors</li>
                    <li className="hg-item t-light-blue not-included"><i className="fas fa-times t-red"></i> Limiteless variations</li>
                    <li className="hg-item t-light-blue not-included"><i className="fas fa-times t-red"></i> Optimize all your efforts</li>
                    <li className="hg-item t-light-blue"><i className="fas fa-check t-green"></i> Premium Support</li>
                    <li className="hg-item"><a href="#" className="primary-btn blue-vibrant t-white">Get Started</a></li>
                  </ul>
                </div>
              </div>
              {/* <!-- End --> */}

              {/* <!-- Price Table --> */}
              <div className="col-lg-4" data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                <div className="info-box white">
                  <div className="t-dark mini-title">Premium</div>
                  <div className="price t-blue-vibrant"><span className="currency">$</span>19,99<span className="value">/mo</span></div>
                  <ul className="highlights">
                    <li className="hg-item t-dark"><i className="fas fa-check t-green"></i> Create unique websites</li>
                    <li className="hg-item t-dark"><i className="fas fa-check t-green"></i> Built in Boostrap 4</li>
                    <li className="hg-item t-dark"><i className="fas fa-check t-green"></i> Stunning ready colors</li>
                    <li className="hg-item t-dark"><i className="fas fa-check t-green"></i> Limiteless variations</li>
                    <li className="hg-item t-dark"><i className="fas fa-check t-green"></i> Optimize all your efforts</li>
                    <li className="hg-item t-dark"><i className="fas fa-check t-green"></i> Premium Support</li>
                    <li className="hg-item"><a href="#" className="primary-line-btn b-blue-vibrant t-blue-vibrant">Get Started</a></li>
                  </ul>
                </div>
              </div>
              {/* <!-- End --> */}
            </div>
          </div>
        </div>
        {/* <!-- Section Ends --> */}

        {/* <!-- Section --> */}
        <div className="section light-grey" id="about">
          <div className="container">
            <div className="content row">
              <div className="col-lg-6">
                <span className="align-middle"><img src={App_5} alt="Lancio" className="img-fluid"/></span>
              </div>
              <div className="col-lg-6" data-aos="fade-left" data-aos-anchor-placement="center-bottom">
                <div className="featured-icon"><i className="fas fa-spinner t-blue-vibrant"></i></div>
                <h3>Take <mark><span className="t-red">.</span>Lancio</mark> for a Spin</h3>
                <p>We understand how overwhelming launching a business can be. This is why we've developed the easiest and fastest way to launch your product.</p>
                <h4 className="t-blue-vibrant">Give us a try!</h4>
                <p>Take a quick look at the top features. <br/>We promise you won't regret it.</p>
                <ul data-aos="fade-down" data-aos-anchor-placement="center-bottom">
                  <li><i className="fas fa-check t-blue-vibrant"></i> Create unique websites</li>
                  <li><i className="fas fa-check t-blue-vibrant"></i> Built in Boostrap 4</li>
                  <li><i className="fas fa-check t-blue-vibrant"></i> Stunning ready colors</li>
                  <li><i className="fas fa-check t-blue-vibrant"></i> Limiteless variations</li>
                  <li><i className="fas fa-check t-blue-vibrant"></i> Optimize all your efforts</li>
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
              <h3>Want to know more about  <mark className="light-yellow t-dark"><span className="t-red">.</span>Lancio</mark>?</h3>
              <p className="center">Subscribe our newsletter for occasional updates.</p>
              <div id="fields">

                {/* <!-- CONTACT Form--> */}
                <form id="contact-form" method="POST" action="http://www.schintudesign.com/envato/lancio/php/contact.php" role="form">
                  <div id="note" className="messages t-snow"></div>
                  <div className="controls center">

                    {/* <!-- form-group--> */}
                    <div className="form-group">
                      <input id="form_email" type="email" name="email" className="form-control light-grey" placeholder="Email address*" required="required" data-error="Valid email is required."/>
                        <input type="submit" name="submit" id="submit" className="primary-btn blue-vibrant" value="Notify Me"/>
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
            <h5 className="t-grey center">#applancio</h5>
            <div className="cta-container center">
              <a href="#" className="primary-line-btn b-pink t-pink"><i className="fab fa-instagram"></i>Follow us on Instagram</a>
              <a href="#" className="primary-line-btn b-blue-vibrant t-blue-vibrant"><i className="fab fa-facebook"></i>Follow us on Facebook</a>
            </div>
          </div>
          {/* <!-- Footer --> */}
          <footer>
            <div className="copyright t-white center">All rights reserved to &copy;Lancio</div>
          </footer>
        </div>
      </div>
    </>
  );
}
