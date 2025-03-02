import React from 'react'
import FarmerFooter from './FarmerFooter'
import FarmerNav from './FarmerNav'

const FarmerProduct = () => {
  return (
    <div className='main-wrapper'>
        <FarmerNav />

        <section className="">
  <div className="container">
    <div className="row">
      {/* sidebar */}
      <div className="col-lg-3">
        {/* Toggle button */}
        <button
          className="btn btn-outline-secondary mb-3 w-100 d-lg-none"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span>Show filter</span>
        </button>
        {/* Collapsible wrapper */}
      </div>
      {/* sidebar */}
      {/* content */}
      <div className="col-lg-12">
        <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
          <strong className="d-block py-2">32 Items found </strong>
          <div className="ms-auto">
            <select className="form-select d-inline-block w-auto border pt-1">
              <option value={0}>Best match</option>
              <option value={1}>Recommended</option>
              <option value={2}>High rated</option>
              <option value={3}>Randomly</option>
            </select>
          </div>
        </header>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6 d-flex" style={{marginTop: "10px"}}>
            <div className="card w-100 my-2 shadow-2-strong" style={{    maxHeight: "100%"
    ,height: "100%"}}>

                <div className="prodequipment" style={{    maxWidth: "100%",
    textAlign: "center" , height:"100%", paddingTop: "10px"}} >
              <img src="img/bg/feuipment_01.jpg" className="card-img-top"  style={{       width: "80%" }} />
              </div>
              <div className="card-body d-flex flex-column">
                <div className="d-flex flex-row">
                  <h5 className="mb-1 me-1"> ₹381</h5>
                  <span className="text-danger">
                    <s>₹399</s>
                  </span>
                </div>
                <p className="card-text">Nature Friend Organic vermi Compost</p>
                <div className=" d-flex align-items-end pt-3 px-0 pb-0 mt-0px" style={{  margin: "0px" }}>
                  <hr />
                  <a href="prodcheckout.php" className="butn butn-apply">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 d-flex" style={{marginTop: "10px"}}>
            <div className="card w-100 my-2 shadow-2-strong" style={{    maxHeight: "100%"
    ,height: "100%", }}>

                <div className="prodequipment" style={{    maxWidth: "100%",
    textAlign: "center", height:"100%", paddingTop: "10px"}} >
              <img src="img/bg/fer1.jpg" className="card-img-top"  style={{       width: "80%" }} />
              </div>
              <div className="card-body d-flex flex-column">
                <div className="d-flex flex-row">
                  <h5 className="mb-1 me-1"> ₹381</h5>
                  <span className="text-danger">
                    <s>₹399</s>
                  </span>
                </div>
                <p className="card-text">Nature Friend Organic vermi Compost</p>
                <div className=" d-flex align-items-end pt-3 px-0 pb-0 mt-0px" style={{  margin: "0px" }}>
                  <hr />
                  <a href="prodcheckout.php" className="butn butn-apply">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-6 d-flex" style={{marginTop: "10px"}}>
            <div className="card w-100 my-2 shadow-2-strong" style={{    maxHeight: "100%"
    ,height: "100%"}}>

                <div className="prodequipment" style={{    maxWidth: "100%",
    textAlign: "center" , height:"100%", paddingTop: "10px"}} >
              <img src="img/bg/feuipment_01.jpg" className="card-img-top"  style={{       width: "80%" }} />
              </div>
              <div className="card-body d-flex flex-column">
                <div className="d-flex flex-row">
                  <h5 className="mb-1 me-1"> ₹381</h5>
                  <span className="text-danger">
                    <s>₹399</s>
                  </span>
                </div>
                <p className="card-text">Nature Friend Organic vermi Compost</p>
                <div className=" d-flex align-items-end pt-3 px-0 pb-0 mt-0px" style={{  margin: "0px" }}>
                  <hr />
                  <a href="prodcheckout.php" className="butn butn-apply">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 d-flex" style={{marginTop: "10px"}}>
            <div className="card w-100 my-2 shadow-2-strong" style={{    maxHeight: "100%"
    ,height: "100%", }}>

                <div className="prodequipment" style={{    maxWidth: "100%",
    textAlign: "center", height:"100%", paddingTop: "10px"}} >
              <img src="https://images.unsplash.com/photo-1518893063132-36e46dbe2428?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80" className="card-img-top"  style={{       width: "80%" }} />
              </div>
              <div className="card-body d-flex flex-column">
                <div className="d-flex flex-row">
                  <h5 className="mb-1 me-1"> ₹381</h5>
                  <span className="text-danger">
                    <s>₹399</s>
                  </span>
                </div>
                <p className="card-text">Nature Friend Organic vermi Compost</p>
                <div className=" d-flex align-items-end pt-3 px-0 pb-0 mt-0px" style={{  margin: "0px" }}>
                  <hr />
                  <a href="prodcheckout.php" className="butn butn-apply">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
      
    
    
        </div>
        <hr />
        {/* Pagination */}
        {/* <nav
          aria-label="Page navigation example"
          className="d-flex justify-content-center mt-3"
        >
          <ul className="pagination">
            <li className="page-item disabled">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">«</span>
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                4
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                5
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">»</span>
              </a>
            </li>
          </ul>
        </nav> */}
        {/* Pagination */}
      </div>
    </div>
  </div>
</section>



        <FarmerFooter/>
    </div>
  )
}

export default FarmerProduct