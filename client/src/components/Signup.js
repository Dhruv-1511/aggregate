import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WorkerNav from './WorkerNav';
import Footer from './Footer';

const Signup = () => {
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();
  const [data, setData] = useState({name: "", email: "", password: "", phone: "", occupation: "farmer"});

  const handleChange = (e)=>{
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(data)
    const response = await fetch(`${host}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log('json');
    
    const json = await response.json();
    console.log(json);
    if(json.success === false){
      toast.error(json.msg, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }else{
      toast.success('Registered Successfully!', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        setInterval(function(){
          navigate('/login')
        },2000)
      // localStorage.setItem('token',json.authToken);
    }
  }

  return (
    <>
    <ToastContainer
position="top-left"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
<WorkerNav />
         {/* MAIN WRAPPER */}
      <div className="main-wrapper">
        {/* LOGIN */}
        <section
          className="full-screen cover-background bg-img d-flex align-items-center p-0"
          data-overlay-dark={8}
          style={{backgroundImage: 'url("img/bg/authbg2.jpg")', minHeight: '80vh'}}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="row g-0">
                  <div
                    className="col-lg-5 bg-img cover-background min-height-300 rounded-start-lg-10px d-none d-lg-block"
                    style={{backgroundImage: 'url("img/bg/authbg.jpg"'}}
                  />
                  <div className="col-lg-7">
                    <div className="p-1-6 p-sm-1-9 p-lg-2-2 p-xl-2-9 bg-white rounded-start-md-10px rounded-end-lg-10px">
                    <div className="text-center mb-1-6 mb-lg-1-9">
                        <h2 className="h3 mb-0">Create Your Account</h2>
                    </div>
                      <form onSubmit={handleSubmit}>
                      <div className="col-lg-12 mb-3">
                          <label
                            htmlFor="name"
                            className="form-label fs-6 text-muted"
                          >
                            Name
                          </label>
                          <div className="input-group">
                            <div className="input-group-text bg-light border-radius-10">
                              <i className="ti-user" />
                            </div>
                            <input
                              type="text"
                              className="form-control border-radius-10"
                              placeholder="Enter Your Name*"
                              id="name"
                              name="name"
                              onChange={handleChange}
                              value={data.name}
                              required
                            />
                          </div>
                     </div>
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
                              placeholder="Enter Your Email*"
                              id="email"
                              name="email"
                              onChange={handleChange}
                              value={data.email}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 mb-3">
                          <label
                            htmlFor="phone"
                            className="form-label fs-6 text-muted"
                          >
                            Mobile No.
                          </label>
                          <div className="input-group">
                            <div className="input-group-text bg-light border-radius-10">
                              <i className="ti-user" />
                            </div>
                            <input
                              type="number"
                              className="form-control border-radius-10"
                              placeholder="Enter Your Mobile Number*"
                              id="phone"
                              name="phone"
                              onChange={handleChange}
                              value={data.phone}

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
                              value={data.password}
                              required
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
                            <button type="submit" className="butn" onClick={handleSubmit}>
                              Sign Up
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
                      <span>Already have an account ? <Link to="/login" className="font-weight-600">Login here</Link></span>
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
  )
}

export default Signup