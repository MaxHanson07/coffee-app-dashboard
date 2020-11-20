import React from "react";
import Logo from "../../images/logo.png";
import "./Header.scss";
import Button from "../Button/Button"

export default function Header({logout, loggedIn}) {
  return (
    <header>
      <img className="logo" src={Logo} alt="Coffee App Logo" />
      {loggedIn ? (
      <Button className="logout" onClick={logout} name="Logout"/>
      ) : (
        null
      )}
    </header>
  );
}
