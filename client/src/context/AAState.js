import AAContext from "./AAContext";
import { useState } from "react";


const AAState = (props)=>{
    const host = process.env.REACT_APP_HOST;

    const [userData, setUserData] = useState({});
    const [reviewData, setReviewData] = useState({});
    const [topWorkerData, setTopWorkerData] = useState([])
    const [topReview, setTopReview] = useState([])

    const getUserData = async()=>{
        const response = await fetch(`${host}/api/getuser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            }
        })
        const json = await response.json();
        setUserData(json); 
    }

    const updateUser = async({name,address,occupation,gender,work_hour,age, profile_picture, about})=>{
        const response = await fetch(`${host}/api/updateuser`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({name,address,occupation,gender,work_hour,age, profile_picture, about})
        })

        const json = await response.json();
        setUserData(json)
    }
    


    const getTopUser = async()=>{
        const response = await fetch(`${host}/workerapi/gettopworker`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem('token'), 
            },
        });

        const json = await response.json();
        setTopWorkerData(json)
    }

    const sendReview = async({name, email, subject, description, rating})=>{
        const response = await fetch(`${host}/workerapi/gettopworker`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem('token'), 
            },
            body: JSON.stringify({name, email, subject, description, rating})
        });

        const json = await response.json();
    }

    const getTopReview = async()=>{
        const response = await fetch(`${host}/review/retrive`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem('token'), 
            },
        });

        const json = await response.json();
        setTopReview(json.review)
    }

    const [requestStatus, SetRequestStatus] = useState({})
    
    const getRequestStatus = async()=>{
        const w_id = localStorage.getItem('w_id');
        const user_id = localStorage.getItem("user_id");
        const response = await fetch(`${host}/request/getstatus`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem('token'), 
            },
            body: JSON.stringify({ sendingid: user_id, receivingid :w_id, })
        });

        const json = await response.json();
        SetRequestStatus(json.request[0]);
    }
    const [friends, SetFriends] = useState({})
    
    const getMyFriends = async()=>{
        const response = await fetch(`${host}/request/getfriends`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem('token'), 
            },
        });

        const json = await response.json();
        console.log(json)
        SetFriends(json.myArray);
    }
    const [frequestStatus, setFrequestStatus] = useState({})
    
    const getFRequestStatus = async(id)=>{
        const user_id = localStorage.getItem("user_id");
        const response = await fetch(`${host}/request/getstatus`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem('token'), 
            },
            body: JSON.stringify({ sendingid: user_id, receivingid :id, })
        });

        const json = await response.json();
        setFrequestStatus(json.request[0]);
    }

    const [allFarmerRequest, setAllFarmerRequest] = useState([])
    const getAllFarmerRequest = async(id)=>{
        const response = await fetch(`${host}/farmerapi/getalljob`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem('token'), 
            },
            body: JSON.stringify({myid: id, status: "pending"})
        })
        const json = await response.json();
        setAllFarmerRequest(json.request);
    }
    
    const [allequipment, setAllequipment] = useState([])
    const getAllequipment = async()=>{
        const response = await fetch(`${host}/sellerapi/getequipment`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem('token'), 
            },
        })
        const json = await response.json();
        console.log(json.equipment)
        setAllequipment(json.equipment);
    }
    
    const [allcrops, setAllCrops] = useState([])
    const getAllCrops = async()=>{
        const response = await fetch(`${host}/farmerapi/getallcrop`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem('token'), 
            },
            body: JSON.stringify({myid: localStorage.getItem('user_id')})
        })
        const json = await response.json();
        console.log(json.crop)
        setAllCrops(json.crop);
    }
    
    const [myequipment, setMyequipment] = useState([])
    const getMyequipment = async()=>{
        const response = await fetch(`${host}/sellerapi/getequipmentbyid`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem('token'), 
            },
        })
        const json = await response.json();
        setMyequipment(json.equipment);
    }
    
    
    
    const [myorder, setMyOrder] = useState([])
    const getMyOrder = async()=>{
        const response = await fetch(`${host}/sellerapi/getmyorder`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-Token": localStorage.getItem('token'), 
            },
        })
        const json = await response.json();
        setMyOrder(json.order);
    }
    
    


    return (
        <AAContext.Provider value={{userData, getUserData, updateUser, getTopUser, topWorkerData, sendReview, getTopReview, topReview, getRequestStatus, requestStatus, getFRequestStatus, frequestStatus, getAllFarmerRequest, allFarmerRequest, getAllequipment, allequipment, getAllCrops, allcrops, getMyequipment, myequipment, getMyOrder, myorder, getMyFriends, friends}}>
            {props.children}
        </AAContext.Provider>
    )
}

export default AAState;