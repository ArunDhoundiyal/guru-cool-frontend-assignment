import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Header from "../Header";
import { FaUserCircle, FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import "./index.css";

const PersonalDetailForm = () => {
  const [mailError, setMailError] = useState("");
  const [numberError, setNumberError] = useState("");

  const savedPersonalDetail = useMemo(
    () => JSON.parse(localStorage.getItem("userData")) || {},
    []
  );

  const [personalDetail, setPersonalDetail] = useState({
    name: savedPersonalDetail.username || "",
    email: savedPersonalDetail.userEmail || "",
    phoneNumber: savedPersonalDetail.userPhoneNumber || "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...savedPersonalDetail,
        username: personalDetail.name,
        userEmail: personalDetail.email,
        userPhoneNumber: personalDetail.phoneNumber,
      })
    );
  }, [personalDetail, savedPersonalDetail]);

  const onClickInput = (event) => {
    const { name, value } = event.target;
    setPersonalDetail({
      ...personalDetail,
      [name]: value,
    });
  };

  const onClickUserPersonalDetailForm = (event) => {
    event.preventDefault();
    const { name, email, phoneNumber } = personalDetail;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[0-9]{10}$/;

    let hasError = false;

    if (!emailRegex.test(email)) {
      setMailError("Invalid email format");
      hasError = true;
    } else {
      setMailError("");
    }

    if (!mobileRegex.test(phoneNumber)) {
      setNumberError("Invalid mobile number");
      hasError = true;
    } else {
      setNumberError("");
    }

    if (hasError) return;

    navigate("/address-form");
  };

  return (
    <div className="personalDetail-bg-container">
      <Header />
      <form
        className="personal-detail-form-container"
        onSubmit={onClickUserPersonalDetailForm}
      >
        <div className="form-style">
          <FaUserCircle className="style-icon" />
          <h1 className="top-heading-style">Personal Information</h1>
        </div>

        <div className="input-container">
          <label htmlFor="name">Username:</label>
          <div className="input-logo-container">
            <div className="icon-container">
              <FaUserAlt className="input-icon" />
            </div>
            <input
              placeholder="Username"
              type="text"
              id="name"
              name="name"
              value={personalDetail.name}
              onChange={onClickInput}
              required
            />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="email">
            Email: <span className="Error-msg">{mailError}</span>
          </label>
          <div className="input-logo-container">
            <div className="icon-container">
              <IoMdMail className="input-icon" />
            </div>

            <input
              placeholder="Email ID"
              type="text"
              id="email"
              name="email"
              value={personalDetail.email}
              onChange={onClickInput}
              required
            />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="phoneNumber">
            Phone number: <span className="Error-msg">{numberError}</span>
          </label>
          <div className="input-logo-container">
            <div className="icon-container">
              <FaPhoneAlt className="input-icon" />
            </div>
            <input
              placeholder="Phone Number"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={personalDetail.phoneNumber}
              onChange={onClickInput}
              required
            />
          </div>
        </div>
        <button className="nextButton" type="submit">
          Next
        </button>
      </form>
    </div>
  );
};

export default PersonalDetailForm;