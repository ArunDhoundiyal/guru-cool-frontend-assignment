import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header";
import { TiTick } from "react-icons/ti";
import "./index.css";

const ConfirmationForm = () => {
  const [submit, setSubmit] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const getUserData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (getUserData) {
      setStepTwo(true);
    }
  }, [getUserData]);

  const {
    address = "",
    city = "",
    state = "",
    userEmail = "",
    userPhoneNumber = "",
    username = "",
    zipCode = "",
  } = getUserData || {};

  const onClickSubmitButton = () => {
    setStepThree(true);
    setSubmit(true);
    setTimeout(() => {
      setSubmit(false);
    }, 2000);
  };

  if (!getUserData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="confirmation-form-bg-container">
      <Header stepTwo={stepTwo} stepThree={stepThree} />
      {submit ? (
        <>
          <TiTick className="right-arrow" />
          <h1 className="submit-detail-msg">
            Thank you for submitting your details
          </h1>
        </>
      ) : (
        <>
          <h1 className="confirmation-heading"> Confirmation</h1>
          <h2>
            <span className="step">Step 1: </span> Personal Information
          </h2>
          <p>
            Name: <span className="userDetail">{username}</span>
          </p>
          <p>
            Email: <span className="userDetail">{userEmail}</span>
          </p>
          <p>
            Phone number: <span className="userDetail">{userPhoneNumber}</span>
          </p>
          <h2>
            <span className="step">Step 2: </span> Address Information
          </h2>
          <p>
            Address: <span className="userDetail">{address}</span>
          </p>
          <p>
            City: <span className="userDetail">{city}</span>
          </p>
          <p>
            State: <span className="userDetail">{state}</span>
          </p>
          <p>
            Zip Code: <span className="userDetail">{zipCode}</span>
          </p>
        </>
      )}
      <button
        type="button"
        className="submit-button"
        onClick={onClickSubmitButton}
        disabled={submit}
      >
        {submit ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default ConfirmationForm;