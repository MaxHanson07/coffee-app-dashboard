import React from "react";
import Logo from "../../images/logo.png";
import "./Header.scss";

export default function Header() {
  return (
    <header>
      <img className="logo" src={Logo} alt="Coffee App Logo" />
    </header>
  );
}
