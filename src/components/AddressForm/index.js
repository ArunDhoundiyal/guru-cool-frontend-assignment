import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Header from "../Header";
import { FaAddressBook } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa6";
import { FaCity } from "react-icons/fa6";
import { TbBuildingEstate } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import "./index.css";

const AddressForm = () => {
  const [zipCodeError, setZipCodeError] = useState("");
  const savedAddressDetail = useMemo(
    () => JSON.parse(localStorage.getItem("userData")) || {},
    []
  );

  const [addressDetail, setAddressDetail] = useState({
    address: savedAddressDetail.address || "",
    city: savedAddressDetail.city || "",
    state: savedAddressDetail.state || "",
    zipCode: savedAddressDetail.zipCode || "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...savedAddressDetail,
        ...addressDetail,
      })
    );
  }, [addressDetail, savedAddressDetail]);

  const onClickInput = (event) => {
    const { name, value } = event.target;
    setAddressDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onClickAddressDetailForm = (event) => {
    event.preventDefault();
    const zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;

    if (!zipCodePattern.test(addressDetail.zipCode)) {
      setZipCodeError("Invalid Zip Code");
      return;
    }

    setZipCodeError("");
    navigate("/confirmation-form");
  };

  const onClickBackButton = () => {
    navigate("/");
  };

  const getUserFormData = JSON.parse(localStorage.getItem("userData"));

  if (!getUserFormData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="personalDetail-bg-container">
      <Header />
      <form
        className="personal-detail-form-container"
        onSubmit={onClickAddressDetailForm}
      >
        <div className="form-style">
          <FaAddressBook className="style-icon" />
          <h1 className="top-heading-style">Address Information</h1>
        </div>

        <div className="input-container">
          <label htmlFor="address">Address:</label>
          <div className="input-logo-container">
            <div className="icon-container">
              <FaAddressCard className="input-icon" />
            </div>
            <input
              placeholder="Address"
              type="text"
              id="address"
              name="address"
              value={addressDetail.address}
              onChange={onClickInput}
              required
            />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="city">City:</label>
          <div className="input-logo-container">
            <div className="icon-container">
              <FaCity className="input-icon" />
            </div>

            <input
              placeholder="City"
              type="text"
              id="city"
              name="city"
              value={addressDetail.city}
              onChange={onClickInput}
              required
            />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="state">State:</label>
          <div className="input-logo-container">
            <div className="icon-container">
              <TbBuildingEstate className="input-icon" />
            </div>
            <input
              placeholder="State"
              type="text"
              id="state"
              name="state"
              value={addressDetail.state}
              onChange={onClickInput}
              required
            />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="zipCode">
            Zip Code:<span className="zipError-msg">{zipCodeError}</span>
          </label>
          <div className="input-logo-container">
            <div className="icon-container">
              <FaLocationDot className="input-icon" />
            </div>

            <input
              placeholder="Zip Code"
              type="text"
              id="zipCode"
              name="zipCode"
              value={addressDetail.zipCode}
              onChange={onClickInput}
              required
            />
          </div>
        </div>
        <div className="button-container">
          <button
            className="previous-button"
            type="button"
            onClick={onClickBackButton}
          >
            Back
          </button>
          <button className="next-button" type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;