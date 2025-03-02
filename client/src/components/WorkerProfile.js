import { useContext,useEffect, useState,useRef } from 'react'
import AAContext from '../context/AAContext'
import { useNavigate } from 'react-router-dom'
import {storage, db} from '../utils/firebase';
import { getDownloadURL, ref as Tref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, getDoc, serverTimestamp, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import WorkerNav from './WorkerNav';
import Footer from './Footer';


const intialState = {
  name: "",
  gender: "",
  address: "",
  age: 0,
  work_hour: 0,
  occupation: "",
  about: ""
}

const WorkerProfile = (props) => {
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
  }, [])
  const [file, setFile] = useState(null)
    const navigate = useNavigate();
    const context = useContext(AAContext)
    const { getUserData, userData, updateUser } = context;
    const ref = useRef(null);
    const [progress, setProgress] = useState(null)
    
    const id = localStorage.getItem("user_id");
  
   

    const [data, setData] = useState(intialState)
    const {name, work_hour, age, address, occupation, gender, profile_picture, about} = data;


    const handleEdit = ()=>{
      getUserData();
      setData({
        name: userData.name,
        gender: userData.gender,
        address: userData.address,
        age: userData.age,
        work_hour: userData.work_hour,
        occupation: userData.occupation,
        about: userData.about
      })
    }

    const handleChange = (e) => {
      setData({...data, [e.target.name]: e.target.value})
    };

   

    useEffect(() => {
      getAllRequest();
      const uploadFile = ()=>{
        const name = new Date().getTime() + file.name;
        const storageRef = Tref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on("state_changed", (snapshot) =>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            switch (snapshot.state) {
                case "paused": 
                    console.log("upload is paused");
                    break;
                    
                case "running": 
                    console.log("upload is running");
                    break;
  
                default: 
                    break;
            }
        }, (error) =>{
            console.log(error)
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>{
                setData((prev) => ({...prev, profile_picture: downloadUrl}))
                console.log(data);
            })
        }
        )
      };
  
      file && uploadFile();
    }, [file])

    const handleSubmit = (e)=>{
      console.log(work_hour,gender)
      e.preventDefault();
      // console.log(name,address,occupation,gender,work_hour,age)
      // console.log(about)
      updateUser({name,address,occupation,gender,work_hour,age, profile_picture,about})
      ref.current.click();
    }
    const host = process.env.REACT_APP_HOST;
    const [request, setRequest] = useState([])
    
    const getAllRequest = async()=>{
      console.log(id)
      const response = await fetch(`${host}/request/getmyreq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({receivingid: id, status: "pending"})
      });

      const json = await response.json();
      setRequest(json.request)
    }
    
   
    const handleAcceptBtn = async(senderid) =>{

      const response = await fetch(`${host}/request/updatestatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({sendingid: senderid, receivingid: id, status: "accept"})
      })
      const json = await response.json();
      getAllRequest();
      console.log(json);
    } 
    
    const handleRejectBtn = async(senderid) =>{

      const response = await fetch(`${host}/request/updatestatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({sendingid: senderid, receivingid: id, status: "reject"})
      })
      const json = await response.json();
      getAllRequest();
      console.log(json);
    } 
    

  return (
    <>
    <WorkerNav />
    <div className="main-wrapper">

        {/* CANDIDATE DETAILS
  ================================================== */}
  <section>
    <div className="container" id="actionblock">
      <div className="row mb-2-5 mb-lg-2-9">
        <div className="col-lg-12">
          <div className="p-1-6 p-lg-1-9 border border-color-extra-light-gray border-radius-10">
            <div className="row align-items-center">
              <div className="col-lg-9 mb-4 mb-lg-0">
                <div className="text-center text-lg-start d-lg-flex align-items-center">
                  <div className="flex-shrink-0 mb-4 mb-lg-0">
                    <img
                      // src="img/avatar/user.png"
                      src={userData.profile_picture ? userData.profile_picture : "img/avatar/user.png"}
                      style={{ width: 96, height: 96 }}
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
                    <h4 className="mb-3">{userData.name}</h4>
                    <span className="me-2">
                      <i className="ti-briefcase pe-2 text-secondary" />
                      {userData.occupation ===''?"Worker":userData.occupation}
                    </span>
                    <span className="me-2">
                      <i className="ti-location-pin pe-2 text-secondary" />
                      {userData.address === '' ? 'Not set':userData.address}
                    </span>
                    <span className="me-2">
                      <i className="ti-time pe-2 text-secondary" />
                      {userData.work_hour == null ? 'Not set':userData.work_hour}
                    </span>
                    <span>
                      <i className="far fa-money-bill-alt pe-2 text-secondary" />
                      10000
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
                            <form onSubmit={handleSubmit}>
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
                                value={name}
                                onChange={handleChange}
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
                                onChange={(e) => setFile(e.target.files[0])}
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
                                onChange={handleChange}
                                value={address}
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
                              <select className="form-select" name="gender" onChange={handleChange} aria-label="Default select example">
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
                                onChange={handleChange}
                                className="form-control"
                                defaultValue="age"
                                value={age}
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputPassword1"
                                className="form-label"
                              >
                                Description
                              </label>
                              <input
                                type="text"
                                id="about"
                                name="about"
                                onChange={handleChange}
                                className="form-control"
                                defaultValue="about"
                                value={about}
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
                                name="work_hour"
                                className="form-control"
                                defaultValue={10}
                                value={work_hour}
                                onChange={handleChange}
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
                              <select className="form-select" name='occupation' onChange={handleChange} aria-label="Default select example">
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
                              disable={progress !== null && progress < 100}
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
                    <a
                      className="butn mb-3 w-100 text-center"
                      data-bs-toggle="modal"
                      href="#exampleModalToggle"
                      role="button"
                      onClick={handleEdit}
                      ref={ref}
                    >
                      Edit profile
                    </a>
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
        <div className="col-lg-8 mb-1-9 mb-lg-0">
          <div className="pe-lg-1-6 pe-xl-1-9">
            <div className="row">
              <div className="col-lg-12 mb-1-9 mb-lg-2-5">
                <div className="dashboard-title">
                  <h5 className="mb-0">Recent Request</h5>
                </div>
                <div className="dashboard-widget">
                  <div
                    className="row mt-n1-9"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div className="col-xxl-6 mt-1-9" style={{ width: "100%" }}>
                      {/* do the loop here  */}   
                    {request.length == 0 && "Nothing to see here.." }
                      {request.map((e) => {
                        return (
                      <div className="card-style2" style={{ marginTop: '1rem'}}>
                        <div className="card-body">
                          <div className="d-sm-flex justify-content-between align-items-center">
                            <div className="d-sm-flex text-center text-sm-start mb-4 mb-sm-0">
                              <div
                                className="flex-shrink-0 mb-3 mb-sm-0"
                                style={{ marginTop: "1rem" }}
                              >
                                <img
                                  src={ e.picture == null ? "img/avatar/user.png": e.picture}
                                  style={{ height: "4rem", width: "4rem" }}
                                  alt="User Default Image"
                                  className="border-radius-50"
                                />
                              </div>
                              <div className="flex-grow-1 ms-sm-3  mt-4">
                                <h5>
                                  <a href="employer-details.html">{e.fullname}</a>
                                </h5>
                                <div className="mb-3">
                                  <span className="text-secondary me-2 display-30">
                                    {e.occupation}
                                  </span>
                                  <span className="vertical-align-middle display-30">
                                    <i className="ti-location-pin pe-2 text-secondary" />
                                    {e.address}
                                  </span>
                                </div>
                                {/* <div>
                                    <span className="company-info">App</span>
                                    <span className="company-info">Development</span>
                                </div> */}
                              </div>
                            </div>
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
                                  onClick={() => handleAcceptBtn(e.sendingid)}
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
                                  onClick={() => handleRejectBtn(e.sendingid)}
                                >
                                  <span className="ti-close" />
                                </button>

                              </li>
                              {/* <li><button ><span className="ti-check"></span></button></li> */}
                              {/* <li><button ><span className="ti-close"></span></button></li> */}
                              {/* <li><a href="#!"><span className="ti-trash"></span></a></li> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                        )
                    })}

                      {/* end the loop here  */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-1-9 mb-lg-2-5">
                <div className="p-1-6 border border-color-extra-light-gray border-radius-10">
                  <h4 className="mb-3">Candidates About :</h4>
                  <p>
                    {userData.about}
                    

                  </p>
                </div>
              </div>
             
              
         
            </div>
          </div>
        </div>
        <div className="col-lg-4">
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
                      <span>Phone</span> 787 446 7710
                    </li>
                    <li>
                      <span>Email</span> meet@gmail.com
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
  </section>
  <Footer />
  </div>
    </>
  )
}

export default WorkerProfile