import React, { ReactElement, useEffect } from "react";
import { Module } from "../api/api";

const AboutPage = (): ReactElement => {
  useEffect(() => {
    (async function asyncCall() {
      console.log(await Module.getModule());
    })();
  });
  return (
    <div>
      <div>About</div>
    </div>
  );
};

export default AboutPage;
