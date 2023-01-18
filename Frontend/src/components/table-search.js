import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantDataService from "../services/restaurant"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const TableSearch = props => {
  //variables to hold reservation
  const [tables, setTables] = useState([]);
  const [resDateTime, setResDateTime ] = useState("");
  const [resNumGuests, setResNumGuests ] = useState("");
  const [resultz, setResultz] = useState("");
  const [traf, setTraf] = useState(false);

  const [resTables, setResTables] = useState([]);

  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var now = new Date(resDateTime);
  var day1 = days[ now.getDay() ];  

  const onChangeDateTime = e => {
    const resDateTime = e.target.value;
    setResDateTime(resDateTime);
  };

  const onChangeNumGuests = e => {
    const resNumGuests = e.target.value;
    setResNumGuests(resNumGuests);
  };

  const retrieveTables = () => {
    if (resNumGuests != ""){
      RestaurantDataService.getWithNumGuests(resNumGuests) 
      .then(response => {
        console.log(response.data);
        setTables(response.data.tables);
        setResTables([]);
      })
      .catch(e => {
        console.log(e);
      });
    }else{
      RestaurantDataService.getAll() 
        .then(response => {
          console.log(response.data);
          setTables(response.data.tables);
          setResTables([]);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const addToRes = e => {
    const tableNumToAdd = e.target.value;
    for (let i = 0; i < tables.length; i++) {
      if (tables[i].table_number == tableNumToAdd){
        setResTables(resTables.concat(tables[i]));
        tables.splice(i,1)
      }
    }
  };

  const removeFromRes = e => {
    const tableNumToRemove = e.target.value;
    for (let i = 0; i < resTables.length; i++) {
      if (resTables[i].table_number == tableNumToRemove){
        setTables(tables.concat(resTables[i]));
        resTables.splice(i,1)
      }
    }
  };
 
  const checkDay=e=>{
    if (day1 == 'Thursday' || day1 == 'Friday'){
      setResultz( 'It is a high traffic day');
      console.log(resultz);
      setTraf(true);
    } else {
      setResultz( 'Its a normal traffic day');
      console.log(resultz);
      setTraf(false);
    } 
  }

  return (
    <div>
      <h1>Search For Tables</h1>
      <h2>{resultz}</h2>
      
      { traf ? (<p>A $10 fee will be charged for a no show and a credit card is required on file.</p>) : (<p></p>)} 
      
      <div className="row pb-1">
        {/* 4th input box - number of customers */}
        <div className="input-group col-lg-4">
          <input
            type="number"
            className="form-control"
            placeholder="Number of Guests"
            value={resNumGuests}
            onChange={onChangeNumGuests}
          />
          
        </div>

        {/* 5th input box - date & time */}
        <div className="input-group col-lg-4">
          <label for="date_time">Date and Time of Reservation:</label>
          <input
            type="datetime-local"
            className="form-control"
            id="date_time"
            value={resDateTime}
            onChange={onChangeDateTime}
          />
        </div>

          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={(e) => {
                retrieveTables();
                checkDay(e);
              }}>
              Search for Tables
            </button>
            
          </div>
      </div>
      
      <div className="row">
        {tables.map((table) => {
          return (
            <div className="col-lg-4 pb-1">
              
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Table {table.table_number}</h5>
                  <p className="card-text">
                    <strong>Number of Seats: </strong>{table.table_capacity}<br/>
                  </p>
                  <div className="row">
                    <button
                      className="btn btn-primary col-lg-5 mx-1 mb-1" 
                      type="button" 
                      value={table.table_number}
                      onClick={addToRes}
                    >
                      Add to Reservation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="current-reservation">
        <h1>Current Reservation</h1>
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
                  <div className="row">
                    <button
                      className="btn btn-primary col-lg-5 mx-1 mb-1" 
                      type="button" 
                      value={table.table_number}
                      onClick={removeFromRes}
                    >
                      Remove From Reservation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row pb-1">
          <div className="input-group-append">
          { props.user ? (<a><button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrieveTables}
            >
              Continue
            </button></a>)
               : (
                <Popup trigger={<button
                  className="btn btn-outline-secondary"
                  type="button" onClick={retrieveTables}> Continue as Guest</button>} modal nested position="top center">
                 {close => (
                 <div className = "modal">
                  <button className="btn btn-outline-secondary close" type="button" onClick={close}>
                   <div >Would you like to register?</div> 
                  </button>
                 </div>)}
                 <Link to={"/register"} className="nav-link">Would you like to register?</Link>
                 <Link to={{
                    pathname:"/guest",
                    state: {
                      numGuests: resNumGuests,
                      resDT: resDateTime,
                      tabs: resTables,
                      traf: traf
                    }
                  }} className="nav-link">Continue as guest</Link>
                 </Popup>
                )}
          </div>
      </div>
    </div>
  );
};

export default TableSearch;