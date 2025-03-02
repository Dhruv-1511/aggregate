import React from 'react'
import AAContext from '../context/AAContext'
import { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FarmerNav from './FarmerNav';
import FarmerFooter from './FarmerFooter';

const FarmerContact = (props) => {
  const host = process.env.REACT_APP_HOST;
  const context = useContext(AAContext);
  const { getUserData, userData } = context;
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [reviewData, setReviewData] = useState({})


  useEffect(() => {
    getUserData();
  }, []);

  const handleChange = (e)=>{
    if(e.target.name == 'subject'){
      setSubject(e.target.value)
    }else if(e.target.name == 'description'){
      setDescription(e.target.value);
    }
  }

  const handleSubmit =async (e)=>{
    e.preventDefault();
    const response = await fetch(`${host}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({name: userData.name,email: userData.email,subject: subject,description:description })
    });
    
    const json = await response.json();
    setReviewData(json)
    if(reviewData.success == true){
      toast.success('Message Sent!', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  return (
    <>
    <ToastContainer
position="bottom-left"
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
        <div className="main-wrapper">
<FarmerNav />


            {/* PAGE TITLE*/}
  <section className="page-title-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 text-center">
          <h1 className="h2 mb-4">Contact Us</h1>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="page-title-list">
                <ol className="breadcrumb d-inline-block mb-0">
                  <li className="breadcrumb-item d-inline-block">
                    <a href="#!">Find Opportunities around you!</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* CONTACT INFO
  ================================================== */}
  {/* MAP
  ================================================== */}
  <div>
    <iframe
      className="map-h500"
      id="gmap_canvas"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14874.614477248362!2d72.87364478571584!3d21.245579823496996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f4fb5c0b087%3A0xb7aabd8a90da0679!2sMota%20Varachha%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1676606701757!5m2!1sen!2sin"
    />
  </div>
  {/* CONTACT FORM
  ================================================== */}
  <section className="bg-very-light-gray">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-7 mb-2-2 mb-lg-0">
          <div className="p-1-6 p-sm-1-9 p-lg-2-2 border border-radius-10 border-color-extra-light-gray bg-white h-100">
            <h2 className="h3 mb-2-5 text-center text-capitalize">
              Contact With US
            </h2>
            <form
              className="contact quform"
              onSubmit={handleSubmit}
            >
              <div className="quform-elements">
                <div className="row">
                  {/* Begin Text input element */}
                  <div className="col-md-6">
                    <div className="quform-element form-group">
                      <label htmlFor="name">
                        Your Name <span className="quform-required">*</span>
                      </label>
                      <div className="quform-input">
                        <input
                          className="form-control border-radius-10"
                          id="name"
                          type="text"
                          name="name"
                          value={userData.name}
                          placeholder="Your name here"
                          readOnly
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/* End Text input element */}
                  {/* Begin Text input element */}
                  <div className="col-md-6">
                    <div className="quform-element form-group">
                      <label htmlFor="email">
                        Your Email <span className="quform-required">*</span>
                      </label>
                      <div className="quform-input">
                        <input
                          className="form-control border-radius-10"
                          id="email"
                          type="text"
                          name="email"
                          value={userData.email}
                          placeholder="Your email here"
                          required
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  {/* End Text input element */}
                  {/* Begin Text input element */}
                  <div className="col-md-12">
                    <div className="quform-element form-group">
                      <label htmlFor="subject">
                        Your Subject <span className="quform-required">*</span>
                      </label>
                      <div className="quform-input">
                        <input
                          className="form-control border-radius-10"
                          id="subject"
                          type="text"
                          name="subject"
                          value={subject}
                          onChange={handleChange}
                          required
                          placeholder="Your subject here"
                        />
                      </div>
                    </div>
                  </div>
                  {/* End Text input element */}
                  {/* Begin Textarea element */}
                  <div className="col-md-12">
                    <div className="quform-element form-group">
                      <label htmlFor="message">
                        Message <span className="quform-required">*</span>
                      </label>
                      <div className="quform-input">
                        <textarea
                          className="form-control border-radius-10"
                          id="message"
                          name="description"
                          rows={3}
                          placeholder="Tell us a few words"
                          value={description}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button onClick={handleSubmit} className="butn border-0" type="submit">
                      <span>Send Message</span>
                  </button>
                  {/* End Textarea element */}
                  {/* Begin Submit button */}
                  {/* <div className="col-md-12">
                    <div className="quform-submit-inner">
                      <button className="butn border-0" type="submit">
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div> */}
                  {/* End Submit button */}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-5">
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
                <span className="text-muted d-block mb-1">
                  (+91) 78744 67710
                </span>
              </div>
            </div>
            <div className="d-flex mb-4 pb-3 border-bottom border-color-extra-light-gray">
              <div className="flex-shrink-0 mt-2">
                <i className="far fa-envelope-open text-primary fs-2" />
              </div>
              <div className="flex-grow-1 ms-4">
                <h3 className="h5 font-weight-500">Email Address</h3>
                <span className="text-muted d-block mb-1">
                  renishsuriya1441@gmail.com
                </span>
              </div>
            </div>
            <div className="d-flex mb-4 pb-3 border-bottom border-color-extra-light-gray">
              <div className="flex-shrink-0 mt-2">
                <i className="fas fa-map-marker-alt text-primary fs-2" />
              </div>
              <div className="flex-grow-1 ms-4">
                <h3 className="h5 font-weight-500">Loaction</h3>
                <address className="text-muted d-block mb-0 w-md-80 w-xl-70">
                  mota varachha ,surat
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
        </div>
      </div>
    </div>
  </section>
  <FarmerFooter />
  

        </div>
    </>
  )
}

export default FarmerContact