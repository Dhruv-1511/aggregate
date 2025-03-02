import React from 'react'
import WorkerNav from './WorkerNav';
import Footer from './Footer';

const WorkerAbout = (props) => {

  return (
    <>
    <WorkerNav />
    <div className="main-wrapper">

  {/* PAGE TITLE
  ================================================== */}
  <section className="page-title-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 text-center">
          <h1 className="mb-4">About Us</h1>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="page-title-list">
                <ol className="breadcrumb d-inline-block mb-0">
                  <h6>Get Your Opportunities</h6>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ABOUTUS
  ================================================== */}
  <section className="about-style-01">
    <div className="container border-bottom border-color-extra-light-gray mb-1-9 mb-lg-6 pb-1-9 pb-lg-6">
      <div className="row align-items-center mt-n2-9">
        <div className="col-lg-6 mt-2-9">
          <div className="pe-xl-2-5">
            <div className="row g-3">
              <div className="col-8">
                <img
                  src="img/bg/whome1.jpg"
                  className="border-radius-10"
                  alt="..."
                />
              </div>
              <div className="col-4 mt-2-9 mt-sm-11 mt-md-16 mt-lg-9 mt-xl-2-5 mt-xxl-6">
                <div className="about-image-wrapper"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="about-image">
                  <img
                    src="img/bg/whome3.jpg"
                    className="border-radius-10"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mt-2-9">
          <div className="about-right ps-xl-1-6 ps-xxl-2-9">
            <h2 className="mb-4 text-capitalize">
              We Care About Your Life For Better Future.
            </h2>
            <p className="mb-4">
              Start taking a while for your job search to request and agenda
              informational interviews with human beings withinside the fields
              you’re interested by to find out about their profession paths and
              get profession advice.
            </p>
            <div className="row border-bottom border-color-extra-light-gray mb-1-9 pb-1-9">
              <div className="col-md-6 mb-4 mb-md-0">
                <h4 className="mb-3">
                  <span>01</span>What We Believe
                </h4>
                <p className="mb-0">
                  Single one in all our jobs has a few sort of flexibility
                  option.
                </p>
              </div>
              <div className="col-md-6">
                <h4 className="mb-3">
                  <span>02</span>What We Offer
                </h4>
                <p className="mb-0">
                  Single one in all our jobs has a few sort of flexibility
                  option.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* SERVICES
  ================================================== */}
  <section className="bg-very-light-gray">
    <div className="container">
      <div className="section-heading">
        <h2>Our Best Services For You</h2>
        <p>Know your really worth and find the job that qualify your life.</p>
      </div>
      <div className="row mt-n1-9">
        <div className="col-md-6 col-lg-4 mt-1-9">
          <div className="service-wrapper">
            <div className="service-icons">
              <img src="img/icons/icon-20.png" alt="..." />
            </div>
            <h4 className="h5 mb-3">Display Jobs</h4>
            <p className="mb-0 w-90 mx-auto">
              If success is a process with a number of defined steps.
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mt-1-9">
          <div className="service-wrapper">
            <div className="service-icons">
              <img src="img/icons/icon-19.png" alt="..." />
            </div>
            <h4 className="h5 mb-3">Find Job</h4>
            <p className="mb-0 w-90 mx-auto">
              If success is a process with a number of defined steps.
            </p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mt-1-9">
          <div className="service-wrapper">
            <div className="service-icons">
              <img src="img/icons/icon-18.png" alt="..." />
            </div>
            <h4 className="h5 mb-3">Apply Job</h4>
            <p className="mb-0 w-90 mx-auto">
              If success is a process with a number of defined steps.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* PROCESS
  ================================================== */}
  <section>
    <div className="container">
      <div className="section-heading">
        <h2>Our Working Process</h2>
        <p>Know your really worth and find the job that qualify your life.</p>
      </div>
      <div className="row mt-n1-9">
        <div className="col-sm-6 col-lg-3 mt-2-2">
          <div className="process-style1">
            <div className="line" />
            <div className="number-wrapper">
              <div className="number">01</div>
            </div>
            <h5 className="mb-lg-3">Create Account</h5>
            <p className="mb-0 w-md-90 mx-auto">
              Search all the open positions on the web that suits you.
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3 mt-2-2">
          <div className="process-style1">
            <div className="line" />
            <div className="number-wrapper">
              <div className="number">02</div>
            </div>
            <h5 className="mb-lg-3">Display Job</h5>
            <p className="mb-0 w-md-90 mx-auto">
              Search all the open positions on the web that suits you.
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3 mt-2-2">
          <div className="process-style1">
            <div className="line" />
            <div className="number-wrapper">
              <div className="number">03</div>
            </div>
            <h5 className="mb-lg-3">Find Your Job</h5>
            <p className="mb-0 w-md-90 mx-auto">
              Search all the open positions on the web that suits you.
            </p>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3 mt-2-2">
          <div className="process-style1">
            <div className="number-wrapper">
              <div className="number">04</div>
            </div>
            <h5 className="mb-lg-3">Apply Job</h5>
            <p className="mb-0 w-md-90 mx-auto">
              Search all the open positions on the web that suits you.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*EXTRA
  ================================================== */}
  <section
    className="bg-img cover-background"
    data-overlay-dark={5}
    style={{backgroundImage: 'url("img/bg/scene-20.jpg")'}}
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-5">
          <div className="bg-white-opacity p-1-9 border-radius-10">
            <h2 className="h3 mb-3 text-capitalize">
              Find Your Job at Anytime...
            </h2>
            <p className="mb-4">
              Just due to the fact you don’t recognise what profession you need
              doesn’t imply you don’t recognise what you’re right at. A first
              rate manner to attention to your capabilities is to make a listing
              of your strengths.
            </p>
            <a href="contact-us.html" className="butn">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
 
 
 {/* TESTIMONIAL
  ================================================== */}
  <section className="bg-very-light-gray">
    <div className="container">
      <div className="section-heading">
        <h2>What Our Client Says</h2>
        <p>Know your really worth and find the job that qualify your life.</p>
      </div>
      <div className="testimonial2-carousel owl-carousel owl-theme">
        <div className="testimonial-wrapper">
          <div className="testimonial-icon">
            <i className="ti-quote-left" />
          </div>
          <p className="mb-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam id
            voluptatum quidem molestias temporibus esse recusandae inventore
            tenetur neque beatae fugit, quis voluptates.
          </p>
          <div className="testimonial-box">
            <div className="d-sm-flex justify-content-between align-items-center">
              <div className="mb-2 mb-sm-0">
                <h4 className="h5">renish</h4>
                {/* <span class="designation">Web Designer</span> */}
              </div>
              <div className="display-31 text-warning">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-wrapper">
          <div className="testimonial-icon">
            <i className="ti-quote-left" />
          </div>
          <p className="mb-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam id
            voluptatum quidem molestias temporibus esse recusandae inventore
            tenetur neque beatae fugit, quis voluptates.
          </p>
          <div className="testimonial-box">
            <div className="d-sm-flex justify-content-between align-items-center">
              <div className="mb-2 mb-sm-0">
                <h4 className="h5">renish</h4>
                {/* <span class="designation">Web Designer</span> */}
              </div>
              <div className="display-31 text-warning">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-wrapper">
          <div className="testimonial-icon">
            <i className="ti-quote-left" />
          </div>
          <p className="mb-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam id
            voluptatum quidem molestias temporibus esse recusandae inventore
            tenetur neque beatae fugit, quis voluptates.
          </p>
          <div className="testimonial-box">
            <div className="d-sm-flex justify-content-between align-items-center">
              <div className="mb-2 mb-sm-0">
                <h4 className="h5">renish</h4>
                {/* <span class="designation">Web Designer</span> */}
              </div>
              <div className="display-31 text-warning">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
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

export default WorkerAbout