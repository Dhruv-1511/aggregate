import React, { useEffect, useContext, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import AAContext from '../context/AAContext';
import WorkerNav from './WorkerNav';
import Footer from './Footer';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const host = process.env.REACT_APP_HOST;
  const [data, setData] = useState({ email: "", password: "", occupation: "farmer" });
  const context = useContext(AAContext);
  const { getUserData, userData } = context;
    useEffect(() => {
      if(!localStorage.getItem('token')){
        navigate("/login");
      }else{
          getUserData()
        }
        
    }, []);
    if(userData.occupation == 'farmer'){
      window.location.href = "/farmerhome" 
    }else if(userData.occupation == 'worker'){
      window.location.href = "/workerhome" 
    }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    if (json.success === false) {
      toast.error(json.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      console.log(json)
      if (json.obj.occupation == data.occupation) {
        toast.success("Login successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        if(json.obj.occupation == 'farmer'){
          setInterval(function(){
            localStorage.setItem("user_id",json.obj._id);
            window.location.href = "/farmerhome" 
          },2000)
        }else if(json.obj.occupation == 'worker'){
          setInterval(function(){
            localStorage.setItem("user_id",json.obj._id);
            window.location.href = "/workerhome" 
          },2000)
        }else if(json.obj.occupation == 'seller'){
          setInterval(function(){
            localStorage.setItem("user_id",json.obj._id);
            window.location.href = "/sellerhome" 
          },2000)
        }
      }else {
        toast.error("Invalid credentails", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      localStorage.setItem("token", json.authToken);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <WorkerNav />
      {/* MAIN WRAPPER */}
      <div className="main-wrapper">
        {/* LOGIN */}
        <section
          className="full-screen cover-background bg-img d-flex align-items-center p-0"
          data-overlay-dark={8}
          style={{
            backgroundImage: 'url("img/bg/authbg2.jpg")',
            minHeight: "80vh",
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="row g-0">
                  <div
                    className="col-lg-5 bg-img cover-background min-height-300 rounded-start-lg-10px d-none d-lg-block"
                    style={{ backgroundImage: 'url("img/bg/authbg.jpg"' }}
                  />
                  <div className="col-lg-7">
                    <div className="p-1-6 p-sm-1-9 p-lg-2-2 p-xl-2-9 bg-white rounded-start-md-10px rounded-end-lg-10px">
                      <div className="text-center mb-1-6 mb-lg-1-9">
                        <h2 className="h3 mb-0">Login Your Account</h2>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="col-lg-12 mb-3">
                          <label
                            htmlFor="username"
                            className="form-label fs-6 text-muted"
                          >
                            Email
                          </label>
                          <div className="input-group">
                            <div className="input-group-text bg-light border-radius-10">
                              <i className="ti-email" />
                            </div>
                            <input
                              type="email"
                              className="form-control border-radius-10"
                              placeholder="Enter Your Username*"
                              id="email"
                              onChange={handleChange}
                              name="email"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <label
                            className="form-label fs-6 text-muted"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <div className="input-group mb-4">
                            <div className="input-group-text bg-light border-radius-10">
                              <i className="ti-unlock" />
                            </div>
                            <input
                              type="Password"
                              className="form-control border-radius-10"
                              placeholder="Enter Your Password*"
                              id="password"
                              name="password"
                              onChange={handleChange}
                            />
                          </div>
                          {/* <div className="d-sm-flex justify-content-between align-items-center mb-4">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue=""
                                id="login-remember"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="login-remember"
                              >
                                Remember Me
                              </label>
                            </div>
                            <div>
                              <a
                                href="forgot-password.html"
                                className="text-primary font-weight-500"
                              >
                                Forget Password?
                              </a>
                            </div>
                          </div> */}
                        </div>
                        <div className="col-lg-12 mb-3">
                          <label
                            htmlFor="username"
                            className="form-label fs-6 text-muted"
                          >
                            Occupation
                          </label>
                          <div className="input-group">
                            <div className="input-group-text bg-light border-radius-10">
                              <i className="ti-user" />
                            </div>
                            <select
                              name="occupation"
                              onChange={handleChange}
                              className="form-control border-radius-10"
                              required
                            >
                              <option value="farmer" seleted="true">
                                Farmer
                              </option>
                              <option value="worker">Worker</option>
                              <option value="seller">Seller</option>
                              {/* <option value="yard">Yard</option> */}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="d-grid">
                            <button type="submit" className="butn">
                              Sign In
                            </button>
                          </div>
                        </div>
                      </form>
                      {/* <div className="login-divider">
                        <span className="fs-6 bg-white z-index-1 p-2 mb-0 text-muted font-weight-600">
                          Or Login With
                        </span>
                      </div>
                      <div className="row mb-1-9">
                        <div className="col-lg-4 mb-3 mb-lg-0">
                          <div className="form-social-item">
                            <a
                              href="#!"
                              className="facebook vertical-align-middle"
                            >
                              <i className="ti-facebook me-2 display-30" />
                              Facebook
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-4 mb-3 mb-lg-0">
                          <div className="form-social-item">
                            <a
                              href="#!"
                              className="twitter vertical-align-middle"
                            >
                              <i className="ti-twitter-alt me-2 display-30" />
                              Twitter
                            </a>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-social-item">
                            <a
                              href="#!"
                              className="linkedin vertical-align-middle"
                            >
                              <i className="ti-linkedin me-2 display-30" />
                              Linkedin
                            </a>
                          </div>
                        </div>
                      </div> */}
                      <div className="mt-3 d-flex justify-content-center align-items-center">
                        <span>
                          Not registered ?{" "}
                          <Link to="/signup" className="font-weight-600">
                            Create account
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
     
    </>
  );
};

export default Login;
