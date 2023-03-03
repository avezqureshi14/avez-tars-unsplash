import { useEffect, useState } from "react";
import { Menu, Layout, Input, Avatar, Switch } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Header } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  const changeTheme = (value) => {
    const newTheme = value ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Header className="header">
      <div className="logo">
        <Menu className="nav-menu logo" theme={theme}>
            Image Gallery
        </Menu>
      </div>
    
      <Menu mode="horizontal" className="nav-menu" theme={theme}>
        <Menu.Item key="explore">Explore</Menu.Item>
        <Menu.Item key="collection">Collection</Menu.Item>
        <Menu.Item key="community">Community</Menu.Item>
      </Menu>
      <Avatar icon={<UnorderedListOutlined />} className="nav-avatar" />
      <Switch
        className="nav-theme-switch"
        checked={theme === "dark"}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
    </Header>
  );
};

export default Navbar;
