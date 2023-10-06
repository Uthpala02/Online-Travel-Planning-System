import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../GuideView.css";
import Swal from "sweetalert2";
import Badge from "react-bootstrap/Badge";
import { useNavigate, useParams, Link } from "react-router-dom";
import print from "print-js";
import axios from "axios";
import TypingBroImage from "../../images/travel-concept-with-landmark_01.jpg";
import UserHeader from "../UserHeader";


export default function GuideClient() {
  const [GetGuideList, setGetGuideList] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getDuides = () => {
      axios.get("http://localhost:8070/guide").then((res) => {
        setGetGuideList(res.data);
        console.log(res.data);
      });
    };
    getDuides();
  }, []);

  const CardView = ({
    id,
    image,
    name,
    gender,
    email,
    phone,
    languages,
    age,
    availability,
  }) => {
    const [show, setShow] = useState(false);
    return (
      <div>
        {/* <UserHeader/> */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="Modal-image">
              <img src={image} alt="Story" />
            </div>
            <Modal.Body>
              <div className="Modal-author">{name}</div>
              <div className="Modal-timestamp">
                <strong>Age : </strong>
                {age}
              </div>
              <div className="Modal-timestamp">
                <strong>Gender : </strong>
                {gender}
              </div>
              <div className="Modal-timestamp">
                <strong>Email Address : </strong>
                {email}
              </div>
              <div className="Modal-timestamp">
                <strong>Phone Number : </strong>
                {phone}
              </div>
              <div className="Modal-timestamp">
                <strong>Language : </strong>
                {languages}
              </div>
              <div className="Modal-timestamp">
                <strong>Availability : </strong>
                {availability}
              </div>
            </Modal.Body>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => navigate(`/RequestGuide/${email}`)}
            >
              Request
            </Button>
          </Modal.Footer>
        </Modal>
        <div
          style={{
            background: "rgb(223,242,255)",
            background:
              "linear-gradient(315deg, rgba(223,242,255,1) 0%, rgba(33,150,243,1) 100%)",
          }}
          className="story card col-6 mx-auto m-3"
          onClick={() => setShow(true)}
        >
          <div className="card-body d-flex">
            <img
              style={{ height: 130, width: 130 }}
              className="card-img-top mr-3 "
              src={image}
              alt="Profile"
            />
            <div style={{ paddingLeft: 20 }}>
              <h5 className="card-title">{name}</h5>

              <p className="card-title">
                <strong>Gender:</strong> {gender}
              </p>
              <p className="card-title">
                <strong>Spoken Language:</strong> {languages}
              </p>
              <Badge bg="light" text="dark">
                <strong>{availability}</strong>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
       <UserHeader/>
      <img
        style={{
          height: 300,
          width: "100%",
        }}
        src={TypingBroImage}
      />

      <div className="col-3 m-3">
        <input
          style={{ backgroundColor: "#BBDEFB", border: "solid" }}
          type="text"
          placeholder="search"
          className="form-control col-6 mx-auto"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {GetGuideList.filter((val) => {
        if (search === "") {
          return val;
        } else if (
          // val.name
          //   .toLowerCase()
          //   .includes(search.toLowerCase()) ||
          // val.role
          //   .toLowerCase()
          //   .includes(search.toLowerCase()) ||
          // val.lastName
          //   .toLowerCase()
          //   .includes(search.toLowerCase()) ||
          val.name.toLowerCase().includes(search.toLowerCase())
        ) {
          console.log(val);
          return val;
        }
        return 0;
      }).map((row) => (
        <CardView
          key={row._id} // Add a unique key for each CardView component
          image={row.image}
          id={row._id}
          name={row.name}
          gender={row.gender}
          email={row.email}
          phone={row.phone}
          age={row.age}
          availability={row.availability}
          languages={row.languages}
        />
      ))}
    </div>
  );
}
