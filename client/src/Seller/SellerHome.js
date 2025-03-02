import { useContext, useEffect, useState } from "react";
import AAContext from "../context/AAContext";
import SellerFooter from './SellerFooter'
import SellerNav from './SellerNav'
import { Link } from "react-router-dom";

function SellerHome() {
  const context = useContext(AAContext);
  const { getUserData, userData, getMyequipment, myequipment, getMyOrder, myorder } = context;
  const host = process.env.REACT_APP_HOST;
  const user_id = localStorage.getItem("user_id")

  useEffect(() => {
    getUserData();
    getMyequipment();
    getMyOrder();
    console.log(user_id)
  }, [])

  const getDate=(date)=>{
    const dateObj = new Date(date);

    // extract date portion
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // add 1 to account for zero-based indexing
    const day = dateObj.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
  

  return (
    <div className='main-wrapper'>
        <SellerNav />

        <div>
          <img src="img/bg/sellerhome.jpeg"  style={{width: "100%"}}  />
        </div>


        <section className="product-section"  style={{padding: "50px 0"}} >
  <div className="container-fluid-lg">
    <div className="row g-sm-4 g-3">
      <div className="col-xxl-3 col-xl-4 d-none d-xl-block">
        <div className="p-sticky"></div>
      </div>
      

      <section>
        <div className="container">
          <div className="section-heading4">
            <span>Product</span>
            <h2>Uploaded Product</h2>
          </div>
          <div className="recent-jobs owl-carousel owl-theme" style={{    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px"}}>

          {myequipment && myequipment.map((e)=>{
            return (
              <div key={e._id} className="card card-style10" style={{    width: "35%"}}>
              <div className="card-body">
                {/* <span class="popular-jobs-status">Full Time</span> */}
                <div className="popular-jobs-box crop_1" style={{maxWidth: "100%"}}>
                  <img
                    className="mb-4 border-radius-10 crop1_img "
                    src={e.equipment_photo ==null? "img/bg/fer1.jpg":e.equipment_photo}
                    alt="..."

                    style={{width: "100%"}}
                  />
                </div>
                <div>
                  <h4 className="h5">
                    <a href="SellerProductDetails">{e.equipment_name}</a>
                  </h4>
                </div>
                <span className="border-end border-color-extra-light-gray pe-2 me-2">
                  <i className="fas fa-map-marker-alt pe-2 text-secondary" />
                  {e.location}
                </span>
                <span className="border-end border-color-extra-light-gray pe-2 me-2">
                  <i class="far fa-money-bill-alt pe-2 text-secondary" aria-hidden="true"></i>
                  RS.{e.price}
                </span>
              </div>
              <Link to="/sellerproductdetails" className="butn butn-apply">
                View
              </Link>
            </div>
            )
          })}
            


          </div>
        </div>
      </section>

      <div className="section-heading4">
            <span>Reuest</span>
            <h2>Purchase Request</h2>
          </div>
    
      <section className="py-0">
        <div className="row g-0">
          <div className="col-lg-12">
            <div className="dashboard-right-sidebar">
              <div className="row mb-2-2">
                <div className="col-lg-12 mb-1-9"></div>
                <div className="col-lg-12">
                  <div className="dashboard-title">
                    <div className="d-md-flex justify-content-between align-items-center">
                      <div className="mb-4 mb-md-0">
                        <h4 className="mb-0 h5">
                          Recent{" "}
                          <span className="text-primary">Product Requests</span>
                        </h4>
                      </div>
                      <form
                        action="#!"
                        method="post"
                        encType="multipart/form-data"
                        onclick=""
                      >
                        <div className="quform-elements">
                          <div className="row align-items-center">
                            {/* Begin Select element */}
                            <div className="col-md-5 mb-4 mb-md-0">
                              <div className="quform-element">
                                <div className="quform-input">
                                  <select
                                    id="show"
                                    className="form-control form-select"
                                    name="show"
                                  >
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
                            {/* End Select element */}
                            {/* Begin Select element */}
                            <div className="col-md-7">
                              <div className="quform-element">
                                <div className="quform-input">
                                  <select
                                    id="sortby-month"
                                    className="form-control form-select"
                                    name="sortby-month"
                                  >
                                    <option value="">Last 7 days</option>
                                    <option value="Last 6 Months">
                                      Last 2 Months
                                    </option>
                                    <option value="Last 12 Months">
                                      Last 4 Months
                                    </option>
                                    <option value="Last 16 Months">
                                      Last 6 Months
                                    </option>
                                    <option value="Last 24 Months">
                                      Last 8 Months
                                    </option>
                                    <option value="Last 5 Year">
                                      Last 1 Year
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            {/* End Select element */}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="dashboard-widget">
                    <div className="table-responsive">
                      <table className="table custome-table">
                        <thead>
                          <tr>
                            <th>Location</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Email</th>
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>


                        {myorder && myorder.map((e) => {
                          return (
                            <tr key={e._id}>
                            <td>
                              <h6>Gujarat</h6>
                              <span className="text-muted display-30">
                                <i className="ti-location-pin" /> {e.address}
                              </span>
                            </td>
                            <td>{e.firstname}</td>
                            <td>{getDate(e.date)}</td>
                            <td>{e.email}</td>
                            {/* <td>
                              <ul className="action-list">
                                <li>
                                  <a href="#!">
                                    <span className="ti-eye" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#!">
                                    <span className="ti-pencil-alt" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#!">
                                    <span className="ti-trash" />
                                  </a>
                                </li>
                              </ul>
                            </td> */}
                          </tr>
                          )
                        })}
                         



                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</section>





        <SellerFooter/>
    </div>
  )
}

export default SellerHome