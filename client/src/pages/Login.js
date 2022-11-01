import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("values from login", values);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      // console.log('response from login',response);
      localStorage.setItem(
        "dayfi-user",
        JSON.stringify({ ...response.data, password: "" })
      ); // save info in browser
      setLoading(false);
      message.success("Login done succesfully");
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("login failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("dayfi-user")) {
      navigate("/");
    }
  });

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://assets9.lottiefiles.com/packages/lf20_ml0yft0o.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>DAYFI Login</h1>
            <hr />
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">
                Not Registered Yet? , Click Here To Register
              </Link>
              <button className="primary" type="submit">
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
