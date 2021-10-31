import Head from 'next/head'
// import styles from '../styles/pageStyles/login.module.scss'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn, getSession } from 'next-auth/client'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from '../../assets/img/logo.png'
import styles from '../../assets/css/login.module.css'

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
      {/* <main style={container}>
        <div style={formBg}>
          <h1 style={heading}>Hello.</h1>
          <p style={headtext}>Kindly enter your details below.</p>
          <form onSubmit={(e) => handleLogin(e)} style={formdiv}>
            <label style={label} htmlFor='loginEmail'>Email</label>
            <input style={inputs} id='loginEmail' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <span>{loginError}</span>
            <label style={label} htmlFor='inputPassword'>Password</label>
            <input style={inputs} id='inputPassword' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <p style={forgot}>Forgot Password?</p>
            <button type='submit' disabled={isLoginStarted} style={loginbtn}>Login</button>
            {/* <hr></hr> */}
            {/* <p style={signuptext}>Or Sign In with</p>
            <div style={flexdiv}>
            <button type='button' style={googlebtn}>Google</button>
            <button type='button' style={facebookbtn}>Facebook</button>
            </div> */}
          {/* </form> */}
        {/* </div> */}
      {/* </main> */} 

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
                                                <label>Email</label>
                                                <input type="email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" data-error="Email is required."
                                                    required="required"/>
                                                <div className="help-block with-errors"></div>
                                            </div>
                                             {/* <!-- single form --> */}
                                        </div>
                                        <div className="col-md-12">
                                            <div className="single-form form-group">
                                                <label>Password</label>
                                                <input type="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" data-error="Password is required."
                                                    required="required"/>
                                                <div className="help-block with-errors"></div>
                                            </div> 
                                            {/* <!-- single form --> */}
                                        </div>
                                        <div className="col-md-9">
                                            <p>Not a member? <a href="signup.html">Sign Up Now.</a></p>
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
                                            <h6><a href="reset.html">Forgotten Password?</a></h6>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="form_box">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="section-title text-center pb-10">
                            <h6>Login With</h6>
                        </div>
                    </div>
                </div>

                <div className="d-flex mt-4 align-items-center justify-content-around">
                    <div className="icon facebook d-flex align-items-center flex-column">
                        <i className="lni lni-facebook-filled"></i>
                    </div>

                    <div className="icon google d-flex align-items-center flex-column">
                        <i className="lni lni-google"></i>
                    </div>

                    <div className="icon linkedin d-flex align-items-center flex-column">
                        <i className="lni lni-linkedin"></i>
                    </div>
                </div>
            </div> */}
        </div>
    </div>

    </div>
  )
}

export default Login;