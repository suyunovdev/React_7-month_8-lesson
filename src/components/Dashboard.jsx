import React from "react";
import { Layout, Menu } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import Students from "./Students";
import { UserOutlined } from "@ant-design/icons";
import "./Dashboard.css";

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link to="/students">Students</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" mode="inline" items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "0 56px" }}>
          <Routes>
            <Route path="/students" element={<Students />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
