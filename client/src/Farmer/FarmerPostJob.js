import { useContext, useEffect, useState } from 'react';
import AAContext from '../context/AAContext';
import FarmerFooter from './FarmerFooter'
import FarmerNav from './FarmerNav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FarmerPostJob = () => {
    const context = useContext(AAContext);
    const {getUserData , userData} = context;
    const host = process.env.REACT_APP_HOST;

  useEffect(() => {
    getUserData()
  }, []);
    const [data, setData] = useState({name: "", email: "", subject: "", description: "", pay_mode: ""});

    function handleChange1(){
      setData({...data, pay_mode:  'hour'})
      document.getElementById("fixed").style.display = 'none'
      if(document.getElementById("hour").style.display = 'none'){
          document.getElementById("hour").style.display = 'inline';
          document.getElementById("hour").setAttribute("required","true");
      }else{
          document.getElementById("hour").style.display = 'none';
          document.getElementById("hour").setAttribute("required","false");
      }
    }
    function handleChange2(){
      setData({...data, pay_mode:  'fix'})
      document.getElementById("hour").style.display = 'none'
      if(document.getElementById("fixed").style.display = 'none'){
          document.getElementById("fixed").style.display = 'inline'
          document.getElementById("fixed").setAttribute("required","true");
  
      }else{
          document.getElementById("fixed").style.display = 'none';
          document.getElementById("fixed").removeAttribute("required");
          document.getElementById("fixed").setAttribute("required","false");
      }
    }
    const handleChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        data.name =  userData.name
        data.email =  userData.email
        console.log(data);
        const response = await fetch(`${host}/job/send`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token'),
          },
          body: JSON.stringify(data)
        })
        const json = await response.json();
        if(json.success == true){
          toast.success('Job posted successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            window.location.reload()
        }
    }

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
      <div className="col-lg-7 mb-2-2 mb-lg-0">
        <div
          className="p-1-6 p-sm-1-9 p-lg-2-2 border border-radius-10 border-color-extra-light-gray bg-white h-100"
          id="actionBlock"
        >
          <h2 className="h3 mb-2-5 text-center text-capitalize">
            Your Job details
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
                      Your Name <span className="quform-required">*</span>
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
                      Your Email <span className="quform-required">*</span>
                    </label>
                    <div className="quform-input">
                      <input
                        className="form-control border-radius-10"
                        id="email"
                        type="text"
                        value={userData.email}
                        name="email"
                        placeholder="Your email here"
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
                      Your Subject (WorkTitle){" "}
                      <span className="quform-required">*</span>
                    </label>
                    <div className="quform-input">
                      <input
                        className="form-control border-radius-10"
                        id="subject"
                        type="text"
                        name="subject"
                        placeholder="Your subject here"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* End Text input element */}
                {/* Begin Text input element */}
                <div className="col-md-12">
                  <div className="quform-element form-group">
                    <label htmlFor="phone">Payment method</label>
                    <div className="quform-input">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="pay_method"
                          id="hour_pay"
                          onChange={handleChange1}
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Pay by the hour
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="pay_method"
                          id="fixed_pay"
                          onChange={handleChange2}
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          Pay fixed price
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Text input element */}
                <div className="col-md-12" id="hour" style={{display: 'none'}}>
                  <div className="quform-element form-group quform-select-replaced">
                    <label htmlFor="subject">
                      Enter the Ammount / Hour{" "}
                      <span className="quform-required">*</span>
                    </label>
                    <div className="quform-input">
                      <input
                        className="form-control border-radius-10"
                        id="hour_price"
                        type="number"
                        name="hour_price"
                        onChange={handleChange}
                        placeholder="Ammount / Hour"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12" id="fixed" style={{display: 'none'}}>
                  <div className="quform-element form-group quform-select-replaced">
                    <label htmlFor="subject">
                      Enter Your fixed Ammount{" "}
                      <span className="quform-required">*</span>
                    </label>
                    <div className="quform-input">
                      <input
                        className="form-control border-radius-10"
                        id="fix_price"
                        type="number"
                        onChange={handleChange}
                        name="fix_price"
                        placeholder="Your budget"
                      />
                    </div>
                  </div>
                </div>
                {/* Begin Textarea element */}
                <div className="col-md-12">
                  <div className="quform-element form-group">
                    <label htmlFor="message">
                      Description <span className="quform-required">*</span>
                    </label>
                    <div className="quform-input">
                      <textarea
                        className="form-control border-radius-10"
                        id="description"
                        name="description"
                        rows={3}
                        placeholder="Tell us a few words"
                        required=""
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/* End Textarea element */}
                {/* Begin Captcha element */}
                {/* <div class="col-md-12">
                              <div class="quform-element">
                                  <div class="form-group">
                                      <div class="quform-input">
                                          <input class="form-control border-radius-10" id="type_the_word" type="text" name="type_the_word" placeholder="Type the below word">
                                      </div>
                                  </div>
                                  <div class="form-group">
                                      <div class="quform-captcha">
                                          <div class="quform-captcha-inner">
                                              <img src="quform/images/captcha/courier-new-light.png" alt="...">
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div> */}
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
                      <span>Yes, post my work</span>
                    </button>
                  </div>
                </div>
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
      </div>
    </div>
  </div>
</section>

        <FarmerFooter />
    </div>
    </>
  )
}

export default FarmerPostJob