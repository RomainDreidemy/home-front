import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { loggedIn } from "../services/auth/authService";
import { getPath } from "../routes";

const HomePage = (): ReactElement => {
  return (
    <div>
      <Link to={getPath("about", { id: 12 })}>My home</Link>
    </div>
  );
};

export default HomePage;
