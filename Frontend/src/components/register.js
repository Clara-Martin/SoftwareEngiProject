import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import validator from 'validator';
import RestaurantDataService from "../services/restaurant"

const Register = props => {
    
    const initialUserState = {
        name: "",
        password: "",
        phone: "",
        email: "",
        mailingaddress: "",
        billingaddress: "",
        billingtoggle: "",
        PreferredNumber: "",
        Points: "",
        PreferredPayment: "",
      };
    
      const [user, setUser] = useState(initialUserState);
      const [emailError, setEmailError] = useState('');
      const [passwordError, setPasswordError] = useState('');
      const [phonenumberError, setPhonenumberError] = useState('');
      const [submitted, setSubmitted] = useState(false);
      const [oldAddr, setOldAddr] = useState(false);

      const validateEmail = (e) => {
        var email = e.target.value

        if (validator.isEmail(email)) {
        setEmailError('Valid Email :)')
        } else {
        setEmailError('Enter valid Email!')
      }
      
      }

      const validatePassword = (e) => {
        var password = e.target.value

        if (validator.isStrongPassword(password)) {
        setPasswordError('Strong Password :)')
        } else {
        setPasswordError('Password must be at least 8 characters containing at least 1 Uppercase, 1 symbol, and 1 number.')
      }
      
      }

      const validatePhoneNumber = (e) => {
        var phonenumber = e.target.value

        if (validator.isMobilePhone(phonenumber)) {
          setPhonenumberError('Valid Phone Number')
        } else {
          setPhonenumberError('Please enter a valid phone number')
        }
      }

     

      const sameAddress = e => {
        if (e.target.checked) {
          setOldAddr(user.billingaddress);
          setUser({ ...user, billingaddress: user.mailingaddress})
        }
        else {
          setUser({ ...user, billingaddress: oldAddr})
        }
      };
    
      const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
      };
    
      const login = () => {
        // props.login(user)
        registerUser();
        //props.history.push('/'); //update url - go to homepage
      };
    
      const registerUser = () => {
        var data = {
          user: user.name,
          password: user.password,
          phone: user.phone,
          email: user.email,
          mailing_addr: user.mailingaddress,
          billing_addr: user.billingaddress,
          preferred_number: user.PreferredNumber,
          preferred_payment: user.PreferredPayment,
        };

        RestaurantDataService.createUser(data)
          .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      };
    
    
    
    return (
        <div className="submit-form">
          {submitted ? (
          <div>
            <h4>You have registered successfully!</h4>
            <Link to={"/tables"} className="btn btn-success">
              Return to Home
            </Link>
          </div>
        ) : (
          <div>
          <div>
            <p>{user.email}</p>
            <div className="form-group">
              <label htmlFor="user">Username</label>
              <input
                type="username"
                className="form-control"
                id="name"
                required
                maxLength={12}
                minLength={4}
                value={user.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={user.password}
                onChange={(e) => {
                  validatePassword(e)
                  handleInputChange(e)
                  }}
                name="password"
              /> <span style={{
                fontWeight: 'bold',
                color: 'red',
                }}>{passwordError}</span>
            </div>
    
            <div className="form-group" >
              <label htmlFor="phone">Phone</label><input type="number" className="form-control" id="phone"
                onChange={(e) => {
                  validatePhoneNumber(e)
                  handleInputChange(e)
                }}></input>
                <span style={{
                  fontWeight: 'bold',
                  color: 'red',
                }}>{phonenumberError}</span>
            </div>
          
            <div className="form-group" >
                <label htmlFor="email">Email: </label>
                <input 
                  type="text"
                  className="form-control" 
                  id="email"
                  required
                  value={user.email}
                  onChange={(e) => {
                    validateEmail(e)
                    handleInputChange(e)
                    }}
                  name="email">
                </input> 
                <span style={{
                fontWeight: 'bold',
                color: 'red',
                }}>{emailError}</span>
             
            </div>

            <div className="form-group">
              <label htmlFor="mailingaddress">Mailing Address</label>
              <input
                type="text"
                className="form-control"
                id="mailingaddress"
                required
                value={user.mailingaddress}
                onChange={handleInputChange}
                name="mailingaddress"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bilingaddress">Billing Address</label>
              <input
                type="text"
                className="form-control"
                id="billingaddress"
                required
                value={user.billingaddress}
                onChange={handleInputChange}
                name="billingaddress"
              />
            </div>



            <Form>
                {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="form-group">
                        <Form.Check 
                        type={type}
                        id={`default-${type}`}
                        onChange={sameAddress}
                        label={`same as Mailing Address`}
                        />
                    </div>
                ))}
            </Form>




            <div className="form-group">
              <label htmlFor="PreferredNumber">Preferred Number</label>
              <input
                type="number"
                className="form-control"
                id="PreferredNumber"
                required
                value={user.PreferredNumber}
                onChange={handleInputChange}
                name="PreferredNumber"
              />
            </div>
           
            <div className="form-group">
              <label htmlFor="Points">Points</label>
              <input
                type="number"
                className="form-control"
                id="Points"
                disabled
                value={user.Points}
                onChange={handleInputChange}
                name="Points"
              />
            </div>

            <div className="form-group">
              <label htmlFor="PreferredPayment">Preferred Payment Method</label>
              <input
                type="text"
                className="form-control"
                id="PreferredPayment"
                required
                value={user.PreferredPayment}
                onChange={handleInputChange}
                name="PreferredPayment"
              />
            </div>
    
            <button onClick={login} className="btn btn-success">
              Register
            </button>
          </div>
          </div>
        )}
        </div>
      );
}

export default Register; 