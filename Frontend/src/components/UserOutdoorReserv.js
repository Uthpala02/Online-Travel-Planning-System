import React, { useState, useEffect } from "react"
import axios from "axios";
import { Link, useParams } from "react-router-dom"
import "./ViewAdvertisers.css"
import "./AdvertiserProfile.css"; 
import UserSideBar from "./UserSideBar";
import destination from "../img/destination.jpg";
import Swal from "sweetalert2";

export default function UserOutdoorReserv() {

    const useroutdoorreservId  = sessionStorage.getItem('userId');
    const [useroutdoorreserv, setUserOutdoorReserv] = useState([]);

    const deleteUserOutdoorReserv = async (id) => {
        try {
          await axios.delete(`http://localhost:8070/ResAdvenAct/delete/${id}`);
          Swal.fire({
            icon: 'success',
            title: 'Delete Reserve',
            showConfirmButton: true,
            confirmButtonText: 'OK',
        }) 
         // alert('Data deleted successfully');
          .then(() => {window.location.reload(); 
          });//data deleted after that page will refresh automatically
        } catch (error) {
          alert('Error deleting data', error);
          console.log(error);
          
        }
      };


    useEffect(() => {
        
        // function getUserOutdoorReserv() {
        //    const res = axios.get(`http://localhost:8070/ResAdvenAct/getevent/${useroutdoorreservId}`).then((res) => {
        //     setUserOutdoorReserv([res.data]);
        //     console.log(res.data)
        // }).catch((err) => {
        //     alert(err.message);
        // })

        // }

        const getUserOutdoorReserv = async () => {
            const res = await axios.get(`http://localhost:8070/ResAdvenAct/getevent/${useroutdoorreservId}`);
            setUserOutdoorReserv(res.data);
            console.log(res.data);
          };
        getUserOutdoorReserv();

    }, [useroutdoorreservId])

  return (


    <div>
    <div className="hotelAppr-bg" style={{ backgroundColor: "#e6e6ee",position:"absolute" }}>
<UserSideBar/>
<div className="hotelAppr-cont">
<div className="divimgresroom">
       <img src={destination} className="imgupresroom"/>
       <div className="upresroom-cont1">
           <p>Reserved</p>
       </div>
       <div className="upresroom-cont2">
           <p>Adventure Activity</p>
       </div>
</div>
 <table>
   <thead>
     <tr>
       <th className="hotel-app-tabel-th">First Name</th>
       <th className="hotel-app-tabel-th">Last Name</th>
       <th className="hotel-app-tabel-th">Email</th>
       <th className="hotel-app-tabel-th">Address</th>
       <th className="hotel-app-tabel-th"></th>
     </tr>
   </thead>
   <tbody>
   {useroutdoorreserv.map((user) => (
       <tr key={user._id}>
         <td>{user.fname}</td>
         <td>{user.fname}</td>
         <td>{user.email}</td>
         <td>{user.address}</td>
         <td>
             <button className="btn-delete-hotel"onClick={() =>deleteUserOutdoorReserv(user._id)}>
               Delete1
             </button>
         </td>
       </tr>
   ))}
   </tbody>
             </table>
     </div>
 </div>
</div>
    )

}