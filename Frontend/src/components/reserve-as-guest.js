import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import validator from 'validator';
import RestaurantDataService from "../services/restaurant"


const RestaurantsList = props => {
  
  //variables to hold reservation
  const [resName, setResName ] = useState("");
  const [resPhone, setResPhone ] = useState("");
  const [resEmail, setResEmail ] = useState("");


  const [resDateTime, setResDateTime ] = useState("");
  const [resNumGuests, setResNumGuests ] = useState("");
  const [resTables, setResTables] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [traf, setTraf] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber ] = useState("");
  const [cardDate, setCardDate] = useState([]);

  const [emailError, setEmailError] = useState('');
  const [phonenumberError, setPhonenumberError] = useState('');
  const [creditcardError, setCreditcardError] = useState('');

  // setResNumGuests(props.location.state.numGuests);

  const setVariables = e => {
    setResNumGuests(props.location.state.numGuests);
    setResDateTime(props.location.state.resDT);
    setResTables(props.location.state.tabs);
    setTraf(props.location.state.traf);
  };
  
  const saveReservation = () => {
    
    var data = {
      name : resName,
	    phone : resPhone,
	    email : resEmail,
	    date : resDateTime,
	    num_guests : resNumGuests,
	    tables : resTables
    };
    
    RestaurantDataService.createReservation(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      };

  //tells react that app should do these after render
  useEffect(() => {
    setVariables();
  }, []);
  
  const onChangeName = e => {
    const resName = e.target.value;
    setResName(resName);
  };

  const onChangePhone = e => {
    const resPhone = e.target.value;
    setResPhone(resPhone);
  };

  const onChangeEmail = e => {
    const resEmail = e.target.value;
    setResEmail(resEmail);
  };

  const onChangeCardName = e => {
    const cardName = e.target.value;
    setCardName(cardName);
  };

  const onChangeCardNum = e => {
    const cardNumber = e.target.value;
    setCardNumber(cardNumber);
  };

  const onChangeCardDate = e => {
    const cardDate = e.target.value;
    setCardDate(cardDate);
  };

  const validateEmail = (e) => {
    var email = e.target.value

    if (validator.isEmail(email)) {
      setEmailError('')
    } else {
      setEmailError('Enter valid Email!')
    }
  }

  const validatePhoneNumber = (e) => {
    var phonenumber = e.target.value

    if (validator.isMobilePhone(phonenumber)) {
      setPhonenumberError('')
    } else {
      setPhonenumberError('Please enter a valid phone number')
    }
  }

  const validateCreditCard = (e) => {
    var creditcardnum = e.target.value

    if (validator.isCreditCard(creditcardnum)) {
      setCreditcardError('')
    } else {
      setCreditcardError('Please enter a valid credit card number')
    }
  }

  return (
    <div>
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/tables"} className="btn btn-success">
              Back to Table Search
            </Link>
          </div>
        ) : (
          <div>
            <div className="current-reservation">
              <h1>Make Reservation</h1>
            </div>

            <div className="display-group col-lg-4">
              <h5>Number of guests: {resNumGuests} </h5>
            </div>

            <div className="display-group col-lg-4">
              <h5>Reservation Date and Time: {resDateTime} </h5>
            </div>

            <div className="row">
              {resTables.map((table) => {
                return (
                  <div className="col-lg-4 pb-1">
                    
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Table {table.table_number}</h5>
                        <p className="card-text">
                          <strong>Number of Seats: </strong>{table.table_capacity}<br/>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="display-group col-lg-4">
              {/* <h5>Tables reserved: {props.location.state.tabs} </h5> */}
            </div>
      
            <div className="row pb-1">
              {/* 1st input box- name */}
              <div className="form-group"> 
                <label htlmFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={resName}
                  onChange={onChangeName}
                />
              </div>
              {/* 2nd input box - phone */}
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="text" className="form-control" id="Phone Number"
                  value={resPhone}
                  onChange={(e) => {
                    validatePhoneNumber(e)
                    onChangePhone(e)
                  }}></input>
                  <span style={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}>{phonenumberError}</span>
              </div>
              {/* 3rd input box - email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control"
                  value={resEmail}
                  onChange={(e) => {
                    validateEmail(e)
                    onChangeEmail(e)
                  }}></input>
                  <span style={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}>{emailError}</span>
              </div>
              <div>{traf ? (
                <div>
                  <div className="display-group col-lg-4">
                    <h5>Credit card info for high-traffic no show fee:</h5>
                  </div>

                  <div className="form-group">
                  <label htmlFor="name on card">Name on Card</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cardName}
                      onChange={onChangeCardName}
                    />
                  </div>
                  <div className="form-group">
                  <label htmlFor="cardnumber">Card Number</label>
                    <input type="number" className="form-control"
                      value={cardNumber}
                      onChange={(e) => {
                        validateCreditCard(e)
                        onChangeCardNum(e)
                      }}></input>
                      <span style={{
                        fontWeight: 'bold',
                        color: 'red',
                      }}>{creditcardError}</span>
                  </div>
                  <div className="form-group">
                  <label htmlFor="cardexpiration">Expiration Date</label>
                    <input
                      type="month"
                      className="form-control"
                      placeholder="Expiration date"
                      value={cardDate}
                      onChange={onChangeCardDate}
                    />
                  </div>
                </div>
                ):(
                  <p></p>
                )}
                </div>
              

                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={saveReservation}
                  >
                    Create Reservation
                  </button>
                </div>
            </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantsList;