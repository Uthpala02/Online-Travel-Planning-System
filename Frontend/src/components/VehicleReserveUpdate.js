import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import "./VehicleReserveUpdate.css";



export default function VehicleReserve(){

    
    const{id}=useParams();
    
   const [firstName,setFirstName]=useState("");
   const [lastName,setLastName]=useState("");
   const [mobile,setMobile]=useState("");
   const [email,setEmail]=useState("");
   
   
   useEffect(() =>{

    
        axios.get(`http://localhost:8070/vehicleReserve/get/${id}`).then((response)=> {
           
            const insurance = response.data;
            setFirstName(insurance.firstName);
            setLastName(insurance.lastName);
            setMobile(insurance.mobile);
            setEmail(insurance.email);
            console.log(response.data);
          });
        }, [id]);
  

const handleSubmit = (e) =>{

    e.preventDefault();
    const updateVehReserve = {
        firstName,
        lastName,
        mobile,
        email,
    };
    
        axios
            .put(`http://localhost:8070/vehicleReserve/update/${id}`, updateVehReserve)
            .then((response) => {
            console.log(response.data);
            alert("Successfully updated")
            // show success message or redirect to another page
            })
            .catch((error) => {
            console.log(error);
            // show error message
            });
};


    return(
        
        <div className = "up-body">
        <p className="up-body-p1">Update Reservation</p>
        <form onSubmit={handleSubmit}>
            <div className = "form-vh-upt">
                
                <p id = "veh-reg-text333">First Name:  
                    <input type = "textbox" className = "veh-reg-fffname" value={firstName}
                    onChange={(e)=>{
                        setFirstName(e.target.value);
                    }}/>
                </p>

                <p id = "veh-reg-text444">Last Name:  
                    <input type = "textbox" className = "veh-reg-lllname" value={lastName}
                    onChange={(e)=>{
                        setLastName(e.target.value);
                    }}/>
                </p>

                <p id = "veh-reg-text555">Mobile:  
                    <input type = "textbox" className = "veh-reg-mmmobile" value={mobile}
                    onChange={(e)=>{
                        setMobile(e.target.value);
                    }}/>
                </p>

                <p id = "veh-reg-text666">Email:  
                    <input type = "textbox" className = "veh-reg-eeemail" value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}/>
                </p>

                <button className = "btn" id = "btn22">Update</button>
            </div>
        </form>
        </div>
        
        
    )
}