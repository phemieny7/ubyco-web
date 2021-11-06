import Head from 'next/head'
// import styles from '../styles/pageStyles/login.module.scss'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn, getSession } from 'next-auth/client'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from '../../assets/img/logo.png'

import Link from 'next/link'

 function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoginStarted, setIsLoginStarted] = useState(false)
  const [loginError, setLoginError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (router.query.error) {
      setLoginError(router.query.error.message)
      setEmail(router.query.email)
    } 
  }, [router])
  
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    import("../../assets/css/login.module.css")
}, []);

  const handleLogin = (e) => {
    e.preventDefault()
    setLoginError('')
    setIsLoginStarted(true)
    toast.success("Login.....");
    signIn('credentials',
      {
        email,
        password,
        callbackUrl: `${window.location.origin}/admin/dashboard`
      }
    ).then((res) => {
        console.log('I did login');
      })
      .catch((e) => {
        setError('login error');
      });
  }

 
  return (
    <div>
      <Head>
        <title>Ubyco Login</title>
      </Head>
      <div className="page-container">
        <div className="page-content">
            <div className="form_box">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9 text-center">
                            <div className="section-logo">
                                <img src={Logo} alt="logo" className="col-5"/>
                            </div>
                            <div className="section-title pb-10 mt-4">
                                <h4 className="title">Welcome Back :)</h4>
                            </div>
                             {/* <!-- section title --> */}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="contact-form">
                                <form id="contact-form" onSubmit={(e) => handleLogin(e)} data-toggle="validator">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="single-form form-group">
                                                <label style={{display: "block"}}>Email</label>
                                                <input type="email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" data-error="Email is required."
                                                    required="required"/>
                                                <div className="help-block with-errors">{loginError}</div>
                                            </div>
                                             {/* <!-- single form --> */}
                                        </div>
                                        <div className="col-md-12">
                                            <div className="single-form form-group">
                                                <label style={{display: "block"}}>Password</label>
                                                <input type="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" data-error="Password is required."
                                                    required="required"/>
                                                <div className="help-block with-errors">{loginError}</div>
                                            </div> 
                                            {/* <!-- single form --> */}
                                        </div>
                                        <div className="col-md-9">
                                            <p>Not a member? <Link href="/signup">Sign Up Now.</Link></p>
                                        </div>
                                        <p className="form-message"></p>
                                        <div className="col-md-12">
                                            <div className="single-form form-group text-center">
                                                <button type="submit" disabled={isLoginStarted}  className="btn_1">Login</button>
                                            </div>
                                             {/* <!-- single form --> */}
                                            <hr/>
                                        </div>
                                        <div className="text-center">
                                            <h6><Link href="/reset">Forgotten Password?</Link></h6>
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

export default Login;