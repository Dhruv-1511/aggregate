import { useContext, useEffect, useState } from "react";
import AAContext from "../context/AAContext";
import { Link } from "react-router-dom";
import SellerFooter from "./SellerFooter";
import SellerNav from "./SellerNav";
import { useNavigate } from "react-router-dom";

const SellerProductDetails = () => {
  const product_id = localStorage.getItem("product_id");
  const navigate = useNavigate();
  const context = useContext(AAContext);
  const { getUserData, userData, getMyequipment, myequipment } = context;
  const host = process.env.REACT_APP_HOST;
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    getUserData();
    getMyequipment();
    console.log(user_id);
  }, []);

  const getDate=(date)=>{
    const dateObj = new Date(date);

    // extract date portion
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // add 1 to account for zero-based indexing
    const day = dateObj.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  return (
    <>
  {myequipment && myequipment.filter(item => item._id == product_id).map((e) => {
    return (
    <div key={e._id} className="main-wrapper">
      <SellerNav />
      <section>
        <div className="container">
          <div className="row mb-2-5 mb-lg-2-9">
            <div className="col-lg-12">
              <div className="p-1-6 p-md-1-9 border border-color-extra-light-gray border-radius-10">
                <div className="row align-items-center">
                  <div className="col-lg-9 mb-4 mb-lg-0">
                    <div className="d-lg-flex align-items-center text-center text-lg-start">
                      <div
                        className="flex-shrink-0 mb-4 mb-lg-0"
                        style={{ maxWidth: "100%" }}
                      >
                        <img
                           src={e.equipment_photo ==null? "img/bg/fer1.jpg":e.equipment_photo}
                          alt="..."
                          className="border-radius-10"
                          style={{ width: 250 }}
                        />
                      </div>
                      <div className="flex-grow-1 ms-lg-4">
                        {/* <div className="display-30 text-warning mb-3">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <span className="px-2 py-1 bg-primary text-white ms-2 display-31 border-radius-10">
                            5.0
                          </span>
                        </div> */}
                        <h4 className="mb-3">{e.equipment_name}</h4>
                        <span className="me-2">
                          <i className="ti-location-pin pe-2 text-secondary" />
                          Gujarat
                        </span>
                        <span className="me-2">
                          <i className="ti-briefcase pe-2 text-secondary" />
                          {e.location}
                        </span>
                        <span>
                          <i className="far fa-money-bill-alt pe-2 text-secondary" />
                          ₹{e.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-3">
                    <div className="row">
                      <div className="col-12">
                        <Link
                          to="/farmercheckout"
                          className="butn mb-3 w-100 text-center"
                        >
                          Edit Product
                        </Link>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-2-2 mb-lg-2-5 pb-2-2 pb-lg-2-5 border-bottom border-color-extra-light-gray">
            <div className="col-lg-12 mb-2-2 mb-lg-0">
              <div className="pe-lg-1-6 pe-xl-1-9">
                <div className="row">
                  <div className="col-lg-12 mb-2-2">
                    <div className="p-1-6 border border-color-extra-light-gray border-radius-10">
                      <h4 className="mb-3">More Details :</h4>
                      <div className="row mt-n3">
                        <div className="col-sm-6 col-md-4 mt-3">
                          <div className="border border-color-extra-light-gray py-3 px-4 border-radius-10">
                            <h5 className="display-29 display-xl-28">
                              Posted on
                            </h5>
                            <span className="font-weight-500 text-primary display-30">
                             {getDate(e.date)}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 mt-3">
                          <div className="border border-color-extra-light-gray py-3 px-4 border-radius-10">
                            <h5 className="display-29 display-xl-28">
                              Posted By
                            </h5>
                            <span className="font-weight-500 text-primary display-30">
                              {e.name}
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4 mt-3">
                          <div className="border border-color-extra-light-gray py-3 px-4 border-radius-10">
                            <h5 className="display-29 display-xl-28">
                              Contact No.
                            </h5>
                            <span className="font-weight-500 text-primary display-30">
                              +91 {e.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-2-2">
                    <div className="p-1-6 border border-color-extra-light-gray border-radius-10">
                      <h4 className="mb-3">Crop Description :</h4>
                      <p>
                        {e.equipment_description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
      <div className="col-lg-12">
        <h4 className="mb-4">Other Crops :</h4>
        <div className="recent-jobs owl-carousel owl-theme">
          <div className="card card-style10">
            <div className="card-body">
              <div className="popular-jobs-box">
                <img
                  className="mb-4 border-radius-10"
                  src="img/bg/onion.jpg"
                  alt="..."
                />
                <h4 className="h5">
                  <a href="job-details.html">Tomato</a>
                </h4>
              </div>
              <div className="d-flex justify-content-between mb-3 mt-3">
                <span>
                  <i className="ti-location-pin text-secondary me-2 display-31 display-sm-30" />
                  <strong>Gujarat</strong>
                </span>
                <span>
                  <i className="ti-briefcase text-secondary me-2 display-31 display-sm-30" />
                  <strong>Amreli</strong>
                </span>
                <span>
                  <i className="far fa-money-bill-alt text-secondary me-2 display-31 display-sm-30" />
                  <strong>₹600-₹2000</strong>
                </span>
              </div>
            </div>
            <a href="job-details.html" className="butn butn-apply">
              View Details
            </a>
          </div>
          <div className="card card-style10">
            <div className="card-body">
              <div className="popular-jobs-box">
                <img
                  className="mb-4 border-radius-10"
                  src="img/bg/onion.jpg"
                  alt="..."
                />
                <h4 className="h5">
                  <a href="job-details.html">Tomato</a>
                </h4>
              </div>
              <div className="d-flex justify-content-between mb-3 mt-3">
                <span>
                  <i className="ti-location-pin text-secondary me-2 display-31 display-sm-30" />
                  <strong>Gujarat</strong>
                </span>
                <span>
                  <i className="ti-briefcase text-secondary me-2 display-31 display-sm-30" />
                  <strong>Amreli</strong>
                </span>
                <span>
                  <i className="far fa-money-bill-alt text-secondary me-2 display-31 display-sm-30" />
                  <strong>₹600-₹2000</strong>
                </span>
              </div>
            </div>
            <a href="job-details.html" className="butn butn-apply">
              View Details
            </a>
          </div>
          <div className="card card-style10">
            <div className="card-body">
              <div className="popular-jobs-box">
                <img
                  className="mb-4 border-radius-10"
                  src="img/bg/onion.jpg"
                  alt="..."
                />
                <h4 className="h5">
                  <a href="job-details.html">Tomato</a>
                </h4>
              </div>
              <div className="d-flex justify-content-between mb-3 mt-3">
                <span>
                  <i className="ti-location-pin text-secondary me-2 display-31 display-sm-30" />
                  <strong>Gujarat</strong>
                </span>
                <span>
                  <i className="ti-briefcase text-secondary me-2 display-31 display-sm-30" />
                  <strong>Amreli</strong>
                </span>
                <span>
                  <i className="far fa-money-bill-alt text-secondary me-2 display-31 display-sm-30" />
                  <strong>₹600-₹2000</strong>
                </span>
              </div>
            </div>
            <a href="job-details.html" className="butn butn-apply">
              View Details
            </a>
          </div>
          <div className="card card-style10">
            <div className="card-body">
              <div className="popular-jobs-box">
                <img
                  className="mb-4 border-radius-10"
                  src="img/bg/onion.jpg"
                  alt="..."
                />
                <h4 className="h5">
                  <a href="job-details.html">Tomato</a>
                </h4>
              </div>
              <div className="d-flex justify-content-between mb-3 mt-3">
                <span>
                  <i className="ti-location-pin text-secondary me-2 display-31 display-sm-30" />
                  <strong>Gujarat</strong>
                </span>
                <span>
                  <i className="ti-briefcase text-secondary me-2 display-31 display-sm-30" />
                  <strong>Amreli</strong>
                </span>
                <span>
                  <i className="far fa-money-bill-alt text-secondary me-2 display-31 display-sm-30" />
                  <strong>₹600-₹2000</strong>
                </span>
              </div>
            </div>
            <a href="job-details.html" className="butn butn-apply">
              View Details
            </a>
          </div>
        </div>
      </div>
    </div> */}
        </div>
      </section>

      <SellerFooter />
    </div>
    )
  })}
    </>
  );
};

export default SellerProductDetails;
