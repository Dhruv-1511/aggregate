import FarmerFooter from './FarmerFooter'
import FarmerNav from './FarmerNav'
import React,{useState,useEffect, useContext} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AAContext from '../context/AAContext';

const FworkerDetail = () => {

    const host = "http://localhost:5000";
    const id = localStorage.getItem("w_id");
    const user_id = localStorage.getItem("user_id");
    
    console.log(id)
    const context = useContext(AAContext);
    const {getUserData , userData, getRequestStatus, requestStatus} = context;

    useEffect(() => {
      getUserData()
      getRequestStatus();
      
    }, [])
    
    
    const [worker, setWorker] = useState({})
    const getWorkerDetail = async()=>{  
      const response = await fetch(`${host}/workerapi/getworkerdetail/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        }
      })
      const json = await response.json();
      setWorker(json.worker[0]); 
   }


   const handleAcceptBtn = async() =>{
    const response = await fetch(`${host}/request/updatestatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({sendingid: id, receivingid: user_id, status: "accept"})
    })
    const json = await response.json();
    console.log(json);
    if(json.success == false){
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


  const handleRejectBtn = async() =>{
    const response = await fetch(`${host}/request/updatestatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({sendingid: id, receivingid: user_id, status: "reject"})
    })
    const json = await response.json();
    console.log(json);
    if(json.success == false){
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
    toast.success('Request rejected!', {
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
  
    useEffect(() => {
      getWorkerDetail();
      console.log(requestStatus);
    }, [])

    // const [isDisabled, setisDisabled] = useState(false);
    

  return (
    <div className='main-wrapper'>
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
        <FarmerNav /> 
        <>
  <section className="page-title-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 text-center">
          <h1 className="h2 mb-4">Candidate Details</h1>
        </div>
      </div>
    </div>
  </section>

        <section>
    <div className="container">
      <div className="row mb-2-5 mb-lg-2-9">
        <div className="col-lg-12">
          <div className="p-1-6 p-lg-1-9 border border-color-extra-light-gray border-radius-10">
            <div className="row align-items-center">
              <div className="col-lg-9 mb-4 mb-lg-0">
                <div className="text-center text-lg-start d-lg-flex align-items-center">
                  <div className="flex-shrink-0 mb-4 mb-lg-0">
                    <img
                      src={worker.profile_picture == null ?"img/avatar/user.png" : worker.profile_picture}
                      style={{ width: "96", height: "96" }}
                      className="border-radius-50"
                      alt="..."
                      />
                  </div>
                  <div className="flex-grow-1 ms-lg-4">
                    <div className="display-30 text-warning mb-3">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <span className="px-2 py-1 bg-primary text-white ms-2 display-31 border-radius-10">
                        5.0
                      </span>
                    </div>
                    <h4 className="mb-3">{worker.name} </h4>
                    <span className="me-2">
                      <i className="ti-briefcase pe-2 text-secondary" />
                      {worker.occupation}
                    </span>
                    <span className="me-2">
                      <i className="ti-tablet pe-2 text-secondary" />
                      {worker.phone}
                    </span>
                    <span className="me-2">
                      <i className="ti-email pe-2 text-secondary" />
                      {worker.email}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="row">
                  <div className="col-12" id="actionBlock">
                    <div
                      id="loader"
                      style={{ display: "none", textAlign: "center" }}
                    >
                      <img
                        src="img/gif/load.gif"
                        alt=""
                        style={{ height: "3rem", width: "3rem" }}
                      />
                    </div>


                    
                    {/* <button
                      style= {{    padding: '8px 40px 8px 40px'
                      ,background: 'green'
                      ,color: 'white'
                      ,border: '0'
                      ,borderRadius: '6px'}}
                      disabled={ requestStatus == null  ? false : true}
                      onClick={handleFollowClick}
                    >
                      {requestStatus == null ? "Follow" : requestStatus.status}
                    </button> */}

                    <ul className="list-style pl-0">
                              {/* <li><a href="#!"><span className="ti-eye"></span></a></li> */}
                              <li>
                                <input
                                  type="hidden"
                                  id="acc_inp"
                                  defaultValue="id"
                                />
                                <input
                                  type="hidden"
                                  id="rej_inp"
                                  defaultValue="id"
                                />
                                <div
                                  id="acc_loader"
                                  style={{
                                    display: "none",
                                    textAlign: "center"
                                  }}
                                >
                                  <img
                                    src="img/gif/load.gif"
                                    alt=""
                                    style={{ height: "3rem", width: "3rem" }}
                                  />
                                </div>
                                {/* accept btn  */}
                                <button
                                  className="butn acceptbtn"
                                  id="acceptbtn"
                                  onClick={handleAcceptBtn}
                                >
                                  <span className="ti-check" />
                                </button>
                              </li>
                              <li>
                                <input
                                  type="hidden"
                                  id="acc_inp"
                                  defaultValue="acc_id"
                                />
                                <input
                                  type="hidden"
                                  id="rej_inp"
                                  defaultValue="rej_id"
                                />
                                <div
                                  id="rej_loader"
                                  style={{
                                    display: "none",
                                    textAlign: "center"
                                  }}
                                >
                                  <img
                                    src="img/gif/load.gif"
                                    alt=""
                                    style={{ height: "3rem", width: "3rem" }}
                                  />
                                </div>
                                {/* reject button  */}
                                <button
                                  className="butn rejectbtn"
                                  id="rejectbtn"
                                  onClick={handleRejectBtn}
                                >
                                  <span className="ti-close" />
                                </button>

                              </li>
                            </ul>


                  </div>
                  {/* <div class="col-12">
                                      <a href="#!" class="butn w-100 text-center">Download CV</a>
                                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row mb-2-5 mb-lg-2-9 pb-2-5 pb-lg-2-9 border-bottom border-color-extra-light-gray"
        id="recent_req"
      >
        <div className="col-lg-12 mb-1-9 mb-lg-0">
          <div className="pe-lg-1-6 pe-xl-1-9" style={{paddingRight: '0rem'}}>
            <div className="row">
              <div className="col-lg-12 mb-1-9 mb-lg-2-5">
                <div className="p-1-6 border border-color-extra-light-gray border-radius-10">
                  <h4 className="mb-3">Candidates About :</h4>
                  <p>
                    We're seeking out a person with the innovative spark, eye
                    for example and layout, ardour for images and cappotential
                    to supply excessive first-rate layout collaterals
                    end-to-end. Draft mockups of internet site designs,
                    
                    

                  </p>
                </div>
              </div>
             
              
         
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="job-details-sidebar">
            <div className="widget">
              <div className="card border-color-extra-light-gray border-radius-10">
                <div className="card-body p-4">
                  <h4>Location</h4>
                  <iframe
                    className="map-h250"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=london&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  />
                </div>
              </div>
            </div>
            <div className="widget">
              <div className="card border-color-extra-light-gray border-radius-10">
                <div className="card-body p-4">
                  <h4>Contact Information</h4>
                  <ul className="list-style5">
                    <li>
                      <span>Phone</span> {worker.phone}
                    </li>
                    <li>
                      <span>Email</span> {worker.email}
                    </li>
                    <li>
                      <span>Address</span> {worker.address}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
      
       
          </div>
        </div>
      </div>
    </div>
  </section>
   

 

</>

        <FarmerFooter />
    </div>
  )
}

export default FworkerDetail