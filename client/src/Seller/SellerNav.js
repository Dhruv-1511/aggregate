import React,{useState} from 'react'
import { Link} from "react-router-dom";
import { useContext, useEffect } from 'react';
import AAContext from '../context/AAContext';

const SellerNav = (props) => {
      const host = process.env.REACT_APP_HOST;

  const context = useContext(AAContext);
  const {getUserData , userData} = context;
  const user_id = localStorage.getItem("user_id");
  // console.log(user_id)

  const [unreadFarmerReq, setUnreadFarmerReq] = useState([])
    useEffect(() => {
      getUserData()
    }, [])

    const getAllUnreadFarmerReq = async(id)=>{
        // console.log(id)
        const response = await fetch(`${host}/farmerapi/getallujob`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem('token'), 
            },
            body: JSON.stringify({myid: id, status: "pending", isread : false})
        })
        const json = await response.json();
        // console.log(json)
        setUnreadFarmerReq(json.request);
      }
      
      useEffect(() => {
        getAllUnreadFarmerReq(user_id)
        // console.log(unreadFarmerReq.length)
        
    }, [])

    setTimeout(() => {
      if(unreadFarmerReq.length > 0){
        document.getElementById('notify').style.removeProperty('display');

      }
    }, 2000);
    

  const handleHomeClick = ()=>{
    window.location.href = "/sellerhome" 
  }
  const handleLogoutClick = ()=>{
    window.location.href = "/logout" 
  }
  
  const handleOnNotify =async () =>{
    const response = await fetch(`${host}/request/updateisread`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "auth-Token": localStorage.getItem('token'), 
      },
      body: JSON.stringify({ receivingid: user_id, isread : true})
    });
    const json = await response.json();
    // console.log(json)
    window.location.href = "/sellernotify" 
  }

  return (
    <header className="header-style2" style={{zIndex: "1000"}}>
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
                    <Link  onClick={handleHomeClick} className="navbar-brand logodefault">
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
                    <Link  onClick={handleHomeClick}>Home</Link>
                  </li>
                  <li>
                    <Link to="/sellerproduct">Product</Link>
                  </li>
                  {/* <li>
                    <Link to="/chat">Message</Link>
                  </li> */}
                  <li>
                    <Link to="/sellerabout">About Us</Link>
                  </li>
                  <li>
                    <Link to="/sellercontact">Contact Us</Link>
                  </li>
                  <li><a href="#!">Explore</a>
                                            <ul>
                                                <li>    <Link to="/sellerproductupload">Upload Product</Link>
                                                </li>
                                                <li>
                                                <Link to="/sellernotify">Purchase Request</Link>
                                                </li>
                                                <li>
                    <Link onClick={handleLogoutClick}>Logout</Link>
                  </li>
                                            </ul>
                                        </li>
                </ul>
                {/* end menu area */}
                {/* start attribute navigation */}
                <div className="attr-nav align-items-lg-center ms-lg-auto">
                  <ul>
                    <li className="search mx-3">
                      <Link onClick={handleOnNotify}>
                      <i class="fa-regular fa-bell"
                       style={{fontSize: '22px'}}>
                        <i class="fa-solid fa-circle"
                        id="notify"
                        style={{
                        position: "relative",
                        top: '-12px',
                        color: '#DC3545',
                        right: '10px',
                        fontSize: '10px',
                        display: "none"
                        }}></i>
                      </i>
                      </Link>
                    </li>
                    <li className="d-none d-xl-inline-block">
                      <a href="#">{userData.email}</a>
                    </li>
                    <li>
                        <Link to="/sellerprofile">
                        <div className="profile_img">
                          <img
                            className="rounded-circle"
                            alt="100x100"
                            src={ userData.profile_picture == null ? "img/avatar/user.png" : userData.profile_picture}
                            data-holder-rendered="true"
                            style={{ width: 50, height: 45 }}
                          />
                        </div>
                        </Link>
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
  )
}

export default SellerNav