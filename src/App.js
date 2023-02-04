import "./App.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [booking, setBooking] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("Pune");
  const [hotel, setHotel] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [termsConditions, setTermsCondition] = useState("Agree");
  const [accept, setAccept] = useState(false);

  useEffect(() => {
    getBooking();
  }, []);

  const collectData = async () => {
    alert(`${hotel} : Hotel Booked Successfully !!! `);

    let result = await fetch("http://localhost:4000/reserve", {
      method: "POST",
      body: JSON.stringify({
        fname,
        lname,
        email,
        mobile,
        location,
        hotel,
        checkIn,
        checkOut,
        termsConditions,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
  };

  const getBooking = async () => {
    let result = await fetch("http://localhost:4000/bookings");
    let data = await result.json();
    console.log("User List -", data);
    setBooking(data);
  };

  const cancelBook = async (id) => {
    let result = await fetch(`http://localhost:4000/delete/${id}`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      alert("Booking will be cancelled permanently !!!");
      getBooking();
    }
  };

  return (
    <div className="App">
      <h1> PRINT FORM DATA IN TABLE </h1>
      <h2>HOTEL BOOKING ( PUNE )</h2>
      <form>
        <label> First Name : </label>
        <input
          type="text"
          name="fname"
          onChange={(e) => {
            setFname(e.target.value);
          }}
          placeholder="Enter First Name"
        />
        <br />
        <br />
        <label> Last Name : </label>
        <input
          type="text"
          name="lname"
          onChange={(e) => {
            setLname(e.target.value);
          }}
          placeholder="Enter Last Name"
        />
        <br />
        <br />
        <label> Email Id : </label>
        <input
          type="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter Email Id"
        />
        <br />
        <br />
        <label> Mobile No : </label>
        <input
          type="number"
          name="mobile"
          onChange={(e) => {
            setMobile(e.target.value);
          }}
          placeholder="Enter Mobile No"
        />
        <br />
        <br />
        <label> Hotel Name : </label>
        <select
          name="hotel"
          onChange={(e) => {
            setHotel(e.target.value);
          }}
        >
          <option>Select Hotel</option>
          <option>J W Marriott </option>
          <option>The Ritz-Carlton</option>
          <option>Lemon Tree Premier</option>
          <option>The Central Park</option>
          <option>The ATMOS </option>
          <option>CONRAD</option>
        </select>
        <br />
        <br />
        <label> Location : </label>
        <span>
          <input
            type="checkbox"
            name="location"
            defaultChecked={true}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </span>
        <span> Maharashtra, Pune.</span>
        <br />
        <br />
        <label> Check-In : </label>
        <div>
          <input
            className="dates"
            type="date"
            name="checkIn"
            onChange={(e) => {
              setCheckIn(e.target.value);
            }}
          />
        </div>
        <br />
        <br />
        <label> Check-Out : </label>
        <div>
          <input
            className="dates"
            type="date"
            name="checkOut"
            onChange={(e) => {
              setCheckOut(e.target.value);
            }}
          />
        </div>
        <br />
        <br />
        <br />
        <span>
          <input
            type="checkbox"
            name="termsConditions"
            checked={accept}
            onChange={(e) => setAccept(e.target.checked)}
          />
        </span>
        <span>I am above 18 years of age and agree to terms & conditions.</span>
        <span style={{ color: "red", fontSize: "20px" }}>*</span>
        <br />
        <br />
        {accept ? (
          <button type="submit" onClick={collectData}>
            Submit
          </button>
        ) : (
          <button type="submit" onClick={collectData} disabled>
            Submit
          </button>
        )}
      </form>
      <br />
      <h1>BOOKING DETAILS</h1>
      <table
        border="2"
        style={{
          margin: "auto",
          borderCollapse: "collapse",
          width: "90%",
        }}
      >
        <tbody>
          <tr>
            <td>Sr.No</td>
            <td>FirstName</td>
            <td>LastName</td>
            <td>Email</td>
            <td>Mobile</td>
            <td>Hotel</td>
            <td>Location</td>
            <td>Check-In</td>
            <td>Check-Out</td>
            <td>T&C </td>
            <td>Cancel Booking</td>
          </tr>
          {booking.length > 0 ? (
            booking.map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.hotel}</td>
                <td>{user.location}</td>
                <td>{user.checkIn}</td>
                <td>{user.checkOut}</td>
                <td>{user.termsConditions}</td>
                <td>
                  <button onClick={() => cancelBook(user._id)}>Cancel</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">NO BOOKIGS AVAILABLE</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
