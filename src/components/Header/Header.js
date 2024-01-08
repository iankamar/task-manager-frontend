import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Header.css";

const Header = ({
  isLoggedIn,
  openLoginModal,
  openRegisterModal,
  handleLogout,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__avatar-logo">
        {isLoggedIn ? (
          <>
            <h2 className="header__username">{currentUser?.name}</h2>
            <button className="header__button me-3" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="header__button" onClick={openRegisterModal}>
              Register
            </button>
            <button className="header__button" onClick={openLoginModal}>
              Log in
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
