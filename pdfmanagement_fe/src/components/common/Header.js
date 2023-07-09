import React from "react";
import classes from "./Header.module.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginStateAtom } from "../../context/loginState";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [login, setLogin] = useRecoilState(loginStateAtom);
  const navigate = useNavigate();
  console.log(login.isLoggedIn);

  const logoutHandler = (val) => {
    setLogin({ isLoggedIn: false, token: "" });
    navigate("/");
  };

  return (
    <header className={classes.header}>
      <h1>PDF Management and Collaboration</h1>
      {login.isLoggedIn && <LogoutButton logout={logoutHandler} />}
    </header>
  );
}
