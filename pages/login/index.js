import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/client";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/img/logo.png";
// import styles from '../../assets/css/login.module.css'

import Link from "next/link";
import Server from "../api/lib/Server";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginStarted, setIsLoginStarted] = useState(false);
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.error) {
      setLoginError(router.query.error.message);
      setEmail(router.query.email);
    }
  }, [router]);

  // const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 8000));
  // toast.promise(
  //     resolveAfter3Sec,
  //     {
  //       pending: 'Processing auth',
  //       success: 'User Authenticated ',
  //       error: 'Something went wrong 🤯'
  //     }
  // )

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoginStarted(true);
    toast.info("Processing request");
    signIn("credentials", {
      email,
      password,
      callbackUrl: `${window.location.origin}/web`,
    })
      .then((res) => {
        toast.success("Login Successful 👌");
      })
      .catch((e) => {
        toast.danger("Login Failed");
      });
  };

  return (
    <div>
      {/* <style jsx>
            
        </style> */}
      <Head>
        <title>Ubyco Login</title>
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
                    <h4 className="title">Welcome Back :)</h4>
                  </div>
                  {/* <!-- section title --> */}
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="contact-form">
                    <form
                      id="contact-form"
                      onSubmit={(e) => handleLogin(e)}
                      data-toggle="validator"
                      autoComplete="off"
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="single-form form-group">
                            <label style={{ display: "block" }}>Email</label>
                            <input
                              type="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                              data-error="Email is required."
                              required="required"
                            />
                            <div className="help-block with-errors">
                              {loginError}
                            </div>
                          </div>
                          {/* <!-- single form --> */}
                        </div>
                        <div className="col-md-12">
                          <div className="single-form form-group">
                            <label style={{ display: "block" }}>Password</label>
                            <input
                              type="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="form-control"
                              data-error="Password is required."
                              required="required"
                            />
                            <div className="help-block with-errors">
                              {loginError}
                            </div>
                          </div>
                          {/* <!-- single form --> */}
                        </div>
                        <div className="col-md-9">
                          <p>
                            Not a member?{" "}
                            <Link href="/signup">Sign Up Now.</Link>
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
                              Login
                            </button>
                          </div>
                          {/* <!-- single form --> */}
                          <hr />
                        </div>
                        <div className="text-center">
                          <h6>
                            <Link href="/reset">Forgotten Password?</Link>
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
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   const token = session?.accessToken;
//   const userData = await Server.get("/", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   try {
//     if (userData.data.status === "success") {
//         return {
//             redirect: {
//               destination: "/web",
//               statusCode: 302,
//             },
//           };
//     }
//   } catch (error) {
//     return {
//       redirect: {
//         destination: "",
//         statusCode: 307,
//       },
//     };
//   }
// }
export const getServerSideProps = async (context) => {
    try {
         const session = await getSession(context);
        const token = session?.accessToken;    
        
        if (!session) throw new Error('Missing auth token cookie')

        const user = await Server.get("/", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
        if(user.status == 200){
            return {
                props: {
                    redirect: {
                        destination: "/web",
                        statusCode: 302,
                      },
                }
            }
        }
    } catch (err) {
        // res.writeHead(307, { Location: '/login' }).end()
        return {
            props: {
            redirect: {
                destination: '/login',
                statusCode: 307
            }
        }
    }
    }
}
//   export const getServerSideProps = async (context) => {
//     try {
//         const session = await getSession(context);

//         if (!session) throw new Error('Missing auth token')

//         // await Server.get('/', { headers: { Authorization: `Bearer ${token}`} })

//         return{
//             props: {},
//             redirect: {
//               destination: '/web',
//               permanent: false
//             }
//           };
//     } catch (err) {
//         // Handle error

//         return {
//             redirect: {
//                 destination: '',
//                 statusCode: 307
//             }
//         }
//     }
// }
export default Login;
