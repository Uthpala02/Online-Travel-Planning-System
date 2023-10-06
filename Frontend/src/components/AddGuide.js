import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALhmZhri9C9L26kjZt0QMUhJabw_lU2a8",
  authDomain: "itp-y1-s1.firebaseapp.com",
  projectId: "itp-y1-s1",
  storageBucket: "itp-y1-s1.appspot.com",
  messagingSenderId: "929050199677",
  appId: "1:929050199677:web:dd92a72ef0451e33629314",
  measurementId: "G-3ZEL6DVX02",
};

initializeApp(firebaseConfig);

export default function AddGuide() {
  const mystyle = { backgroundColor: "#FAFAFA" };
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    languages: "",
    availability: "",
  });

  const [Guide, setGuide] = useState({
    image: "",
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    languages: "",
    availability: "",
  });

  const handleChangeText = (name, e) => {
    setGuide({ ...Guide, [name]: e.target.value });
  };

  //Validation part
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!Guide.name || !Guide.name.match(/^[A-Za-z\s]+$/)) {
      errors.name = "Please enter a valid name";
      isValid = false;
    }

    if (!Guide.age || isNaN(Guide.age) || Guide.age < 1 || Guide.age > 100) {
      errors.age = "Please enter a valid age";
      isValid = false;
    }

    if (!Guide.gender) {
      errors.gender = "Please select a gender";
      isValid = false;
    }

    if (
      !Guide.email ||
      !Guide.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    ) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!Guide.phone || !Guide.phone.match(/^\d{10}$/)) {
      errors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    if (!Guide.languages) {
      errors.languages = "Please enter languages";
      isValid = false;
    }

    if (!Guide.availability) {
      errors.availability = "Please select availability";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `images/${uuidv4()}_${selectedFile.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            try {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("File uploaded successfully");
              setImageUrl(downloadUrl);

              const newGuide = {
                image: downloadUrl,
                name: Guide.name,
                age: Guide.age,
                gender: Guide.gender,
                email: Guide.email,
                phone: Guide.phone,
                languages: Guide.languages,
                availability: Guide.availability,
              };

              await axios.post("http://localhost:8070/guide/add", newGuide);
              navigate("/viewGuide");
              Swal.fire({
                icon: "success",
                text: "Guide has been successfully added",
                showConfirmButton: false,
                timer: 2000,
              });
              console.log(newGuide);
              console.log("sendData completed successfully");
            } catch (error) {
              console.log("Error in sendData:", error);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
      <div>
        <div className="container p-5">
          <div className="row">
            <div
              className="card col-md-6 offset-md-3 offset-md-3"
              style={mystyle}
            >
              <div className="row">
                <div
                  className="col"
                  style={{
                    fontSize: 30,
                    fontWeight: 500,
                    paddingLeft: 50,
                    display: "block",
                    marginTop: 15,
                    marginBottom: 15,
                    color: "#90A4AE",
                  }}
                >
                  ADD GUIDE.
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleUpload}>
                  <div className="row form-group pb-4">
                    <div className="col-lg-3 col-md-5">
                      <label> Image: </label>
                    </div>
                    <div className="col-lg-9 col-md-7">
                      <input
                        type="file"
                        className="form-control"
                        required
                        title="You must have to enter image"
                        // value={subject}

                        onChange={handleFileChange}
                      />
                      {previewUrl && (
                        <img
                          src={previewUrl}
                          alt="something"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      )}
                      {/* <button onClick={handleSubmit}>Upload</button>
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt="something"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      )} */}
                    </div>
                  </div>

                  <div className="row form-group pb-4">
                    <div className="col-lg-3 col-md-5">
                      <label> Name: </label>
                    </div>
                    <div className="col-lg-9 col-md-7">
                      <input
                        placeholder="Enter Name"
                        name="name"
                        className={`form-control ${
                          formErrors.name ? "is-invalid" : ""
                        }`}
                        title="You must have to enter name"
                        //value={subject}
                        onChange={(val) => handleChangeText("name", val)}
                      />
                      {formErrors.name && (
                        <div className="invalid-feedback">
                          {formErrors.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row form-group pb-4">
                    <div className="col-lg-3 col-md-5">
                      <label> Age: </label>
                    </div>
                    <div className="col-lg-9 col-md-7">
                      <input
                        placeholder="Enter Age"
                        name="age"
                        className={`form-control ${
                          formErrors.age ? "is-invalid" : ""
                        }`}
                        title="You must have to enter ag"
                        //value={topic}
                        onChange={(val) => handleChangeText("age", val)}
                      />
                      {formErrors.age && (
                        <div className="invalid-feedback">{formErrors.age}</div>
                      )}
                    </div>
                  </div>

                  <div className="row form-group pb-4">
                    <div className="col-lg-3 col-md-5">
                      <label> Gender: </label>
                    </div>
                    <div className="col-lg-9 col-md-7">
                      <select
                        name="gender"
                        className={`form-control ${
                          formErrors.gender ? "is-invalid" : ""
                        }`}
                        //value={gender}
                        onChange={(val) => handleChangeText("gender", val)}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {formErrors.gender && (
                        <div className="invalid-feedback">
                          {formErrors.gender}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row form-group pb-4">
                    <div className="col-lg-3 col-md-5">
                      <label> Email address: </label>
                    </div>
                    <div className="col-lg-9 col-md-7">
                      <input
                        placeholder="Email address"
                        name="Email"
                        className={`form-control ${
                          formErrors.email ? "is-invalid" : ""
                        }`}
                        type="email"
                        title="You must have to enter Email"
                        //value={meeting_link}
                        onChange={(val) => handleChangeText("email", val)}
                      />
                      {formErrors.email && (
                        <div className="invalid-feedback">
                          {formErrors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row form-group pb-4">
                    <div className="col-lg-3 col-md-5">
                      <label> Phone: </label>
                    </div>
                    <div className="col-lg-9 col-md-7">
                      <input
                        placeholder="Enter Phone"
                        name="Phone"
                        className={`form-control ${
                          formErrors.phone ? "is-invalid" : ""
                        }`}
                        title="You must have to enter Phone"
                        //value={discription}
                        onChange={(val) => handleChangeText("phone", val)}
                      />
                      {formErrors.phone && (
                        <div className="invalid-feedback">
                          {formErrors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row form-group pb-4">
                    <div className="col-lg-3 col-md-5">
                      <label> Languages: </label>
                    </div>
                    <div className="col-lg-9 col-md-7">
                      <input
                        placeholder="Enter Languages"
                        name="Languages"
                        className={`form-control ${
                          formErrors.languages ? "is-invalid" : ""
                        }`}
                        title="You must have to enter Languages"
                        //value={discription}
                        onChange={(val) => handleChangeText("languages", val)}
                      />
                      {formErrors.languages && (
                        <div className="invalid-feedback">
                          {formErrors.languages}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row form-group pb-4">
                    <div className="col-lg-3 col-md-5">
                      <label> Availability: </label>
                    </div>
                    <div className="col-lg-9 col-md-7">
                      <select
                        name="availability"
                        className={`form-control ${
                          formErrors.availability ? "is-invalid" : ""
                        }`}
                        //value={gender}
                        onChange={(val) =>
                          handleChangeText("availability", val)
                        }
                      >
                        <option value="">Select availability</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                      {formErrors.availability && (
                        <div className="invalid-feedback">
                          {formErrors.availability}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      name="submit_btn"
                    >
                      Submit
                    </button>

                    <button
                      className="btn btn-danger"
                      name="delete button"
                      style={{ marginLeft: "10px" }}
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
