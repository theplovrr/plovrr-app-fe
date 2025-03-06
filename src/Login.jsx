import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Login.css'
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import config from "./config";

function Login() {
  const navigate = useNavigate();

  const location = useLocation();

  const { message } = location.state || {};

  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password} = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(JSON.stringify(formData));

    try {

      await fetch(
        `${config.apiBaseUrl}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          credentials: "include",
          body: JSON.stringify(formData),
        })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`${errorData.detail || 'Something went wrong.'}`);
          }
          return res.json();
        })
        .then((resJson) => {
            setUser({
              firstname: resJson.firstname,
              lastname: resJson.lastname,
              email: resJson.email,
            });
          navigate("/Dashboard");
        })
        .catch((err) => {
          alert(`${err.message}`);
        });

    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const redirectRegisterPage = async (e) => {
    e.preventDefault();
    navigate("/Register");
  };

  return (
    <>
      <div>
        {message ? <p>{message}</p> : ''}
        <form onSubmit={handleSubmit}>
          <label>Email: </label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
          <label>Password: </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          <button type="submit">Login</button>
          <button id="register" onClick={redirectRegisterPage}>Register</button>
        </form>
      </div>
    </>
  )
}

export default Login
