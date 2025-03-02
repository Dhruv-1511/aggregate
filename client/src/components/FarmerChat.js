import Footer from './Footer'
import WorkerNav from './WorkerNav'
import React, { useState,useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import AAContext from '../context/AAContext';
import io from 'socket.io-client';
import FarmerNav from '../Farmer/FarmerNav';




const FarmerChat = () => {
    const socket = io('http://localhost:5001');
    const context = useContext(AAContext);
    const { getMyFriends, friends, getUserData, userData } = context;
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const host = process.env.REACT_APP_HOST;
    const [messages, setMessages] = useState([]);
    var i = 0;
    useEffect(() => {
        const socket = io('http://localhost:5001');
        socket.on('connect', () => console.log('Connected to server'));
        socket.on('disconnect', () => console.log('Disconnected from server'));
    
        socket.emit('getMessages');
        socket.emit('message-other', { message, victomId });
        // Listen for emitted messages from the server
        socket.on('messages', (messages) => {
        // Update the UI with the retrieved messages
            // console.log(messages)
            setMessages(messages)
        });
        
    
        return () => {
          socket.disconnect();
        };

        
    
      }, []);

      const [farmerD, setFarmerD] = useState([])
      
    useEffect(() => {
        getMyFriends();
        getUserData();
        // console.log(messages);
    }, [])

    const handleOnClick =async (id) =>{
          const response = await fetch(`${host}/farmerapi/getfarmerdetail/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem('token'), 
            },
          });
          const json = await response.json();
        //   console.log(json.farmer);
          setFarmerD(json.farmer[0]);
          setFarmerD([...farmerD, json.farmer[0]]);

        }

      const todayDate = getFormattedDate();
      function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;

        return month + "/" + day + "/" + year;
    }
    
    socket.on('message-room', function({room, content, sender, time, date}) {
        setMessages([...messages, {content: content, date: date, from: sender, to: room, time: time}]);
        // console.log(messages);
    });

    const submitMessage = (message, victomId) => {
        socket.emit('message-other', { message, victomId });
    };

      function handleSubmit(e) {
        e.preventDefault();
        if (!message) return;
        const today = new Date();
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const user = friends[0];
        const time = today.getHours() + ":" + minutes;
        const roomId = userData._id;
        // handleOnClick(friends[0].receivingid)
        // console.log(user.receivingid)
        // console.log(victomId);
        // console.log(roomId)
        // console.log(localStorage.getItem('user_id'))
        const socket = io('http://localhost:5001');
        socket.emit("message-room", victomId, message, roomId, time, todayDate);
        socket.emit('getMessages');

        // Listen for emitted messages from the server
        socket.on('messages', (messages) => {
        // Update the UI with the retrieved messages
            // console.log(messages)
            setMessages(messages)
        });
      
        setMessage("");
        submitMessage(message,victomId);
    }

   
    const [victomId, setVictomId] = useState('')
    const clickOnChat = (id)=>{
        // console.log(id)
        // console.log(userData._id)
        setVictomId(id);
    }

    // Function to convert time to minutes
    function getTimeInMinutes(time) {
        var parts = time.split(":");
        var hours = parseInt(parts[0]);
        var minutes = parseInt(parts[1]);
        return (hours * 60) + minutes;
    }
    

  return (
    <div>
        <FarmerNav />
        <div className="main-wrapper"  style={{backgroundColor: "rgb(238, 238, 238)"}}>
        <div className="container">
        <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
            <div className="row">
            <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0" style={{ 
    overflowY: "scroll",
    height: "100vh",
    padding: "20px",
    backgroundColor: "white"}}>
                <h5 className="font-weight-bold mb-3 text-center text-lg-start">
                Friends
                </h5>
                <div className="card" style={{border:"0px"}}>
                <div className="card-body">
                    <ul className="list-unstyled mb-0">
                    {friends ?  !friends.length == 0 && friends.map((e) => {
                        return (
                            <li
                        className="p-2 border-bottom"
                        style={{ backgroundColor: "#eee" }}
                        key={e._id}
                        onClick={()=>clickOnChat(e._id)}
                    >
                        <a href="#!" className="d-flex justify-content-between">
                        <div className="d-flex flex-row">
                            <img
                            src={"img/avatar/avatar-08.jpg" }
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                           
                            <div className="pt-1">
                            <p className="fw-bold mb-0">{e.name}</p>
                            <p className="small text-muted"> {e.occupation}</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-muted mb-1">Just now</p>
                            <span className="badge bg-danger float-end">1</span>
                        </div>
                        </a>
                    </li>
                        )
                    }) : "Not Found"}

                    


                    {/* <li className="p-2 border-bottom">
                        <a href="#!" className="d-flex justify-content-between">
                        <div className="d-flex flex-row">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                            <div className="pt-1">
                            <p className="fw-bold mb-0">Danny Smith</p>
                            <p className="small text-muted">Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-muted mb-1">5 mins ago</p>
                        </div>
                        </a>
                    </li>
                    <li className="p-2 border-bottom">
                        <a href="#!" className="d-flex justify-content-between">
                        <div className="d-flex flex-row">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                            <div className="pt-1">
                            <p className="fw-bold mb-0">Alex Steward</p>
                            <p className="small text-muted">Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-muted mb-1">Yesterday</p>
                        </div>
                        </a>
                    </li>
                    <li className="p-2 border-bottom">
                        <a href="#!" className="d-flex justify-content-between">
                        <div className="d-flex flex-row">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                            <div className="pt-1">
                            <p className="fw-bold mb-0">Ashley Olsen</p>
                            <p className="small text-muted">Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-muted mb-1">Yesterday</p>
                        </div>
                        </a>
                    </li>
                    <li className="p-2 border-bottom">
                        <a href="#!" className="d-flex justify-content-between">
                        <div className="d-flex flex-row">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                            <div className="pt-1">
                            <p className="fw-bold mb-0">Kate Moss</p>
                            <p className="small text-muted">Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-muted mb-1">Yesterday</p>
                        </div>
                        </a>
                    </li>
                    <li className="p-2 border-bottom">
                        <a href="#!" className="d-flex justify-content-between">
                        <div className="d-flex flex-row">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                            <div className="pt-1">
                            <p className="fw-bold mb-0">Lara Croft</p>
                            <p className="small text-muted">Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-muted mb-1">Yesterday</p>
                        </div>
                        </a>
                    </li> */}
                    {/* <li className="p-2">
                        <a href="#!" className="d-flex justify-content-between">
                        <div className="d-flex flex-row">
                            <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width={60}
                            />
                            <div className="pt-1">
                            <p className="fw-bold mb-0">Brad Pitt</p>
                            <p className="small text-muted">Lorem ipsum dolor sit.</p>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="small text-muted mb-1">5 mins ago</p>
                            <span className="text-muted float-end">
                            <i className="fas fa-check" aria-hidden="true" />
                            </span>
                        </div>
                        </a>
                    </li> */}
                    </ul>
                </div>
                </div>
            </div>
            <div className="col-md-6 col-lg-7 col-xl-8"  style={{ 
    overflowY: "scroll",
    height: "100vh",
    padding: "10px",
    backgroundColor: "white"}} >
                <ul className="list-unstyled">
                {messages && 
                    messages.filter((item) => item.from == userData._id && item.to == victomId || item.to == userData._id && item.from == victomId ).sort(function(a,b){
                        return a.time - b.time;
                    }).map((e) => {
                        {/* || item.to == userData._id && item.from == victomId */}
                    return (
                        <li key={e._id} className="d-flex justify-content-between mb-4">
                    <div className="card w-100">
                    <div className="card-header d-flex justify-content-between p-3">
                        <p className="fw-bold mb-0">{e.from == userData._id ? userData.name : friends[0].name}</p>
                        {/* <p className="fw-bold mb-0">{userData.name}</p> */}
                        <p className="text-muted small mb-0">
                        <i className="far fa-clock" /> {e.time}
                        </p>
                    </div>
                    <div className="card-body">
                        <p className="mb-0">
                        {e.content}
                        </p>
                    </div>
                    </div>
                    <img
                    // first worker default image and second farmer default image
                    src={e.from == userData._id ? userData.profile_picture ? userData.profile_picture : "img/avatar/user.png" :"img/avatar/user.png"}
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                    width={60}
                    />
                </li>
                    )
                })}
                
                {/* {messages && 
                    messages.filter((item) => item.to == userData._id && item.from == victomId ).map((e) => {
                    return (
                <li className="d-flex justify-content-between mb-4">
                    <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width={60}
                    />
                    <div className="card w-100">
                    <div className="card-header d-flex justify-content-between p-3">
                        <p className="fw-bold mb-0">{friends[0].name}</p>
                        <p className="text-muted small mb-0">
                        <i className="far fa-clock" /> {e.time}
                        </p>
                    </div>
                    <div className="card-body">
                        <p className="mb-0">
                        {e.content}
                        </p>
                    </div>
                    </div>
                </li>
                    )
                    })} */}

                {victomId ?
                <>
                <li className="bg-white mb-3" style={{    position: "sticky",
                    bottom: "-10px",
                    left: "0"}}>
                    <div className="form-outline" style={{display: "flex",
    flexWrap: "wrap",
    alignTtems: "center",
    justifyContent: "space-between"}}>
                    <textarea
                        className="form-control"
                        id="textAreaExample2"
                        rows={4}
                        defaultValue={""}
                        name="message"
                        placeHolder="message"
                        value={message} onChange={(e) => setMessage(e.target.value)}

                        style={{width: "80%"}}
                    />
                   <button type="submit" onClick={handleSubmit} className="btn btn-info btn-rounded float-end"  style={{
    background: "green",
    color: "white",
    borderRadius: "6px",
    padding: "10px 30px 10px 30px"
}}>
                    Send
                </button>
                    </div>
                </li>
               
                


                </>
                :"" }
                </ul>
            </div>
            </div>
        </div>
        </section>
        </div>
        </div>

        <Footer />
    </div>
  )
}

export default FarmerChat