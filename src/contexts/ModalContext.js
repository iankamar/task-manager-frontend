import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModalContext = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState("");

  const handleCloseModal = () => {
    setActiveModal("");
  };

  return (
    <ModalContext.Provider
      value={{ activeModal, setActiveModal, handleCloseModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
