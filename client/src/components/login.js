import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Login = ({ setLoginUser }) => {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
    role:""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, //spread operator
      [name]: value,
    });
  };

  function handleRegClick(e) {
    e.preventDefault();
    history("/Register");
  }

  const login = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/user/Login", user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.user);
      history("/");
    });
  };
  return (
    <>
      <div className="form">
        <div className="formheader">Login To Your Account</div>
        <div>
          <form action="#" autoComplete="off">
            <div>
              <div className="roww">
                <p>Email</p>
                <div className="spacer"></div>
                <input
                  type="text"
                  id="sign-in-email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Your email"
                />
              </div>
            </div>
            <div>
              <div className="roww">
                <p>Password</p>
                <div className="spacer"></div>
                <input
                  type="password"
                  id="sign-in-email"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Your password"
                />
              </div>
            </div>
            
            <div className="roww">
              <div className="link" onClick={(e)=>{
                handleRegClick(e)
              }}>
                <span class="ml-2">You don&#x27;t have an account?</span>
              </div>
            </div>
            <div className="rowwcenter">
              <button type="submit" variant="contained" onClick={(e)=>{
                login(e)
              }}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
