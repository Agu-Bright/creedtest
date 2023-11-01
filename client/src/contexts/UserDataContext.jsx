import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../api/fetchData";
export const UserDataContext = createContext();

export const UserDataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const fetchUser = async () => {
    await fetchData(`/users/user/${id}`).then((res) => console.log(res));
  };

  const checkStorage = () => {
    // fetchUser()
    setUserData(localStorage.getItem("user"));
  };

  useEffect(() => {
    checkStorage();
  }, []);
  return (
    <UserDataContext.Provider
      children={children}
      value={{ userData, checkStorage }}
    />
  );
};
