import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "./config";
import { useAuth } from "./AuthContext";

function Dashboard() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const logout = async (e) => {
    try {
      await fetch(
        `${config.apiBaseUrl}/logout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
        .then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`${errorData.detail || 'Something went wrong.'}`);
          }
          navigate("/Login");
        })
        .catch((err) => {
          alert(`${err.message}`);
        });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <h1>Dashboard {user.firstname} {user.lastname}</h1>
      <a href="/Dashboard">dashboard</a>
      <button id="logout" onClick={logout}>Logout</button>
    </>
  )
}

export default Dashboard