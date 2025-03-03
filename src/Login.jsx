import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Login.css'
import { useNavigate, useLocation } from "react-router-dom";
import config from "./config";

function Login() {
  // const [count, setCount] = useState(0)

  const navigate = useNavigate();

  const location = useLocation();

  const { message } = location.state || {};

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

      const response = await fetch(
        `${config.apiBaseUrl}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          credentials: "include",
          body: JSON.stringify(formData),
        });

      const result = await response.json();
      console.log("Success3: ", result);

      navigate("/Dashboard");

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

      {/* <br />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default Login
