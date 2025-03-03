import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import config from "./config";

function Register() {

    const navigate = useNavigate();

    const location = useLocation();

    const { message } = location.state || {};

    const [formData, setFormData] = useState({

        email: "",
        password: "",
        confirmpassword: "",
        firstname: "",
        lastname: ""

      });

    const {email, password, confirmpassword, firstname, lastname} = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // console.log(JSON.stringify(formData));
    
        try {
    
          const response = await fetch(
            `${config.apiBaseUrl}/register`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json"},
              credentials: "include",
              body: JSON.stringify(formData),
            });
    
          const result = await response.json();
          console.log("Success: ", result);
    
          navigate("/Login", {state:{message:'Successfully Registered!'}});
    
        } catch (error) {
          console.error("Error: ", error);
          navigate("/Register", {state:{message:'Register Failed!'}});
        }
      };
    

    return(
        <>
            <div>
                {message ? <p>{message}</p> : ''}
                <form onSubmit={handleSubmit}>
                    <label>Email: </label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                    <br />
                    <label>Choose Password: </label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    <br />
                    <label>Confirm Password: </label>
                    <input type="password" name="confirmpassword" value={formData.confirmpassword} onChange={handleChange} />
                    <br />
                    <label>First Name: </label>
                    <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
                    <br />
                    <label>Last Name: </label>
                    <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
                    <br />
                    <button type="submit">Register</button>
                </form>
                
            </div>
        </>
    )
}

export default Register