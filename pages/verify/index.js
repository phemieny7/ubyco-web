import Head from 'next/head'
// import styles from '../styles/pageStyles/login.module.scss'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/client'

import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/img/logo.png";
// import styles from '../../assets/css/login.module.css'

import Link from "next/link";
import Server from "../api/lib/Server";

import Background from '../../assets/img/bg7.jpg'

export default function Reset () {
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginStarted, setIsLoginStarted] = useState(false)
  const [loginError, setLoginError] = useState('')
  const router = useRouter()
  
 

  const formSubmit = async() => {
    toast.info("verifying user");
    // const data = {accountId, amount};
    const res = await fetch("/api/verify", {
      body: JSON.stringify({
       code
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (res.status < 300) {
      setTimeout(() => {
      toast.success("User account created successfull");
      }, 5000)
      router.redirect("login")
    } else {
      toast.error("Failed to update account information!");
    }
  };


  return (
    <div>
      {/* <style jsx>
            
        </style> */}
      <Head>
        <title>Ubyco Verify Account</title>
      </Head>
      <ToastContainer />
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
                    <h4 className="title">User Verification</h4>
                  </div>
                  {/* <!-- section title --> */}
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="contact-form">
                    <form
                      id="contact-form"
                      onSubmit={(e) => formSubmit(e)}
                      data-toggle="validator"
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="single-form form-group">
                            <label style={{ display: "block" }}>Code</label>
                            <input
                              
                              type="number"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                              className="form-control"
                              data-error="Code is required."
                              required="required"
                            />
                            <div className="help-block with-errors">
                              {loginError}
                            </div>
                          </div>
                          {/* <!-- single form --> */}
                        </div>
                        <p className="form-message"></p>
                        <div className="col-md-12">
                          <div className="single-form form-group text-center">
                            <button
                              type="submit"
                              disabled={isLoginStarted}
                              className="btn_1 sun"
                            >
                             Verify Now 
                            </button>
                          </div>
                          {/* <!-- single form --> */}
                          <hr />
                        </div>
                        <div className="text-center">
                          <h6>
                            <Link href="/login">Back to Login</Link>
                          </h6>
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
  )
}