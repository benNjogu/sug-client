import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  FileExclamationOutlined,
  FileUnknownOutlined,
  HomeOutlined,
  CopyOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
  LayoutOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Modal } from "antd";

import { GetOrganizationData } from "../../redux/slices/organization";
import { LogOutUser } from "../../redux/slices/auth";
import { GetAdminData } from "../../redux/slices/admin";
import "./default-layout.styles.css";

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user_name, account_type } = useSelector(
    (state) => state.auth.user_data
  );

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let linkStyle = { textDecoration: "none" };

  const handleClickLogo = () => {
    navigate("/app");
  };

  const handleViewProfile = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (account_type === process.env.REACT_APP_AccountType0) {
        dispatch(GetOrganizationData());
        navigate("/profile");
      } else {
        dispatch(GetAdminData());
        navigate("/admin-profile");
      }
    }, 700);
  };

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      dispatch(LogOutUser());
      navigate("/auth/login");
    }, 2000);
  };

  const getFirstLetterOfUserName = () => {
    return user_name.charAt(0).toUpperCase();
  };

  const getMenuItems = () => {
    if (account_type === process.env.REACT_APP_AccountType0) {
      return [
        {
          key: "/app",
          icon: <HomeOutlined />,
          label: (
            <Link to="/app" style={linkStyle}>
              Home
            </Link>
          ),
        },
        {
          key: "/approved",
          icon: <FileDoneOutlined />,
          label: (
            <Link to="/approved" style={linkStyle}>
              Approved
            </Link>
          ),
        },
        {
          key: "/pending",
          icon: <FileExclamationOutlined />,
          label: (
            <Link to="/pending" style={linkStyle}>
              Pending
            </Link>
          ),
        },
        {
          key: "/deffered",
          icon: <FileUnknownOutlined />,
          label: (
            <Link to="/deffered" style={linkStyle}>
              Defferred
            </Link>
          ),
        },
        {
          key: "/rejected",
          icon: <FileExcelOutlined />,
          label: (
            <Link to="/rejected" style={linkStyle}>
              Rejected
            </Link>
          ),
        },
        {
          key: "/registered",
          icon: <UsergroupAddOutlined />,
          label: (
            <Link to="/registered" style={linkStyle}>
              Nominees
            </Link>
          ),
        },
        {
          key: "/auth/login",
          icon: <LogoutOutlined />,
          label: (
            <Link style={linkStyle} onClick={confirm}>
              Logout
            </Link>
          ),
        },
      ];
    } else if (
      account_type === process.env.REACT_APP_AccountType1 ||
      account_type === process.env.REACT_APP_AccountType2 ||
      account_type === process.env.REACT_APP_AccountType3
    ) {
      return [
        {
          key: "/app",
          icon: <FileExclamationOutlined />,
          label: (
            <Link to="/app" style={linkStyle}>
              Pending
            </Link>
          ),
        },
        {
          key: "/admin-approved",
          icon: <FileDoneOutlined />,
          label: (
            <Link to="/admin-approved" style={linkStyle}>
              Approved
            </Link>
          ),
        },
        {
          key: "/admin-deffered",
          icon: <FileUnknownOutlined />,
          label: (
            <Link to="/admin-deffered" style={linkStyle}>
              Defferred
            </Link>
          ),
        },
        {
          key: "/admin-rejected",
          icon: <FileExcelOutlined />,
          label: (
            <Link to="/admin-rejected" style={linkStyle}>
              Rejected
            </Link>
          ),
        },
        {
          key: "/admin-all-applications",
          icon: <CopyOutlined />,
          label: (
            <Link to="/admin-all-applications" style={linkStyle}>
              All applications
            </Link>
          ),
        },
        {
          key: "/admin-all-nominees",
          icon: <TeamOutlined />,
          label: (
            <Link to="/admin-all-nominees" style={linkStyle}>
              All nominees
            </Link>
          ),
        },
        {
          key: "/admin-organizations",
          icon: <LayoutOutlined />,
          label: (
            <Link to="/admin-organizations" style={linkStyle}>
              Organizations
            </Link>
          ),
        },
        {
          key: "/admin-reports",
          icon: <BarChartOutlined />,
          label: (
            <Link to="/admin-reports" style={linkStyle}>
              Analytics
            </Link>
          ),
        },
        {
          key: "/auth/login",
          icon: <LogoutOutlined />,
          label: (
            <Link style={linkStyle} onClick={confirm}>
              Logout
            </Link>
          ),
        },
      ];
    } else if (
      account_type === process.env.REACT_APP_AccountType4 ||
      account_type === process.env.REACT_APP_AccountType5
    ) {
      return [
        {
          key: "/app",
          icon: <UserOutlined />,
          label: (
            <Link to="/app" style={linkStyle}>
              Admins
            </Link>
          ),
        },
        {
          key: "/admin-all-applications",
          icon: <CopyOutlined />,
          label: (
            <Link to="/admin-all-applications" style={linkStyle}>
              All applications
            </Link>
          ),
        },
        {
          key: "/admin-organizations",
          icon: <LayoutOutlined />,
          label: (
            <Link to="/admin-organizations" style={linkStyle}>
              Organizations
            </Link>
          ),
        },
        {
          key: "/admin-reports",
          icon: <BarChartOutlined />,
          label: (
            <Link to="/admin-reports" style={linkStyle}>
              Analytics
            </Link>
          ),
        },
        {
          key: "/auth/login",
          icon: <LogoutOutlined />,
          label: (
            <Link style={linkStyle} onClick={confirm}>
              Logout
            </Link>
          ),
        },
      ];
    } else return "";
  };

  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: "Logout",
      icon: <LogoutOutlined />,
      content: "Do you really want to logout from the site?",
      okText: "OK",
      cancelText: "CANCEL",
      onOk: handleLogout,
    });
  };

  return (
    <>
      {contextHolder}
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            onClick={handleClickLogo}
            className="demo-logo-vertical logo__container"
          >
            <Link to="/admin" style={linkStyle}>
              <h3 className="logo__text">{"NITA"}</h3>
            </Link>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
            items={getMenuItems()}
          />
        </Sider>
        <Layout>
          {loading && (
            <div className="spinner">
              <div className="spinner-border" role="status" />
            </div>
          )}

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
            <div
              className="avatar__container d-flex align-items-center"
              onClick={handleViewProfile}
            >
              <span className="edit_profile_text">EDIT PROFILE</span>
              <div className="border-wrap d-flex align-items-center">
                <Avatar sx={{ bgcolor: "#673ab7" }}>
                  {getFirstLetterOfUserName()}
                </Avatar>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: "10px 0px",
              padding: 24,
              minHeight: "80vh",
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default DefaultLayout;
