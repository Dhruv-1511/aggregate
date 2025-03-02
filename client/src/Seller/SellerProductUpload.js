import { useContext, useEffect, useState } from "react";
import AAContext from "../context/AAContext";
import SellerFooter from "./SellerFooter";
import SellerNav from "./SellerNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {storage, db} from '../utils/firebase';
import { getDownloadURL, ref as Tref, uploadBytesResumable } from 'firebase/storage';

const SellerProductUpload = () => {
  const context = useContext(AAContext);
  const { getUserData, userData } = context;
  const host = process.env.REACT_APP_HOST;
  const [file, setFile] = useState(null)

  const [progress, setProgress] = useState(null)

  useEffect(() => {
    getUserData();
  }, []);

  const [data, setData] = useState({
    name: userData.name,
    equipment_name: "",
    sellerid: userData._id,
    location: userData.address,
    phone: userData.phone,
    equipment_description: "",
    equipment_photo: "",
    price: 0,
    quantity: 0
  });

  const {
    name,
    equipment_name,
    sellerid,
    location,
    phone,
    equipment_description,
    equipment_photo,
    price,
    quantity
  } = data;

  
  const handleChange = (e) =>{
    setData({ ...data, [e.target.name]: e.target.value });
  }

  useEffect(() => {
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
              setData((prev) => ({...prev, equipment_photo: downloadUrl}))
              console.log(data);
          })
      }
      )
    };

    file && uploadFile();
  }, [file])

  const handleSubmit = async (e) => {
    e.preventDefault();
    data.name = userData.name;
    data.price = parseInt(data.price)
    console.log(data);
    const response = await fetch(`${host}/sellerapi/addequipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.success == true) {
      toast.success("Job posted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      window.location.href = "/sellerhome";
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="main-wrapper">
        <SellerNav />
        <section className="bg-very-light-gray">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12 mb-2-2 mb-lg-0">
                <div
                  className="p-1-6 p-sm-1-9 p-lg-2-2 border border-radius-10 border-color-extra-light-gray bg-white h-100"
                  id="actionBlock"
                >
                  <h2 className="h3 mb-2-5 text-center text-capitalize">
                    Upload Product Details
                  </h2>
                  <form
                    className="contact quform"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                  >
                    <div className="quform-elements">
                      <div className="row">
                        {/* Begin Text input element */}
                        <div className="col-md-6">
                          <div className="quform-element form-group">
                            <label htmlFor="name">
                              Name <span className="quform-required">*</span>
                            </label>
                            <div className="quform-input">
                              <input
                                className="form-control border-radius-10"
                                id="name"
                                type="text"
                                value={userData.name}
                                name="name"
                                placeholder="Your name here"
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                        {/* End Text input element */}
                        {/* Begin Text input element */}
                        <div className="col-md-6">
                          <div className="quform-element form-group">
                            <label htmlFor="email">
                              Equipment name{" "}
                              <span className="quform-required">*</span>
                            </label>
                            <div className="quform-input">
                              <input
                                className="form-control border-radius-10"
                                id="email"
                                type="text"
                                value={equipment_name}
                                onChange={handleChange}
                                name="equipment_name"
                                placeholder="Your Contact No. here"
                                // readOnly
                              />
                              {/* <input type="hidden" name="sellerid" value={sellerid} /> */}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="quform-element form-group">
                            <label htmlFor="email">
                              District{" "}
                              <span className="quform-required">*</span>
                            </label>
                            <select
                              name="location"
                              id="job-search"
                              className="form-control"
                              //   value={selectedRegion}
                                onChange={handleChange}
                            >
                              <option value="">--Select District--</option>
                              <option value="Amreli">Amreli</option>
                              <option value="Junagadh">Junagadh</option>

                              {/* <option value="maharashtra">Maharashtra</option> */}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="quform-element form-group quform-select-replaced">
                            <label htmlFor="subject">
                              Product Image
                              <span className="quform-required">*</span>
                            </label>
                            <div className="quform-input">
                              <input
                                className="form-control border-radius-10"
                                name="equipment_photo"
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file"
                              />
                            </div>
                          </div>
                        </div>

                        {/* End Text input element */}
                        {/* Begin Text input element */}
                        <div className="col-md-12">
                          <div className="quform-element form-group quform-select-replaced">
                            <label htmlFor="subject">
                              contact number
                              <span className="quform-required">*</span>
                            </label>
                            <div className="quform-input">
                              <input
                                className="form-control border-radius-10"
                                id="subject"
                                type="number"
                                name="phone"
                                placeholder="Enter your contact number"
                                value={phone}
                                maxLength={10}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        {/* Begin Textarea element */}
                        <div className="col-md-12">
                          <div className="quform-element form-group">
                            <label htmlFor="message">
                              Description
                              <span className="quform-required">*</span>
                            </label>
                            <div className="quform-input">
                              <textarea
                                className="form-control border-radius-10"
                                id="description"
                                name="equipment_description"
                                rows={3}
                                placeholder="Tell us a few words"
                                required=""
                                value={equipment_description}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="quform-element form-group quform-select-replaced">
                            <label htmlFor="subject">
                              Product Price
                              <span className="quform-required">*</span>
                            </label>
                            <div className="quform-input">
                              <input
                                className="form-control border-radius-10"
                                id="price"
                                type="number"
                                name="price"
                                placeholder="Enter Your Product Price"
                                value={price}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                        </div>  
                        {/* End Captcha element */}
                        {/* Begin Submit button */}
                        <div className="col-md-12">
                          <div className="quform-submit-inner">
                            <div id="btn_loader" style={{ display: "none" }}>
                              <img
                                src="img/gif/load.gif"
                                alt=""
                                style={{ height: "3rem", width: "3rem" }}
                              />
                            </div>
                            <button
                              className="butn border-0 post_project"
                              type="submit"
                              id="post_project"
                            >
                              <span>Submit</span>
                            </button>
                          </div>
                        </div>
                        {/* End Submit button */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* <div className="col-lg-5">
        <div className="p-1-6 p-sm-1-9 p-lg-2-2 border border-radius-10 border-color-extra-light-gray bg-white h-100">
          <h2 className="mb-3 text-capitalize h3 text-center">
            Our contact detail
          </h2>
          <p className="mb-2-2 display-28">
            Write as some words about your question and we will put together
            your question for you inside 24 hours and tell you shortly.
          </p>
          <div className="d-flex mb-4 pb-3 border-bottom border-color-extra-light-gray">
            <div className="flex-shrink-0 mt-2">
              <i className="fas fa-phone-alt text-primary fs-2" />
            </div>
            <div className="flex-grow-1 ms-4">
              <h3 className="h5 font-weight-500">Phone Number</h3>
              <span className="text-muted d-block mb-1">(+44) 123 456 789</span>
            </div>
          </div>
          <div className="d-flex mb-4 pb-3 border-bottom border-color-extra-light-gray">
            <div className="flex-shrink-0 mt-2">
              <i className="far fa-envelope-open text-primary fs-2" />
            </div>
            <div className="flex-grow-1 ms-4">
              <h3 className="h5 font-weight-500">Email Address</h3>
              <span className="text-muted d-block mb-1">info@example.com</span>
              <span className="text-muted">info@domain.com</span>
            </div>
          </div>
          <div className="d-flex mb-4 pb-3 border-bottom border-color-extra-light-gray">
            <div className="flex-shrink-0 mt-2">
              <i className="fas fa-map-marker-alt text-primary fs-2" />
            </div>
            <div className="flex-grow-1 ms-4">
              <h3 className="h5 font-weight-500">Loaction</h3>
              <address className="text-muted d-block mb-0 w-md-80 w-xl-70">
                66 Guild Street 512B, Great North Town.
              </address>
            </div>
          </div>
          <ul className="contact-social-icon">
            <li>
              <a href="#!">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fab fa-youtube" />
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fab fa-linkedin-in" />
              </a>
            </li>
          </ul>
        </div>
      </div> */}
            </div>
          </div>
        </section>

        <SellerFooter />
      </div>
    </>
  );
};

export default SellerProductUpload;
