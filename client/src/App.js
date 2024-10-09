import "./App.css";
import React, { useState } from "react";
import { Layout, Menu, Select } from "antd";
import Transactions from "./components/Transaction";
import Stats from "./components/Stat";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";

const { Header, Content } = Layout;

const navItems = [
  {
    key: "1",
    label: (
      <NavLink className="menu-item" to="/">
        Transactions
      </NavLink>
    ),
  },
  {
    key: "2",
    label: (
      <NavLink className="menu-item" to="/stats">
        Statistics
      </NavLink>
    ),
  },
];

const options = [
  "Entire Year",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const App = () => {
  let [month, setMonth] = useState(9);
  const location = useLocation();

  const handleMonthChange = (value) => {
    setMonth(parseInt(value));
  };

  const getSelectedKey = () => {
    return location.pathname === "/stats" ? "2" : "1";
  };

  return (
    <Layout>
      <Header
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1677ff",
        }}
      >
        <NavLink
          to="/"
          className="nav-link"
          style={{ fontSize: "24px", marginRight: "20px", color: "white" }}
        >
          Dashboard
        </NavLink>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          items={navItems}
          style={{
            flex: 1,
            padding: "0 60px",
            backgroundColor: "#1677ff",
          }}
        />
        <Select
          size="large"
          defaultValue={options[month]}
          onChange={handleMonthChange}
          style={{
            width: 200,
          }}
          options={options.map((text, i) => ({
            value: i,
            label: text,
          }))}
        />
      </Header>
      <Content
        className="content"
        style={{ padding: "0px 48px", minHeight: 600 }}
      >
        <Routes>
          <Route
            path="/"
            element={<Transactions month={month} monthText={options[month]} />}
          />
          <Route
            path="/stats"
            element={<Stats month={month} monthText={options[month]} />}
          />
        </Routes>
      </Content>
    </Layout>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
