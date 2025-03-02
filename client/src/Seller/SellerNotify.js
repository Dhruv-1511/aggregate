import React, { useEffect, useState, useContext } from 'react'
import SellerFooter from './SellerFooter'
import SellerNav from './SellerNav'
import AAContext from '../context/AAContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellerNotify = () => {
  const host = process.env.REACT_APP_HOST;
  const context = useContext(AAContext);
  const { getUserData, userData, getAllFarmerRequest, allFarmerRequest, getMyOrder, myorder } = context;
  const user_id = localStorage.getItem("user_id");
  useEffect(() => {
    getUserData()
    getAllFarmerRequest(user_id);
    getMyOrder();
  }, [])

  const getDate = (date) => {
    const dateObj = new Date(date);

    // extract date portion
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // add 1 to account for zero-based indexing
    const day = dateObj.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  const [myorder1, setmyorder1] = useState(myorder)
  const [workerD, setWorkerD] = useState([])
  const handleOnClick = async (id) => {
    const response = await fetch(`${host}/farmerapi/getfarmerdetail/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-Token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json)
    console.log(json);
    setWorkerD(json.farmer);
    getAllFarmerRequest(user_id);
  }

  const handleAcceptBtn = async (senderid) => {
    const response = await fetch(`${host}/farmerapi/${senderid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      // body: JSON.stringify({sendingid: senderid, receivingid: user_id, status: "reject"})
    })
    const json = await response.json();
    getAllFarmerRequest(user_id);
    if (json.success == false) {
      toast.error('Faild to send', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    toast.success('Request Accepted!', {
      position: "top-right",
      zIndex: 9999,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }


  const handleRejectBtn = async (senderid) => {
    const response = await fetch(`${host}/farmerapi/${senderid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      // body: JSON.stringify({sendingid: senderid, receivingid: user_id, status: "reject"})
    })
    const json = await response.json();
    getAllFarmerRequest(user_id);
    if (json.success == false) {
      toast.error('Faild to send', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    toast.success('Deleted successfully!', {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <>
      <div className="main-wrapper">
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
          theme="dark"
        />
        {/* Same as */}
        <ToastContainer />
        <SellerNav />
        <section className="py-0">
          <div className="row g-0">
            <div className="col-lg-12">
              <div className="dashboard-right-sidebar">
                <div className="row mb-2-2">
                  <div className="col-lg-12 mb-1-9">
                    <h3 className="mb-3">Purchase Request</h3>
                  </div>
                  <div className="col-lg-12">
                    <div className="dashboard-title">
                      <div className="d-md-flex justify-content-between align-items-center">
                        <div className="mb-4 mb-md-0">
                          <h4 className="mb-0 h5">
                            Recently <span className="text-primary">Purchase Requests</span>
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
                              <div className="col-md-12 mb-4 mb-md-0">
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
                              <th>Name</th>
                              <th>Date</th>
                              <th>Email</th>
                              <th>Delivery Type</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* do the loop here  */}
                            {myorder && myorder.map((e) => {
                              return (
                                <tr key={e._id}>

                                  <td>{e.firstname}</td>
                                  <td> {getDate(e.date)}</td>
                                  <td>
                                    <span className="text-muted display-30">
                                      {/* <i className="ti-briefcase" />  {e.occupation} */}
                                      {e.email}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="text display-30 text-clr" >
                                      {e.dilivery}
                                    </span>
                                  </td>

                                  <td>
                                    <span>{e.address}, Gujarat</span>
                                  </td>

                                  <td>
                                    <ul className="action-list">
                                      <li>
                                        <a href="#!" type="button"
                                          data-bs-toggle="modal"
                                          data-bs-target="#centered"
                                          onClick={() => handleOnClick(e.farmerid)}
                                        >
                                          <span className="ti-eye" />
                                        </a>

                                        {/* Vertically centered */}
                                        <div
                                          className="modal fade"
                                          id="centered"
                                          tabIndex={-1}
                                          aria-labelledby="centeredLabel"
                                          aria-hidden="true"
                                        >
                                          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                            <div className="modal-content">
                                              <div className="modal-header">
                                                <h5 className="modal-title" id="centeredLabel">
                                                  Farmer Detail
                                                </h5>
                                                <button
                                                  type="button"
                                                  className="btn-close"
                                                  data-bs-dismiss="modal"
                                                  aria-label="Close"
                                                />
                                              </div>
                                              {workerD.length == 0 ? "not found" :
                                                <div className="modal-body">
                                                  <span>
                                                    Name : {workerD[0].name}
                                                  </span>
                                                  <br />
                                                  <span>
                                                    About : {workerD[0].email}
                                                  </span>
                                                  <br />
                                                  <span>
                                                    Address : {workerD[0].phone}
                                                  </span>
                                                  <br />
                                                  <span>
                                                    occupation : {workerD[0].occupation}
                                                  </span>
                                                  <br />
                                                  
                                                  <br />
                                                </div>
                                              }
                                              <div className="modal-footer">
                                                <button
                                                  type="button"
                                                  className="btn btn-secondary"
                                                  data-bs-dismiss="modal"
                                                >
                                                  Close
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                      </li>
                                      <li>
                                        <a href="#!" onClick={() => handleAcceptBtn(e._id)}>
                                          <span className="ti-check" />
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#!" onClick={() => handleRejectBtn(e._id)}>
                                          <span className="ti-close" />
                                        </a>
                                      </li>
                                    </ul>
                                  </td>
                                </tr>
                              )
                            })}


                            {/* End the loop here  */}
                            {/* <tr>
                      <td>
                        <h6>Gujarat</h6>
                        <span className="text-muted display-30">
                          <i className="ti-location-pin" /> Amreli
                        </span>
                      </td>
                      <td>Hareshbhai Desai</td>
                      <td>22/01/2023</td>
                      <td>2 Years</td>
                      <td>
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
                      </td>
                    </tr> */}
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

        <SellerFooter />
      </div>
    </>
  )
}

export default SellerNotify