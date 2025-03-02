import React,{useEffect,useState,useContext} from 'react'
import FarmerFooter from './FarmerFooter'
import FarmerNav from './FarmerNav'
import AAContext from '../context/AAContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


const FarmerCheckout = () => {
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();
   const context = useContext(AAContext);
  const { getUserData, userData, getAllequipment, allequipment } = context;
  const eq_id =  localStorage.getItem("e_id")
  useEffect(() => {
    getUserData()
    getAllequipment();
  }, [])
  

  const [data, setData] = useState({
    firstname: userData.name,lastname: userData.name, phone: userData.phone, email: userData.email, dilivery: "Express", address : "", zip: 0, price: 0, quantity: 1,farmerid: userData._id, sellerid: ""
  })

  const {firstname,lastname, phone, email, dilivery, address, zip, price, quantity, farmerid, sellerid} = data;
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);

  

  const handleOnChange = (e) =>{
    setData({ ...data, [e.target.name]: e.target.value });
  }


  const capitalizeFirstChar = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }

  const getProductDetail= (arr)=>{
    return arr.filter(item => item._id == eq_id)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    getAllequipment();
    const selectedOption = option1 ? 'option1' : option2 ? 'option2' : 'option3';
    const arr = getProductDetail(allequipment)
    data.sellerid= arr[0].sellerid;
    data.price= arr[0].sellerid;

    console.log(data)

    const response = await fetch(`${host}/farmerapi/sendorder`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify(data)
    })
    const json = await response.json();
    console.log(json);
    if(json.success == false){
      toast.error(json.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }else{
      toast.success("Order Submitted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setTimeout(() => {
      navigate("/farmerhome")
    }, 2000);
  }
  

  return (
    <div className='main-wrapper'>
    <ToastContainer
        position="top-right"
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
    <FarmerNav />
      <section className="bg-light py-5">
  <div className="container">
    <div className="row">
      <div className="col-xl-8 col-lg-8 mb-4">
        {/* Checkout */}
        <div className="card shadow-0 border">
          <div className="p-4">
            <h5 className="card-title mb-3">{capitalizeFirstChar(userData.name?.split(' ')[0])}'s Checkout</h5>
            <div className="row">
              <div className="col-6 mb-3">
                <p className="mb-0">First name</p>
                <div className="form-outline">
                  <input
                    type="text"
                    id="typeText"
                    name='firstname'
                    placeholder="Type here"
                    className="form-control"
                    value={userData?.name.split(' ')[0]}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-6">
                <p className="mb-0">Last name</p>
                <div className="form-outline">
                  <input
                    type="text"
                    id="typeText"
                    name='lastname'
                    placeholder="Type here"
                    className="form-control"
                    value={userData.name.split(' ')[1]}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-6 mb-3">
                <p className="mb-0">Phone</p>
                <div className="form-outline">
                  <input
                    type="number"
                    id="typePhone"
                    name='phone'
                    maxLength={10}
                    className="form-control"
                    onChange={handleOnChange}
                    value={phone}
                  />
                </div>
              </div>
              <div className="col-6 mb-3">
                <p className="mb-0">Email</p>
                <div className="form-outline">
                  <input
                    type="email"
                    id="typeEmail"
                    name="email"
                    placeholder="example@gmail.com"
                    className="form-control"
                    value={userData.email}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="form-check" style={{paddingLeft: '0.5rem'}}>
              <label className="form-check-label" htmlFor="flexCheckDefault">
                You can change your mobile number
              </label>
            </div>
            <hr className="my-4" />
            <h5 className="card-title mb-3">Shipping info</h5>
            <div className="row mb-3">
              <div className="col-lg-4 mb-3">
                {/* Default checked radio */}
                <div className="form-check h-100 border rounded-3">
                  <div className="p-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="dilivery"
                      id="flexRadioDefault1"
                      onChange={() => {
                        setOption1(true);
                        setOption2(false);
                        setOption3(false);
                      }}
                      value="Express delivery 3-4 days via Fedex"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      Express delivery <br />
                      <small className="text-muted">3-4 days via Fedex </small>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                {/* Default radio */}
                <div className="form-check h-100 border rounded-3">
                  <div className="p-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="dilivery"
                      id="flexRadioDefault2"
                      onChange={() => {
                        setOption1(false);
                        setOption2(true);
                        setOption3(false);
                      }}
                      value="Post office 20-30 days via post"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Post office <br />
                      <small className="text-muted">20-30 days via post </small>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                {/* Default radio */}
                <div className="form-check h-100 border rounded-3">
                  <div className="p-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="dilivery"
                      id="flexRadioDefault3"
                      onChange={() => {
                        setOption1(false);
                        setOption2(false);
                        setOption3(true);
                      }}
                      value="Self pick-up Come to our shop"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault3"
                    >
                      Self pick-up <br />
                      <small className="text-muted">Come to our shop </small>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 mb-3">
                <p className="mb-0">Address</p>
                <div className="form-outline">
                  <input
                    type="text"
                    id="typeText"
                    placeholder="Type here"
                    className="form-control"
                    name='address'
                    onChange={handleOnChange}
                    value={address}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-6 mb-3">
                <p className="mb-0">Zip</p>
                <div className="form-outline">
                  <input type="text" name="zip" onChange={handleOnChange} id="typeText" className="form-control" />
                </div>
              </div>
            </div>
            <div className="form-check mb-3" style={{marginLeft: '-1rem'}}>
              {/* <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="flexCheckDefault1"
              /> */}
              <label className="form-check-label" htmlFor="flexCheckDefault1">
                Fill All the Detail
              </label>
            </div>
            {/* <div className="mb-3">
              <p className="mb-0">Message to seller</p>
              <div className="form-outline">
                <textarea
                  className="form-control"
                  id="textAreaExample1"
                  rows={2}
                  defaultValue={""}
                />
              </div>
            </div> */}
            <div className="float-end">
              {/* <button className="btn btn-light border" >Cancel</button> */}
              <button className="btn btn-success shadow-0 border" onClick={handleSubmit}>
                Continue
              </button>
            </div>
          </div>
        </div>
        {/* Checkout */}
      </div>
            
      {allequipment.filter(item => item._id == eq_id).map((e) => {
        return (
          <div key={e._id} className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
        <div className="ms-lg-4 mt-4 mt-lg-0" style={{ maxWidth: 320 }}>
          <h6 className="mb-3">Summary</h6>
          <div className="d-flex justify-content-between">
            <p className="mb-2">Total price:</p>
            <p className="mb-2">₹{e.price}</p>
          </div>
          {/* <div className="d-flex justify-content-between">
            <p className="mb-2">Discount:</p>
            <p className="mb-2 text-danger">-5%</p>
          </div> */}
          {/* <div className="d-flex justify-content-between">
            <p className="mb-2">Shipping cost:</p>
            <p className="mb-2">+ ₹50</p>
          </div> */}
          <hr />
          <div className="d-flex justify-content-between">
            <p className="mb-2">Total price:</p>
            <p className="mb-2 fw-bold">₹{e.price}</p>
          </div>
          <div className="input-group mt-3 mb-4">
            <input
              type="text"
              className="form-control border"
              name=""
              placeholder="Promo code"
            />
            <button className="btn btn-light text-primary border">Apply</button>
          </div>
          <hr />
          <h6 className="text-dark my-4">Item</h6>
          <div className="d-flex align-items-center mb-4">
            <div className="me-3 position-relative">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                1
              </span>
              <img
                src={e.equipment_photo == null ? "img/bg/fer1.jpg" : e.equipment_photo}
                style={{ height: 96, width: 120 }}
                className="img-sm rounded border"
              />
            </div>
            <div className="">
            {e.equipment_name}
            <br />
                {e.equipment_description}
              <div className="price text-muted">Price: ₹{e.price}</div>
            </div>
          </div>
        </div>
      </div>
        )
      })}


    </div>
  </div>
</section>
<FarmerFooter />
</div>
  )
}

export default FarmerCheckout