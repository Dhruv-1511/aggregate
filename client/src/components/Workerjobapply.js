import React,{useState, useEffect, useContext} from 'react'
import WorkerNav from './WorkerNav';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AAContext from '../context/AAContext';

const WorkerAbout = (props) => {
  const job_id = localStorage.getItem("jobdetail");
  const host = "http://localhost:5000";
  const context = useContext(AAContext);
  const {getUserData , userData, getFRequestStatus, frequestStatus} = context;

  
  const [jobs, setJobs] = useState([]);
  const getJobDetail = async()=>{
    const response = await fetch(`${host}/job/getjobbyid`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({jobid: job_id})
    });
    const json = await response.json();
    if(json.success == true){
      setJobs(json.jobs);
      console.log(json.jobs) 
      getFarmer(json.jobs)
    }
  }
  
  
  useEffect(() => {
    getUserData()
    getJobDetail();
    console.log()
  }, [])
  
  
  const [farmer, setFarmer] = useState({});
 
  const getFarmer = async(arr)=>{
    const email = arr[0].email; 
    const response = await fetch(`${host}/job/getfarmer`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({email: email})
    });
    const json = await response.json();
    if(json.success == true){
      console.log(json) 
      getFRequestStatus(json.farmer[0]._id);
      setFarmer(json.farmer);
    }
  }

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  
  const handleApplyNow =async (id) =>{
    // id is job id 
    const user_id = localStorage.getItem("user_id");
    const response = await fetch(`${host}/request/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({fullname: userData.name,picture: userData.profile_picture, occupation: userData.occupation, status: "pending", receivingid: farmer[0]._id, sendingid: user_id})
    }) 
    const json = await response.json();
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
    toast.success('Proposal sent!', {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
      getFRequestStatus(farmer[0]._id);
    console.log(json.request);

  }
  
  return (
    <>
    <WorkerNav />
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

{/* CANDIDATE DETAILS
================================================== */}
<section>
{jobs && jobs.map((e) => {
  return (
    <div className="container" key={e._id} id="actionblock">
<div className="row mb-2-5 mb-lg-2-9">
<div className="col-lg-12">
  <div className="p-1-6 p-lg-1-9 border border-color-extra-light-gray border-radius-10">
    <div className="row align-items-center">
      <div className="col-lg-9 mb-4 mb-lg-0">
        <div className="text-center text-lg-start d-lg-flex align-items-center">
          <div className="flex-shrink-0 mb-4 mb-lg-0">
          
            <img
              src= "img/avatar/user.png"
              style={{ width: 96, height: 96 }}
              className="border-radius-50"
              alt="..."
            />
            
          </div>
          
          <div className="flex-grow-1 ms-lg-4">
              <span><b>{capitalizeFirstLetter(e.name)}</b></span>
            <h4 className="mb-3"></h4>
            <span className="me-2">
              <i className="ti-briefcase pe-2 text-secondary" />
            {e.description}
            </span>
            <span className="me-2">
              <i className="ti-time pe-2 text-secondary" />
              {e.pay_mode}ly
            </span>
            <span>
              <i className="far fa-money-bill-alt pe-2 text-secondary" />
              ₹{e.hour_price} /Hour
            </span>
          </div>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="row">
          <div className="col-12">
            {/* <a href="#!" className="butn mb-3 w-100 text-center">Apply For Job</a> */}
            <div
              className="modal fade"
              id="exampleModalToggle"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel"
              tabIndex={-1}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                id="modal"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5"
                      id="exampleModalToggleLabel"
                    >
                      Edit profile
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <form>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name='name'
                        id="name"
                        className="form-control"
                        aria-describedby="emailHelp"
                        
                        
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Profile Picture
                      </label>
                      <input
                        className="form-control"
                      
                        type="file"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                      
                    
                        name="address"
                        className="form-control"
                        defaultValue="address"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Gender
                      </label>
                      <div className="options d-flex">
                      <select className="form-select" name="gender"aria-label="Default select example">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        
                        className="form-control"
                        defaultValue="age"
                   
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Work Hours
                      </label>
                      <input
                        type="number"
                        id="workhour"
                        className="form-control"
                        defaultValue={10}
                    
                       
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Occupation
                      </label>
                      <div className="options d-flex">
                      <select className="form-select" name='occupation' aria-label="Default select example">
                        <option value="farmer">Farmer</option>
                        <option value="worker">Worker</option>
                        <option value="seller">Seller</option>
                        <option value="yard">Yard</option>
                      </select>
                      </div>
                    </div>
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
                    {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                    <button
                      id="follow"
                      className="butn mb-3 w-100 text-center follow"
                     
                    >
                      Submit
                    </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="exampleModalToggle2"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel2"
              tabIndex={-1}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5"
                      id="exampleModalToggleLabel2"
                    >
                      Modal 2
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    Hide this modal and show the first with the button
                    below.
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-primary"
                      data-bs-target="#exampleModalToggle"
                      data-bs-toggle="modal"
                    >
                      Back to first
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <button
              className="butn mb-3 w-100 text-center"
              role="button"       
              onClick={() => handleApplyNow(e._id)}
            >
              Apply Now
            </button> */}

            <button
              style= {{    padding: '8px 40px 8px 40px'
              ,background: 'green'
              ,color: 'white'
              ,border: '0'
              ,borderRadius: '6px'}}
              disabled={ frequestStatus == null  ? false : true}
              onClick={() => handleApplyNow(e._id)}
            >
              {frequestStatus == null ? "Apply Now" : "Sent"}
            </button>

          </div>
      
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
              <span>Email</span> {e.email}
            </li>
            <li>
              <span>Address</span> Mota Varachha, Surat
            </li>
          </ul>
        </div>
      </div>
    </div>


  </div>
</div>
</div>

</div>
  )
})}



</section>
<Footer />
</div>
</>

  )
}

export default WorkerAbout