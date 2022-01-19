import Head from "next/head";
// import styles from '../styles/pageStyles/login.module.scss'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/img/logo.png";
import Link from "next/link";

function SignUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginStarted, setIsLoginStarted] = useState(false);
  const [loginError, setLoginError] = useState([]);
  const router = useRouter();


  const register = (e) => {
    e.preventDefault();
    setLoginError([]);
    const data = {name, email, phone, password};
    toast.info("Processing Request");
    fetch("/api/signup", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((res) => {
      console.log("res", res);
        toast.success("Successfully Registered");
        setTimeout(() => {
          router.push("/verify");
        }, 2000);
      })
      .catch((err) => {
        toast.error("Registration Failed");
      })
  };



  return (
    <div>
      <Head>
        <title>Ubyco Register</title>
      </Head>
      <ToastContainer/>
      <div className="page_container">
        <div className="page_content">
          <div className="form_box">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-9 text-center">
                  <div className="section-logo">
                    <img src={Logo} alt="logo" className="col-5" />
                  </div>
                  <div className="section-title pb-10 mt-4">
                    <h4 className="title">Sign Up</h4>
                  </div>
                  {/* <!-- section title --> */}
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="contact-form">
                    <form
                      id="contact-form"
                      onSubmit={(e) => register(e)}
                      data-toggle="validator"
                      autoComplete="off"
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="single-form form-group">
                            <label style={{ display: "block" }}>Fullname</label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="form-control"
                              data-error="Fullname  is required."
                              required="required"
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="single-form form-group">
                            <label style={{ display: "block" }}>Email</label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              data-error="Email is required."
                              required="required"
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                          {/* <!-- single form --> */}
                        </div>{" "}
                        <div className="col-md-12">
                          <div className="single-form form-group">
                            <label style={{ display: "block" }}>Phone</label>
                            <input
                              type="phone-number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="form-control"
                              data-error="Phone is required."
                              placeholder="080*******"
                              required="required"
                              autoComplete="off"
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                          {/* <!-- single form --> */}
                        </div>
                        <div className="col-md-12">
                          <div className="single-form form-group">
                            <label style={{ display: "block" }}>Password</label>
                            <input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control"
                              data-error="Password is required."
                              required="required"
                              autoComplete="off"
                            />
                            <div className="help-block with-errors"></div>
                          </div>
                          {/* <!-- single form --> */}
                        </div>
                        <div className="col-md-9">
                          <p>
                            Already a member?{" "}
                            <Link href="/login">Login Now.</Link>
                          </p>
                        </div>
                        <p className="form-message"></p>
                        <div className="col-md-12">
                          <div className="single-form form-group text-center">
                            <button
                              type="submit"
                              disabled={isLoginStarted}
                              className="btn_1"
                            >
                              Sign Up
                            </button>
                          </div>
                          {/* <!-- single form --> */}
                          <hr />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
