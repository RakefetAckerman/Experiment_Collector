import React from "react";
import { useDispatch } from "react-redux";
import { logedOut } from "../../states/reducer"; // Adjust the import path

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logedOut());
  };

  return (
    <div>
      {/* Your home page JSX content goes here */}
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default HomePage;
