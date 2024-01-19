import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';

import './default-layout.styles.css';
import { LogOutUser } from '../../redux/slices/auth';

const { Header, Sider, Content } = Layout;
const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let linkStyle = { textDecoration: 'none' };

  const handleClickLogo = () => {
    navigate('/app');
  };

  const handleViewProfile = () => {
    navigate('/app/profile');
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch(LogOutUser());
      navigate('/auth/login');
    }, 2000);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          onClick={handleClickLogo}
          className="demo-logo-vertical logo__container"
        >
          <Link to="/app" style={linkStyle}>
            <h3 className="logo__text">{'NITA'}</h3>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
          items={[
            {
              key: '/app',
              icon: <HomeOutlined />,
              label: (
                <Link to="/app" style={linkStyle}>
                  Home
                </Link>
              ),
            },
            {
              key: '/app/approved',
              icon: <CopyOutlined />,
              label: (
                <Link to="/app/approved" style={linkStyle}>
                  Approved
                </Link>
              ),
            },
            {
              key: '/app/pending',
              icon: <UnorderedListOutlined />,
              label: (
                <Link to="/app/pending" style={linkStyle}>
                  Pending
                </Link>
              ),
            },

            {
              key: '/app/rejected',
              icon: <CloseCircleOutlined />,
              label: (
                <Link to="/app/rejected" style={linkStyle}>
                  Rejected
                </Link>
              ),
            },
            {
              key: '/app/registered',
              icon: <UsergroupAddOutlined />,
              label: (
                <Link to="/app/registered" style={linkStyle}>
                  Registered
                </Link>
              ),
            },
            // {
            //   key: '/app/nominees',
            //   icon: <UserOutlined />,
            //   label: (
            //     <Link to="/app/nominees" style={linkStyle}>
            //       All Nominees
            //     </Link>
            //   ),
            // },
            {
              key: '/auth/login',
              icon: <LogoutOutlined />,
              label: (
                <Link style={linkStyle} onClick={handleLogout}>
                  Logout
                </Link>
              ),
            },
          ]}
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
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div
            className="avatar__container d-flex align-items-center"
            onClick={handleViewProfile}
          >
            <Avatar sx={{ bgcolor: '#673ab7' }}>OP</Avatar>
          </div>
        </Header>
        <Content
          style={{
            margin: '10px 0px',
            padding: 24,
            minHeight: '80vh',
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
