import './App.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Worker_Home from './components/WorkerHome';
import WorkerJob from './components/WorkerJob';
import WorkerAbout from './components/WorkerAbout';
import WorkerContact from './components/WorkerContact';
import Index from './components/Index';
import AAState from './context/AAState';
import WorkerProfile from './components/WorkerProfile';
import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import FarmerHome from './Farmer/FarmerHome';
import FarmerNotify from './Farmer/FarmerNotify';
import FarmerAbout from './Farmer/FarmerAbout';
import FarmerContact from './Farmer/FarmerContact';
import FarmerCropDetails from './Farmer/FarmerCropDetails';
import FarmerCrop from './Farmer/FarmerCrop';
import FarmerPostJob from './Farmer/FarmerPostJob';
import FarmerProfile from './Farmer/FarmerProfile';
import Logout from './components/Logout'
import WorkerDetail from './components/WorkerDetail';
import Workerjobapply from './components/Workerjobapply';
import FarmerCheckout from './Farmer/FarmerCheckout';
import FarmerCropSell from './Farmer/FarmerCropSell';
import FarmerProduct from './Farmer/FarmerProduct';
import FworkerDetail from './Farmer/FworkerDetail';
import FarmerEqDetail from './Farmer/FarmerEqDetail';
import SellerHome from './Seller/SellerHome';
import SellerProduct from './Seller/SellerProduct';
import SellerProductDetails from './Seller/SellerProductDetails';
import SellerProductUpload from './Seller/SellerProductUpload';
import SellerNotify from './Seller/SellerNotify';
import SellerAbout from './Seller/SellerAbout';
import SellerContact from './Seller/SellerContact';
import SellerProfile from './Seller/SellerProfile';
import Chat from './components/FarmerChat';
import FarmerChat from './components/FarmerChat';
import WorkerChat from './components/WorkerChat';

function App() {
  const [progress, setProgress] = useState(0)
  
  return (
    <>
    <AAState>
    <BrowserRouter>
    <LoadingBar
        color='#26ae61'
        progress={progress}
      />
      <Routes>
      
      {/* ======================= logout ======================  */}
        <Route exact path="/logout" element={<Logout  />}/>

      {/* ==============  worker's pages===== ============== */}
        <Route exact path="/workerhome" element={<Worker_Home setProgress={setProgress}  />}/>
        <Route exact path="/" element={<Index  />}/>
        <Route exact path="/login" element={<Login  />}/>
        <Route exact path="/signup" element={<Signup  />}/>
        <Route exact path="/workerjob" element={<WorkerJob setProgress={setProgress} />}/>
        <Route exact path="/workerabout" element={<WorkerAbout  />}/>
        <Route exact path="/workercontact" element={<WorkerContact setProgress={setProgress} />}/>
        <Route exact path="/workerprofile" element={<WorkerProfile  />}/>
        <Route exact path="/workerdetail" element={<WorkerDetail  />}/>
        <Route exact path="/workerjobapply" element={<Workerjobapply  />}/>
        {/* ==============  worker's pages end ============== */}


         {/* ==============  farmer's pages===== ============== */}
         <Route exact path="/farmerhome" element={<FarmerHome />} />
         <Route exact path="/farmernotify" element={<FarmerNotify />} />
         <Route exact path="/farmerabout" element={<FarmerAbout />} />
         <Route exact path="/farmercontact" element={<FarmerContact />} />
         <Route exact path="/farmercrop" element={<FarmerCrop />} />
         <Route exact path="/farmercropdetails" element={<FarmerCropDetails />} />
         <Route exact path="/farmerpostjob" element={<FarmerPostJob />} />
         <Route exact path="/farmerprofile" element={<FarmerProfile />} />
         <Route exact path="/farmercheckout" element={<FarmerCheckout />} />
         <Route exact path="/farmercropsell" element={<FarmerCropSell />} />
         <Route exact path="/farmerproduct" element={<FarmerProduct />} />
         <Route exact path="/fworkerdetail" element={<FworkerDetail />} />
         <Route exact path="/farmereqdetail" element={<FarmerEqDetail />} />

        {/* ==============  farmer's pages end ============== */}


         {/* ==============  Seller's pages===== ============== */}      
         <Route exact path="/sellerhome" element={<SellerHome />} />
         <Route exact path="/sellerproduct" element={<SellerProduct />} />
         <Route exact path="/sellerproductdetails" element={<SellerProductDetails />} />
         <Route exact path="/sellerproductupload" element={<SellerProductUpload />} />
         <Route exact path="/sellernotify" element={<SellerNotify />} />
         <Route exact path="/sellerabout" element={<SellerAbout />} />
         <Route exact path="/sellercontact" element={<SellerContact />} />
         <Route exact path="/sellerprofile" element={<SellerProfile />} />
         


         <Route exact path="/farmerchat" element={<FarmerChat />} />
         <Route exact path="/workerchat" element={<WorkerChat />} />

        {/* ==============  Seller's pages end ============== */}

      </Routes>
      

    </BrowserRouter>
    </AAState>
    </>
  );
}

export default App;
