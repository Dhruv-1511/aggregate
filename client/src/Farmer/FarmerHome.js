import React,{useEffect,useState, useContext} from 'react'
import FarmerFooter from "./FarmerFooter";
import FarmerNav from "./FarmerNav";
import AAContext from '../context/AAContext';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'

const FarmerHome = () => {
  const host = process.env.REACT_APP_HOST;
  const context = useContext(AAContext);
  const {getUserData , userData, getAllFarmerRequest, allFarmerRequest, getAllequipment, allequipment, getAllCrops, allcrops} = context;
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    getAllequipment();
    getAllFarmerRequest(user_id);
    getAllCrops();
    }, [])

    
    const HandleApplyNow = (id) =>{
      localStorage.setItem("w_id",id)
      navigate("/fworkerdetail");
    }

    const handleExploreClick = (id) =>{
        console.log(id)
        localStorage.setItem("e_id",id)
        window.location.href = "/farmereqdetail";
    }

    const handleViewClick = (id) =>{
      localStorage.setItem("crop_id",id)
      navigate("/farmercropdetails");
    }

    console.log(allequipment);
    

  return (
    <>
    <div className="main-wrapper">
    <FarmerNav />
      {/* BANNER
  ================================================== */}
      <section
        className="top-position1 bg-img pt-18 pt-md-20 pt-lg-24 pb-6 pb-md-10 section_1 "
        data-overlay-dark={2}
        style={{
            backgroundImage: 'url("img/bg/index4bg_01.jpeg")'
          }}
      >
        <div className="container pb-sm-6 pb-md-8 pb-lg-12">
          <div className="row align-items-center justify-content-center text-center pt-sm-7">
            <div className="col-xl-9 col-xxl-7 mb-1-9 mb-lg-0">
              <div>
                <h1 className="text-white display-sm-14 display-lg-10">
                  Find The Best Worker
                </h1>
              </div>
              <div className="banner-4-form mb-2-9">
                <form action="#!">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="worker, Keyword"
                      aria-label="Job title, Keyword"
                      aria-describedby="button-addon2"
                    />
                    <button className="butn" type="button" id="button-addon2">
                      Find
                    </button>
                  </div>
                </form>
              </div>
              {/* Job Search Form */}
              {/* Popular Search */}
              <div className="row">
                <div className="col-lg-12" />
              </div>
              {/* End Popular Search */}
            </div>
          </div>
        </div>
      </section>
      {/* RECENT JOBS
  ================================================== */}
      <section>
        <div className="container">
          <div className="section-heading4">
            <span>Worker</span>
            <h2>Latest job request</h2>
          </div>
          <div className="featured-candidate owl-carousel owl-theme" style={{display: 'flex'
    ,flexWrap: 'wrap'
   , gap: '10px'}} > 
            {/* start while loop  */}
            {allFarmerRequest && allFarmerRequest.map((e) => {
              return (
                <div key={e._id} className="card card-style7" style={{    width:'32%'}}>
                      <div className="card-body">
                        <a className="candidate-favourite" href="#!">
                          <i className="far fa-heart" />
                        </a>
                        <img
                          src={ e.picture == null ? "img/avatar/user.png" : e.picture}
                          style={{ width: 96, height: 96 }}
                          className="border-radius-50 mb-3"
                          alt="..."
                        />
                        <div className="candidate-info">
                          <h4 className="h5">
                            <a href="#">{e.fullname} </a>
                          </h4>
                          <span className="display-30 text-muted d-block mb-2 font-weight-500" />
                          <div className="display-30 text-warning">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <span className="px-2 py-1 bg-primary text-white ms-2 display-31">
                              4.0
                            </span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span>
                            <i className="ti-location-pin text-secondary me-2 display-31 display-sm-30" />
                            <strong>{e.occupation}, gujarat</strong>
                          </span>
                          {/* <span>
                            <i className="ti-briefcase text-secondary me-2 display-31 display-sm-30" />
                            <strong>{item.work_hour}</strong>
                          </span> */}
                        </div>
                        <button onClick={() => HandleApplyNow(e.sendingid)} className="butn w-100 radius">
                          View Profile
                        </button>
                      </div>
                    </div>
              )
            })}
            
           
            
          </div>
        </div>
      </section>
      {/* TOP COMPANY
  ================================================== */}
      <section className="bg-primary-light company-style-02">
        <div className="container">
          <div className="section-heading4">
            <span>seller</span>
            <h2>Purchase Product &amp; Equipment</h2>
          </div>
          <div className="row mt-n1-9">
            {/* while loop start  */}
            {allequipment && allequipment.map((item) => {
              return (
                <div key={item._id} className="col-md-6 mt-1-9 prod_main">
              <div className="border border-color-extra-light-gray border-radius-10 bg-white px-4 py-1-9 position-relative overflow-hidden text-center text-xl-start h-100">
                <div className="row align-items-center">
                  <div className="col-xl-9 mb-4 mb-xl-0">
                    <div className="d-xl-flex align-items-center">
                      <div className="">
                        <div className="text-center text-xl-start mb-4 mb-xl-0 prod_1">
                          <img
                            className="prod1_img"
                            src={item.equipment_photo == null ? "img/bg/bg.jpg" : item.equipment_photo}
                            alt="..."
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1 border-xl-start border-color-extra-light-gray ms-xl-4 ps-xl-4">
                        <h4 className="h5 mb-3">
                          <a href="employer-details.html">{item.equipment_name}</a>
                        </h4>
                        <ul className="list-style2 mb-0">
                          <li>₹{item.price}</li>
                          <li>
                            <i className="ti-location-pin pe-2 text-secondary" />
                            {item.location}
                          </li>
                        </ul>
                        <div
                          className="col-xl-3 text-xl-end"
                          style={{ marginTop: 10 }}
                        >
                          <button
                            onClick={() => handleExploreClick(item._id)}
                            className="butn butn-md radius"
                          >
                            Explore
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              )
            })}
           

            {/* end while loop  */}
          </div>
        </div>
      </section>
      {/* TESTIMONIAL
  ================================================== */}
      <section>
        <div className="container">
          <div className="section-heading4">
            <span>Yard</span>
            <h2>Sell Your Crop</h2>
          </div>
          <div className="recent-jobs owl-carousel owl-theme" style={{    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px"}}>

          {allcrops && allcrops.map((e) => {
            return (
              <div key={e._id} className="card card-style10" style={{    width: "35%"}}>
              <div className="card-body">
                {/* <span class="popular-jobs-status">Full Time</span> */}
                <div className="popular-jobs-box crop_1" style={{maxWidth: "100%"}}>
                  <img
                    className="mb-4 border-radius-10 crop1_img "
                    src={e.crop_photo == null ? "img/bg/wheat.jpg":e.crop_photo}
                    alt="..."
                    style={{width: "100%"}}
                  />
                </div>
                <div>
                  <h4 className="h5">
                    <a href="#">{e.crop_name}</a>
                  </h4>
                </div>
                <span className="border-end border-color-extra-light-gray pe-2 me-2">
                  <i className="fas fa-map-marker-alt pe-2 text-secondary" />
                 {e.location}
                </span>
                <span className="border-end border-color-extra-light-gray pe-2 me-2">
                  <i className="far fa-clock pe-2 text-secondary" />
                  RS.{e.price}
                </span>
              </div>
              <button onClick={() => handleViewClick(e._id)} className="butn butn-apply">
                View
              </button>
            </div>
            )
          })}
            

          </div>
        </div>
      </section>
              <FarmerFooter />
      </div>
    </>
  );
};

export default FarmerHome;
