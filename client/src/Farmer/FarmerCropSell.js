import { useContext, useEffect, useState } from "react";
import AAContext from "../context/AAContext";
import FarmerFooter from "./FarmerFooter";
import FarmerNav from "./FarmerNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {storage, db} from '../utils/firebase';
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref as Tref, uploadBytesResumable } from 'firebase/storage';

const FarmerCropSell = () => {
  const navigate = useNavigate();
  const context = useContext(AAContext);
  const { getUserData, userData } = context;
  const host = process.env.REACT_APP_HOST;
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(null)


  const id = localStorage.getItem("user_id")

  useEffect(() => {
    getUserData();
  }, []);
  const [data, setData] = useState({
    name: userData.name,crop_name: "", farmerid: id, location: userData.address, phone: 0, crop_description: "", crop_photo: "", price: 0, quantity: 0
  });

  const {name,crop_name, farmerid, location, phone, crop_description, crop_photo, price, quantity } = data


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
              setData((prev) => ({...prev, crop_photo: downloadUrl}))
              console.log(data);
          })
      }
      )
    };

    file && uploadFile();
  }, [file])

  
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    data.name = userData.name;
    data.email = userData.email;
    console.log(data);
    const response = await fetch(`${host}/farmerapi/uploadcrop`, {
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
      navigate("/farmerhome");
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
        <FarmerNav />
        <section className="bg-very-light-gray">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12 mb-2-2 mb-lg-0">
                <div
                  className="p-1-6 p-sm-1-9 p-lg-2-2 border border-radius-10 border-color-extra-light-gray bg-white h-100"
                  id="actionBlock"
                >
                  <h2 className="h3 mb-2-5 text-center text-capitalize">
                    Upload Crop Details
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
                                onChange={handleChange}
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
                              Email 
                              <span className="quform-required">*</span>
                            </label>
                            <div className="quform-input">
                              <input
                                className="form-control border-radius-10"
                                id="email"
                                type="text"
                                value={userData.email}
                                name="email"
                                placeholder="Your Contact No. here"
                                readOnly
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="quform-element form-group">
                            <label htmlFor="email">
                                Address 
                                <span className="quform-required">*</span>
                              </label>
                            <div className="quform-input">
                              <input
                                className="form-control border-radius-10"
                                id="address"
                                type="text"
                                value={location}
                                name="location"
                                placeholder="Enter Your Address"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="quform-element form-group">
                          <label htmlFor="email">
                              Phone 
                              <span className="quform-required">*</span>
                            </label>
                            <div className="quform-input">
                              <input
                                className="form-control border-radius-10"
                                id="email"
                                type="number"
                                value={userData.phone}
                                name="phone"
                                placeholder="Your Contact No. here"
                                readOnly
                              />
                            </div>
                          </div>
                        </div>

                        {/* End Text input element */}
                        {/* Begin Text input element */}
                        <div className="col-md-12">
                          <div className="quform-element form-group quform-select-replaced">
                            <label htmlFor="subject">
                              Crop Name
                              <span className="quform-required">*</span>
                            </label>
                            <div className="quform-input">
                              <input
                                className="form-control border-radius-10"
                                id="subject"
                                type="text"
                                name="crop_name"
                                placeholder="Your Crop Name here"
                                onChange={handleChange}
                                value={crop_name}
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="quform-element form-group quform-select-replaced">
                            <label htmlFor="subject">
                              Crop Image
                              <span className="quform-required">*</span>
                            </label>
                            <div className="quform-input">
                              <input
                                className="form-control"
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file"
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
                                name="crop_description"
                                rows={3}
                                placeholder="Tell us a few words"
                                required=""
                                value={crop_description}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="quform-element form-group">
                            <label htmlFor="phone">Required Price</label>
                            <div className="quform-input">
                              <div className="form-check" style={{paddingLeft : '0rem'}}>
                                <input
                                  className="form-control border-radius-10"
                                  type="number"
                                  name="price"
                                  placeholder="Your Crop Price here"
                                  onChange={handleChange}
                                  value={price}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* End Textarea element */}

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
            
            </div>
          </div>
        </section>

        <FarmerFooter />
      </div>
    </>
  );
};

export default FarmerCropSell;
