import React, { useState } from "react";
import { BsGraphUp } from "react-icons/bs";
import { BsUpload } from "react-icons/bs";
import { Layout, Menu, theme } from "antd";
import Metricas from './Metricas'
import Datos from './Datos'
const { Header, Content, Footer, Sider } = Layout;

export default function MenuDesplegable() {
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState("1");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (item) => {
    setPage(item.key); 
  };


  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" style={{marginTop:"50px"}} onClick={handleMenuClick} >
          <Menu.Item key="1" icon={<BsGraphUp />}>
            <span>Métricas</span>
          </Menu.Item>

          <Menu.Item key="2" icon={<BsUpload />}>
            <span>Cargar Datos</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "16px 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {page === "1" ?
           <Metricas/>
           : <Datos/>
          }
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Grovat ©2023
        </Footer>
      </Layout>
    </Layout>
  );
}
