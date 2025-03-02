import React from 'react'

const SellerFooter = () => {
  return (
    <footer>
  <div className="container footer_container">
    <div className="row mt-n2-6 footer_row">
      <div className="container border-bottom border-color-light-white py-2-5 py-md-6 mb-6 mb-md-8 mb-lg-10">
        <div className="row justify-content-center align-items-center mt-n1-9">
          <div className="col-xl-6 mt-1-9">
            <div className="d-sm-flex align-items-center">
              <div className="flex-shrink-0 mb-1-6 mb-sm-0">
                <a href="index.html" className="footer-logo">
                  <img src="img/logos/logo.png" alt="..." />
                  Aggregate Agro
                </a>
              </div>
              <div className="flex-grow-1 border-sm-start border-color-light-white ms-sm-4 ps-sm-4 border-width-2">
                <p className="mb-0 display-30 text-white opacity9 w-lg-95">
                  Create a free account to discover lots of Jobs &amp; Find
                  Opportunities around you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4 mt-2-6">
        <h3 className="h5 mb-1-6 text-white">Contact Us</h3>
        <p className="mb-1-6 text-white opacity9">
         
        </p>
        <ul className="contact-list">
          <li className="d-flex">
            <span className="fa fa-home pe-3 text-white" />
            <a href="#!">mota varachha ,surat</a>
          </li>
          <li className="d-flex">
            <span className="fa fa-phone-alt pe-3 text-white" />
            <a href="#!">(+91) 78744 67710</a>
          </li>
          <li className="d-flex">
            <span className="fa fa-envelope pe-3 text-white" />
            <a href="#!">renishsuriya1441@gmail.com</a>
          </li>
        </ul>
      </div>
      <div className="col-sm-6 col-xl-2 mt-2-6">
        <div className="ps-md-1-9">
          <h3 className="h5 mb-1-6 text-white">About us</h3>
          <ul className="footer-list-style1">
            <li>
              <a href="aboutus.html">Our Services</a>
            </li>
            <li>
              <a href="blog-grid.html">Our Client</a>
            </li>
            <li>
              <a href="how-it-works.html">Our Process</a>
            </li>
            <li>
              <a href="contact-us.html">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-sm-6 col-xl-2 mt-2-6">
        <div className="ps-md-1-9">
          <h3 className="h5 mb-1-6 text-white">Social Services</h3>
          <ul className="footer-list-style1">
            <li>
              <a href="#!">
                <i className="fab fa-facebook-f" /> &nbsp; Facebook{" "}
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fab fa-twitter" />
                &nbsp; twitter{" "}
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fab fa-youtube" />
                &nbsp; youtube{" "}
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="fab fa-linkedin-in" />
                &nbsp; linked-in{" "}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>
  )
}

export default SellerFooter