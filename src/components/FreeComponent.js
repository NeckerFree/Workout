import React, { useEffect, useState } from 'react';
import axios from 'axios';
const FreeComponent = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "https://nodejs-mongodb-auth-app.herokuapp.com/free-endpoint",
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, [])
  return (
    <div>
      <h1>Free Component</h1>
      <h3 className="text-center text-danger">{message}</h3>
    </div>
  )
}

export default FreeComponent;
