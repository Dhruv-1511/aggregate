import React from 'react'
import { Link, useNavigate} from "react-router-dom";
import { useContext, useEffect } from 'react';
import AAContext from '../context/AAContext';

const WorkerNav = (props) => {
  const navigate = useNavigate();
  const context = useContext(AAContext);
  const {getUserData , userData} = context;

  useEffect(() => {
    
  getUserData()
    
  }, [])
  

  // const handleLogout = ()=>{
  //   localStorage.removeItem('token');
  //   navigate("/login");
  // }

  return (
    <>
    <header className="header-style2">
  <div className="navbar-default">
    {/* start top search */}
    <div className="top-search bg-secondary">
      <div className="container-fluid px-lg-1-6 px-xl-2-5 px-xxl-2-9">
        <form
          className="search-form"
          action="https://jobboard.websitelayout.net/search.html"
          method="GET"
          acceptCharset="utf-8"
        >
          <div className="input-group">
            <span className="input-group-addon cursor-pointer">
              <button
                className="search-form_submit fas fa-search text-white"
                type="submit"
              />
            </span>
            <input
              type="text"
              className="search-form_input form-control"
              name="s"
              autoComplete="off"
              placeholder="Search..."
            />
            <span className="input-group-addon close-search mt-1">
              <i className="fas fa-times" />
            </span>
          </div>
        </form>
      </div>
    </div>
    {/* end top search */}
    <div className="container-fluid px-lg-1-6 px-xl-2-5 px-xxl-2-9">
      <div className="row align-items-center">
        <div className="col-12 col-lg-12">
          <div className="menu_area alt-font">
            <nav className="navbar navbar-expand-lg navbar-light p-0">
              <div className="navbar-header navbar-header-custom">
                {/* start logo */}
                <div className="custom_logo1" style={{ fontFamily: "cursive" }}>
                  <Link to="/workerhome" className="navbar-brand logodefault">
                    <img id="logo" src="img/logos/logo.png" alt="logo" />
                    Aggregate Agro
                  </Link>
                </div>
                {/* end logo */}
              </div>
              <div className="navbar-toggler" />
              {/* menu area */}
              <ul
                className="navbar-nav ms-auto"
                id="nav"
              >
                <li>
                  <Link to="/workerhome">Home</Link>
                </li>
                <li>
                  <Link to="/workerjob">Job</Link>
                </li>
                <li>
                  <Link to="/workerchat">Message</Link>
                </li>
                <li>
                  <Link to="/workerabout">About Us</Link>
                </li>
                <li>
                  <Link to="/workercontact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/logout">Log out</Link>
                </li>
              </ul>
              {/* end menu area */}
              {/* start attribute navigation */}
              <div className="attr-nav align-items-lg-center ms-lg-auto">
                <ul>
                  {/* <li className="search">
                    <a href="#!">
                      <i className="fa fa-search" />
                    </a>
                  </li> */}
                  <li className="d-none d-xl-inline-block">
                    <a href="#">{userData.email}</a>
                  </li>
                  <li>
                    <a href="myprofile.php">
                      {" "}
                      <Link to="/workerprofile">
                      <div className="profile_img">
                        <img
                          className="rounded-circle"
                          alt="100x100"
                          src="img/avatar/user.png"
                          data-holder-rendered="true"
                          style={{ width: 50, height: 45 }}
                        />
                      </div>
                      </Link>
                    </a>
                  </li>
                </ul>
              </div>
              {/* end attribute navigation */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

    </>
  )
}

export default WorkerNav