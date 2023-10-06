import emailjs from "emailjs-com";
import Modal from "react-bootstrap/Modal";
import useState from "react";

import Swal from "sweetalert2";
import { useNavigate, useParams, Link } from "react-router-dom";

const RequestGuide = () => {
  const { email } = useParams();
  // const open = useState(true);

  const navigate = useNavigate();

  function sendemail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_n2yu2be",
        "template_bsbw567",
        e.target,
        "OTkFOthfIxpNEJUYn"
      )
      .then((res) => {
        console.log(res);
      });

    navigate("/GuideClient");
    Swal.fire({
      icon: "success",
      text: "Email has been successfully sended",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  const cancel = () => {
    navigate("/GuideClient");
  };

  return (
    <div style={{ marginBottom: "100px" }}>
      <br></br>
      <div>
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3>Send Request to Guide</h3>

            <div className="card-body">
              <form onSubmit={sendemail}>
                <div className="form-group">
                  <label> Guide Email: </label>
                  <input
                    name="email"
                    // type="text"
                    className="form-control"
                    value={email}
                    plaintext
                    readOnly
                  />
                  <p className="text-muted" style={{ fontSize: 13 }}>
                    You can not change this email because is is guide's email
                    address.
                  </p>
                </div>

                <div className="form-group">
                  <label> Date: </label>
                  <input type="date" name="date" className="form-control" />
                </div>

                <div className="form-group">
                  <label> Name: </label>

                  <input type="text" name="name" className="form-control" />
                </div>

                <div className="form-group">
                  <label> Message: </label>

                  <textarea class="form-control" name="message" rows="3" />
                </div>

                <div>
                  <button className="btn btn-success">Submit</button>
                  <button
                    className="btn btn-danger"
                    onClick={cancel}
                    style={{ marginLeft: "10px" }}
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
  );
};

export default RequestGuide;
