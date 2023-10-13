import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Logo from "../../assets/images/i2c_logo.png";

const { Header, Sider, Content } = Layout;

function AppLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [defaultSelectedKey, setDefaultSelectedKey] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    console.log(location);

    if (location.pathname === "/bookmarks") {
      setDefaultSelectedKey("bookmarks");
    } else {
      setDefaultSelectedKey("search");
    }
  }, [location, location.pathname]);

  return (
    <Layout className="layout">
      <Sider
        onBreakpoint={(e) => setCollapsed(e)}
        breakpoint="md"
        trigger={null}
        collapsedWidth={"0"}
        collapsible
        collapsed={collapsed}
      >
        <div className="layout-logo">
          <img src={Logo} alt="Logo" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[defaultSelectedKey]}
          defaultSelectedKeys={[defaultSelectedKey]}
          items={[
            {
              key: "search",
              icon: <SearchOutlined />,
              label: "Search",
              onClick: () => navigate("/search"),
            },
            {
              key: "bookmarks",
              icon: <BookOutlined />,
              label: "Bookmarks",
              onClick: () => navigate("/bookmarks"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
