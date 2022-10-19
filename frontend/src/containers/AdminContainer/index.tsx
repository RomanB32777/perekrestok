import { Layout, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponents/HeaderComponent";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { routers } from "../../routes";

import "./styles.sass";

const AdminContainer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { isMobile } = useWindowDimensions();

  const menuElements = useMemo(
    () =>
      routers
        .find((route) => route.path === "admin")
        ?.children?.map(({ path, id }) => ({
          key: path as string,
          label: id as string,
        })),
    []
  );

  const activeRoute = useMemo(() => pathname.split("/").slice(-1), [pathname]);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    !user && navigate("/login");
  }, []);

  useEffect(() => {
    isMobile ? setCollapsed(true) : setCollapsed(false);
  }, [isMobile]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div className="admin-container">
        {!collapsed && (
          <div className="sidebar-overlay" onClick={() => setCollapsed(true)} />
        )}
        <Sider
          width={215}
          collapsible
          collapsed={collapsed}
          collapsedWidth="0"
          className="layout-sidebar"
          trigger={null}
        >
          <div className="sidebar-content">
            <Menu
              theme="light"
              selectedKeys={activeRoute}
              triggerSubMenuAction="click"
              mode="inline"
              onClick={({ key }) => {
                navigate(key);
                isMobile && setCollapsed(true);
              }}
              items={menuElements}
            />
          </div>
        </Sider>
        <Layout
          style={{
            marginLeft: isMobile ? 0 : 215,
          }}
          className="admin-container-content"
        >
          <HeaderComponent
            collapsedSidebar={collapsed}
            setCollapsedSidebar={setCollapsed}
            modificator="admin-container-header"
            visibleGamburger
          />

          <Outlet />
        </Layout>
      </div>
    </Layout>
  );
};

export default AdminContainer;
