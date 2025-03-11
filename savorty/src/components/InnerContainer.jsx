import React from "react";
import Styles from "./innerContainer.module.css";

const InnerContainer = ({ children }) => {
  return <div className={Styles.innerContainer}>{children}</div>;
};

export default InnerContainer;
