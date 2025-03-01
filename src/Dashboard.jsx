import { useEffect, useState } from "react";
import config from "./config";

function Dashboard() {

    const [data, setData] = useState({
      email: '',
      firstname: '',
      lastname: ''
    });
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log(data);

            const response = await fetch(`${config.apiBaseUrl}/protected`, { credentials: "include" })
              .then((res) => res.json())
              .then((result) => setData(result))  // State updates here
              .catch((err) => console.error(err));
            //setData(result);

            console.log(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []); // Empty dependency array = runs once when component mounts

    return(
        <>
            <h1>Dashboard {data.firstname} {data.lastname}</h1>
        </>
    )
}

export default Dashboard