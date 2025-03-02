import React,{useEffect,useContext,useState} from 'react'
import { Link } from 'react-router-dom'
import FarmerFooter from './FarmerFooter'
import AAContext from '../context/AAContext';
import { useNavigate } from "react-router-dom";
import FarmerNav from './FarmerNav'

const FarmerCrop = () => {
  const host = process.env.REACT_APP_HOST;
  const context = useContext(AAContext);
  const navigate = useNavigate();
  const {getAllCrops, allcrops} = context;

  useEffect(() => {
    getAllCrops();
    }, [])

  const handleViewClick = (id) =>{
    localStorage.setItem("crop_id",id)
    navigate("/farmercropdetails");
  }


  return (
    <div className="main-wrapper">
  {/* HEADER
  ================================================== */}
  <FarmerNav />
  {/* PAGE TITLE
  ================================================== */}
  <section className="page-title-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 text-center">
          <h1 className="h2 mb-4">Aggregate Agro</h1>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="page-title-list">
                <span>My Crops</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* CANDIDATE GRID
  ================================================== */}
  <section>
    <div className="container">
      <div className="row">
        {/* candidate-grid left */}
        {/* <div className="col-lg-12 order-2 order-lg-1">
          <div className="sidebar">
            <div className="sidebar-title">Search State</div>
            <div className="widget search">
              <form action="#!" className="search-bar d-flex">
                <div className="quform-element form-group">
                  <label htmlFor="search">Search By State</label>
                  <div className="quform-input">
                    <input
                      className="form-control border-radius-10"
                      id="search"
                      type="text"
                      name="search"
                      placeholder="search State"
                    />
                  </div>
                </div>
                <div className="quform-element form-group ms-4">
                  <label htmlFor="pincode">City</label>
                  <div className="quform-input">
                    <input
                      className="form-control border-radius-10"
                      id="pincode"
                      type="City"
                      name="pincode"
                      placeholder="Search City"
                    />
                  </div>
                </div>
                <div className="quform-element form-group ms-4">
                  <label htmlFor="category">Crop</label>
                  <div className="quform-input">
                    <select
                      id="category"
                      className="form-control form-select border-radius-10"
                      name="category"
                    >
                      <option value="">Choose Crop</option>
                      <option value="Accounting">Tomato</option>
                      <option value="Marketing">Cotton</option>
                      <option value="Design">Onion</option>
                    </select>
                  </div>
                </div>
                <input
                  type="button"
                  defaultValue="Search"
                  className="cropsearchbtn"
                  style={{
                    width: "15%",
                    height: "10%",
                    padding: 10,
                    marginLeft: "36%",
                    marginTop: 28,
                    border: 0,
                    borderRadius: 10,
                    color: "white",
                    background: "#26ae61"
                  }}
                />
              </form>
            </div>
          </div>
        </div> */}
        {/* end candidate-grid left */}
        {/* candidate-grid right */}
        <div className="col-lg-12 order-1 order-lg-2 mb-6 mb-lg-0">
          <div className="ps-lg-1-6 ps-xl-1-9">
            <div className="row mb-2-5">
              <div className="col-lg-12">
                <div className="d-md-flex justify-content-between align-items-center">
                  {/* <div class="mb-4 mb-md-0">
                                      <h4 class="mb-0 h5">Showing 1–10 of <span class="text-primary">10 Candidate</span></h4>
                                  </div> */}
                  {/* <form action="#!" method="post" enctype="multipart/form-data" onclick="">
                                      <div class="quform-elements">
                                          <div class="row align-items-center">
                                            
                                              <div class="col-md-6 mb-4 mb-md-0">
                                                  <div class="quform-element">
                                                      <div class="quform-input">
                                                          <select id="sortby" class="form-control form-select border-radius-10" name="sortby">
                                                              <option value="">Sort By</option>
                                                              <option value="New Jobs">New Jobs</option>
                                                              <option value="Freelance">Freelance</option>
                                                              <option value="Full Time">Full Time</option>
                                                              <option value="Internship">Internship</option>
                                                              <option value="Part Time">Part Time</option>
                                                              <option value="Temporary">Temporary</option>
                                                          </select>
                                                      </div>
                                                  </div>
                                              </div>
                                            
                                              <div class="col-md-6">
                                                  <div class="quform-element">
                                                      <div class="quform-input">
                                                          <select id="show" class="form-control form-select border-radius-10" name="show">
                                                              <option value="">Show</option>
                                                              <option value="Show 10">Show 10</option>
                                                              <option value="Show 20">Show 20</option>
                                                              <option value="Show 30">Show 30</option>
                                                              <option value="Show 40">Show 40</option>
                                                              <option value="Show 50">Show 50</option>
                                                              <option value="Show 60">Show 60</option>
                                                          </select>
                                                      </div>
                                                  </div>
                                              </div>
                                              
                                          </div>
                                      </div>
                                  </form> */}
                </div>
              </div>
            </div>
            <div className="row mt-n1-9">
              {allcrops && allcrops.map((e)=>{
                return (
                  <div key={e._id} className="col-md-6 mt-1-9">
                <div className="card card-style7 radius-10" style={{width: "70%"}}>
                  <div className="card-body" style={{maxWidth: "100%"}}>
                    <img
                      src={e.crop_photo == null ?"img/bg/onion.jpg": e.crop_photo}
                      className="border-radius-0 mb-3"
                      alt="..."
                      style={{    width: "60%"}}
                    />
                    <div className="candidate-info">
                      <h4 className="h5">
                        <a href="candidate-details.html">{e.crop_name}</a>
                      </h4>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>
                        <i className="ti-location-pin text-secondary me-2 display-31 display-sm-30" />
                        <strong>Gujarat</strong>
                      </span>
                      <span>
                        <i className="ti-briefcase text-secondary me-2 display-31 display-sm-30" />
                        <strong>{e.location}</strong>
                      </span>
                      <span>
                        <i className="far fa-money-bill-alt text-secondary me-2 display-31 display-sm-30" />
                        <strong>₹{e.price}</strong>
                      </span>
                    </div>
                    <button 
                     onClick={() => handleViewClick(e._id)}
                      className="butn w-100 radius-10"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

                )
              })}

             

            </div>
          </div>
        </div>
        {/* end candidate-grid right */}
      </div>
    </div>
  </section>
  {/* FOOTER
  ================================================== */}

  <FarmerFooter />
</div>

  )
}

export default FarmerCrop