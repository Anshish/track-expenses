import React from "react";
import "../resources/default-layout.css";
import { DownOutlined} from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { useNavigate } from "react-router-dom";

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem("dayfi-user"));
  const navigate = useNavigate();

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <li
              onClick={() => {
                localStorage.removeItem("dayfi-user");
                navigate('/login')
              }}
            >
              Logout
            </li>
          ),
        },
      ]}
    />
  );

  return (
    <div className="outer">
      <div className="layout">
        <div className="header d-flex justify-content-between align-items-center">
          <div>
            <h1 className="logo">DayFi</h1>
          </div>
          <div>
            <Dropdown overlay={menu}>
              {/* <a onClick={(e) => e.preventDefault()}> */}
                <Space className="primary">
                  {user.name}
                  <DownOutlined />
                </Space>
              {/* </a> */}
            </Dropdown>
          </div>
        </div>

        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
