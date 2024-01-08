import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginErr, setLoginErr] = useState("");
  const [registerErr, setRegisterErr] = useState("");

  const handleCloseModal = () => {
    setActiveModal("");
  };

  return (
    <AppContext.Provider
      value={{
        activeModal,
        setActiveModal,
        selectedTask,
        setSelectedTask,
        isLoading,
        setIsLoading,
        loginErr,
        setLoginErr,
        registerErr,
        setRegisterErr,
        handleCloseModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
