import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Header.css";

const Header = ({
  isLoggedIn,
  onCreateModal,
  openLoginModal,
  openRegisterModal,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__avatar-logo">
        <div>
          {isLoggedIn ? (
            <button
              type="text"
              onClick={onCreateModal}
              className="header__item"
            >
              {" "}
              + Add Task
            </button>
          ) : (
            <button className="header__button" onClick={openRegisterModal}>
              Sign up
            </button>
          )}
        </div>
        <div></div>
        {isLoggedIn ? (
          <Link to="/profile" className="header__profileLink">
            {currentUser?.avatar === "" ? (
              <div className="header__avatarPlaceholder">
                {currentUser?.name[0]}
              </div>
            ) : (
              <img
                className="header__avatarIcon"
                src={currentUser?.avatar}
                alt={currentUser?.name}
              />
            )}
            <h2 className="header__username">{currentUser?.name}</h2>
          </Link>
        ) : (
          <button className="header__button" onClick={openLoginModal}>
            Log in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
