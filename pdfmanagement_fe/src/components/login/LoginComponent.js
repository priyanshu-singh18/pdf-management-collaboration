import React, { useState } from "react";
import "./LoginComponent.css";
import axios from "axios";

const getToken = async (credentials) => {
  const token = await axios.post(
    "http://localhost:8000/users/login",
    JSON.stringify(credentials),
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  console.log(token.data);
};

export default function LoginComponent() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    getToken({ username: username, password: password });
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <label>
        <p>Email</p>
        <input type="email" onChange={(e) => setUsername(e.target.value)} />
      </label>

      <label>
        <p>Password</p>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
