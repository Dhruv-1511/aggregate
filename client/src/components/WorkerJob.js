import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import WorkerNav from './WorkerNav';
import Footer from './Footer';
import {Link} from 'react-router-dom'


const WorkerJob = ({setProgress}) => {

  const host = "http://localhost:5000";
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
    getAllJob();  
    setProgress(50);
  }, [])

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [gujaratStates, setGujaratStates] = useState(['Ahmedabad', 'Surat', 'Vadodara', 'Amreli']);
  const [maharashtraStates, setMaharashtraStates] = useState(['Mumbai', 'Pune', 'Nagpur', 'Aurangabad']);

  // Filters state
  const [jobType, setJobType] = useState({
    fullTime: false,
    partTime: false,
    temporary: false
  });

  const [experience, setExperience] = useState({
    fresher: false,
    lessThanOneYear: false,
    twoYear: false,
    threeYear: false,
    fourYear: false,
    aboveFourYear: false
  });

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    setSelectedState('');
    applyFilters(event.target.value, '', jobType, experience);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    applyFilters(selectedRegion, event.target.value, jobType, experience);
  };

  const handleJobTypeChange = (event) => {
    const { id, checked } = event.target;
    const updatedJobType = {
      ...jobType,
      [id]: checked
    };
    setJobType(updatedJobType);
    applyFilters(selectedRegion, selectedState, updatedJobType, experience);
  };

  const handleExperienceChange = (event) => {
    const { id, checked } = event.target;
    const updatedExperience = {
      ...experience,
      [id]: checked
    };
    setExperience(updatedExperience);
    applyFilters(selectedRegion, selectedState, jobType, updatedExperience);
  };

  const getStatesByRegion = () => {
    if (selectedRegion === 'Gujarat') {
      return gujaratStates.map(state => <option key={state} value={state}>{state}</option>);
    } else if (selectedRegion === 'Maharashtra') {
      return maharashtraStates.map(state => <option key={state} value={state}>{state}</option>);
    } else {
      return null;
    }
  };

  const getAllJob = async() => {
    const response = await fetch(`${host}/job/latestjob`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
      }
    });
    const json = await response.json();
    if(json.success === true){
      console.log(json.jobs) 
      setJobs(json.jobs);
      setFilteredJobs(json.jobs);
      setProgress(100);
    }
  }

  const applyFilters = (region, state, jobTypeFilters, experienceFilters) => {
    let result = [...jobs];

    // Filter by region
    if (region) {
      result = result.filter(job => 
        job.location && job.location.region === region
      );
    }

    // Filter by state
    if (state) {
      result = result.filter(job => 
        job.location && job.location.state === state
      );
    }

    // Filter by job type
    const selectedJobTypes = Object.keys(jobTypeFilters).filter(key => jobTypeFilters[key]);
    if (selectedJobTypes.length > 0) {
      result = result.filter(job => {
        if (selectedJobTypes.includes('fullTime') && job.job_type === 'Full Time') {
          return true;
        }
        if (selectedJobTypes.includes('partTime') && job.job_type === 'Part Time') {
          return true;
        }
        if (selectedJobTypes.includes('temporary') && job.job_type === 'Temporary') {
          return true;
        }
        return false;
      });
    }

    // Filter by experience
    const selectedExperience = Object.keys(experienceFilters).filter(key => experienceFilters[key]);
    if (selectedExperience.length > 0) {
      result = result.filter(job => {
        if (selectedExperience.includes('fresher') && job.experience === 'Fresher') {
          return true;
        }
        if (selectedExperience.includes('lessThanOneYear') && job.experience === 'Less than 1 year') {
          return true;
        }
        if (selectedExperience.includes('twoYear') && job.experience === '2 Year') {
          return true;
        }
        if (selectedExperience.includes('threeYear') && job.experience === '3 Year') {
          return true;
        }
        if (selectedExperience.includes('fourYear') && job.experience === '4 Year') {
          return true;
        }
        if (selectedExperience.includes('aboveFourYear') && job.experience === 'Above 4 Year') {
          return true;
        }
        return false;
      });
    }

    setFilteredJobs(result);
  }

  const handleApplyNow = (id) =>{
    localStorage.setItem("jobdetail", id);
    navigate("/workerjobapply")
  }
  
  return (
    <>
    <WorkerNav />
        {/* MAIN WRAPPER */}
        <div className="main-wrapper">
            
  {/* PAGE TITLE
  ================================================== */}
  <section className="page-title-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 text-center">
          <h1 className="h2 mb-4">Aggregate Agro</h1>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="page-title-list">
                <ol className="breadcrumb d-inline-block mb-0">
                  <li className="breadcrumb-item d-inline-block active">
                    <a href="#!" className="text-primary">
                      Get Your Opportunities
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


{/* JOB GRID 1 - LEFT SIDEBAR
  ================================================== */}
  <section>
    <div className="container">
      <div className="row mt-n6">
        {/* job-grid left */}
        <div className="col-lg-3 order-2 order-lg-1 mt-6">
          <div className="sidebar">
            <div className="sidebar-title">Search By</div>
            <div className="widget search">
              <form action="#!" className="search-bar">
                <div className="quform-element form-group">
                  <label htmlFor="search">Search By State</label>
                  <div className="quform-input">
                    <select
                      name="state"
                      id="job-search"
                      className="form-control"
                      value={selectedRegion} 
                      onChange={handleRegionChange}
                    >
                      <option value="">--Select Region--</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Maharashtra">Maharashtra</option>

                      {/* <option value="maharashtra">Maharashtra</option> */}
                    </select>
                  </div>
                </div>
                <div className="quform-element form-group">
                  <label htmlFor="search">Search By Village</label>
                  <div className="quform-input">
                  {selectedRegion && (
                    <div>
                      <select
                        name="district"
                        id="job-search"
                        className="form-control"
                        value={selectedState} 
                        onChange={handleStateChange}
                      >
                        <option name="">--select state--</option>
                        {getStatesByRegion()}
                      </select>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          
          
            <div className="sidebar-title">Job Type</div>
            <div className="widget">
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="full-time"
                  id="fullTime"
                  checked={jobType.fullTime}
                  onChange={handleJobTypeChange}
                />
                <label className="form-check-label mb-0" htmlFor="fullTime">
                  Full Time
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="part-time"
                  id="partTime"
                  checked={jobType.partTime}
                  onChange={handleJobTypeChange}
                />
                <label className="form-check-label mb-0" htmlFor="partTime">
                  Part Time
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="temporary"
                  id="temporary"
                  checked={jobType.temporary}
                  onChange={handleJobTypeChange}
                />
                <label className="form-check-label mb-0" htmlFor="temporary">
                  Temporary
                </label>
              </div>
            </div>
            <div className="sidebar-title">Experience</div>
            <div className="widget">
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="fresher"
                  checked={experience.fresher}
                  onChange={handleExperienceChange}
                />
                <label className="form-check-label mb-0" htmlFor="fresher">
                  Fresher
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="lessThanOneYear"
                  checked={experience.lessThanOneYear}
                  onChange={handleExperienceChange}
                />
                <label className="form-check-label mb-0" htmlFor="lessThanOneYear">
                  Less than 1 year
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="twoYear"
                  checked={experience.twoYear}
                  onChange={handleExperienceChange}
                />
                <label className="form-check-label mb-0" htmlFor="twoYear">
                  2 Year
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="threeYear"
                  checked={experience.threeYear}
                  onChange={handleExperienceChange}
                />
                <label className="form-check-label mb-0" htmlFor="threeYear">
                  3 Year
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="fourYear"
                  checked={experience.fourYear}
                  onChange={handleExperienceChange}
                />
                <label className="form-check-label mb-0" htmlFor="fourYear">
                  4 Year
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="aboveFourYear"
                  checked={experience.aboveFourYear}
                  onChange={handleExperienceChange}
                />
                <label className="form-check-label mb-0" htmlFor="aboveFourYear">
                  Above 4 Year
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* end job-grid left */}
        {/* job-grid right */}
        <div className="col-lg-9 order-1 order-lg-2 mt-6 job_offer">
          <div className="ps-lg-1-6 ps-xl-1-9">
            <div className="row mt-n1-9">
                    {filteredJobs.length > 0 ? filteredJobs.map((job) => {
                      return (
                        <div key={job._id} className="col-md-6 mt-1-9">
                <div className="card border-color-extra-light-gray h-100 border-radius-5">
                  <div className="card-body p-1-6 p-xl-1-9">
                    <div className="d-flex mb-3">
                      <div className="flex-shrink-0">
                        <img
                          src="img/avatar/user.png"
                          className="border-radius-50 w-40px"
                          alt="..."
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="mb-0">{job.name}</h6>
                        <span className="text-muted display-31">
                          Nov 18, 2021
                        </span>
                      </div>
                    </div>
                    <h5 className="text-primary mb-3">
                    ₹ {job.hour_price || job.fix_price}
                      <span className="text-muted display-31"> / Hour</span>{" "}
                    </h5>
                    <div className="mb-4">
                      
                      <span className="display-30">
                        <i className="far fa-clock pe-2" />
                        {job.pay_mode === 'hour' ? 'Part Time' : 'Full Time'}
                      </span>
                    </div>
                    <button onClick={() => handleApplyNow(job._id)} className="butn butn-md radius">
                      Apply Now
                    </button>
                    <div className="farmer_con">
                      <ul>
                        <li>
                          {" "}
                          <a href="#">
                            {" "}
                            <i className="fa-solid fa-envelope" />
                          </a>
                        </li>
                        <li>
                          {" "}
                          <a href="#">
                            {" "}
                            <i className="fa-solid fa-phone" />
                          </a>
                        </li>
                        <li>
                          {" "}
                          <i className="fa-solid fa-circle" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
                      )
                    }) : (
                      <div className="col-12 text-center mt-4">
                        <p>No jobs match your selected filters. Please try different filter options.</p>
                      </div>
                    )}
              

            </div>
          </div>
        </div>
        {/* end job-grid right */}
      </div>
    </div>
  </section>
  <Footer />

        </div>
    </>
  )
}

export default WorkerJob