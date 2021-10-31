import Head from "next/head";
// import styles from '../styles/pageStyles/login.module.scss'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";

import Background from "../../assets/img/bg7.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [Error, setError] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      setLoginError(router.query.error);
      setEmail(router.query.email);
    }
  }, [router]);


  const doSignUp = async (fullname, phone, email, password,) => {
    setError({})
    const res = await fetch("/api/signup", {
      body: JSON.stringify({
        fullname, phone, email, password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
};

  const container = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    // background: "#333",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
  };
  const heading = {
    color: "#111",
    fontWeight: "bold",
    fontSize: "28px",
    color: "green",
    margin: "0",
  };
  const headtext = {
    fontSize: "14px",
    color: "#333",
    // fontWeight: "bold",
  };
  const formBg = {
    margin: "0",
    padding: "40px",
    background: "#fff",
    borderRadius: "4px",
    boxShadow: "0 .3rem .9rem rgba(0,0,0, .3)",
  };
  const formdiv = {
    width: "320px",
  };
  const label = {
    display: "block",
    fontSize: "14px",
    fontWeight: "bold",
    color: "green",
    margin: "10px 0 5px",
  };
  const loginbtn = {
    display: "block",
    width: "100%",
    margin: "20px 0",
    padding: "12px 24px",
    background: "green",
    border: "none",
    color: "#fff",
    borderRadius: "30px",
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "uppercase",
  };
  const inputs = {
    margin: "5px 0",
    padding: "12px 15px",
    width: "100%",
    borderRadius: "30px",
    border: "1px solid #888",
    // display: "inline-block",
    fontSize: "14px",
  };
  const forgot = {
    fontSize: "14px",
    fontWeight: "bold",
  };
  const flexdiv = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const signuptext = {
    textAlign: "center",
    fontSize: "12px",
    color: "#333",
  };
  const googlebtn = {
    padding: "12px 40px",
    background: "red",
    border: "0",
    borderRadius: "24px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
  };
  const facebookbtn = {
    padding: "12px 40px",
    background: "blue",
    border: "0",
    borderRadius: "24px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
  };

  return (
    <div>
      <Head>
        <title>Ubyco Sign Up</title>
      </Head>
      <main style={container}>
        <div style={formBg}>
          <h1 style={heading}>Welcome.</h1>
          <p style={headtext}>Kindly enter your details below.</p>
          <form onSubmit={(e) => doSignUp(e)} style={formdiv}>
            <label style={label} htmlFor="inputName">
              Full Name
            </label>
            <input
              style={inputs}
              id="inputName"
              type="text"
              value={fullname}
              onChange={(e) => setName(e.target.value)}
            />
            <span>{Error.fullname}</span>
            <label style={label} htmlFor="loginEmail">
              Email
            </label>
            <input
              style={inputs}
              id="loginEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>{Error.email}</span>

            <label style={label} htmlFor="loginEmail">
              Phone
            </label>
            <input
              style={inputs}
              id="loginEmail"
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <span>{Error.email}</span>
            <label style={label} htmlFor="inputPassword">
              Password
            </label>
            <input
              style={inputs}
              id="inputPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             <span>{Error.password}</span>
            <button type="submit" style={loginbtn}>
              signup
            </button>
            <hr></hr>
            <p style={signuptext}>Or Sign In with</p>
            <div style={flexdiv}>
              <button type="button" style={googlebtn}>
                Google
              </button>
              <button type="button" style={facebookbtn}>
                Facebook
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
