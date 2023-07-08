import React, { useState } from "react";
import "./LoginComponent.css";

export default function LoginComponent() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(username, password);
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
