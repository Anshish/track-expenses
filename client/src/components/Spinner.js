import React from "react";
import { Spin } from "antd";
import "../resources/default-layout.css";

function Spinner() {
  return (
    <div>
      <Spin size="large" className="spinner" />
    </div>
  );
}

export default Spinner;
