import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Typography,
  ConfigProvider,
  App as AntdApp,
} from "antd";
import { LogoutOutlined, YoutubeOutlined } from "@ant-design/icons";

import { logout } from "../redux/authSlice";
import { fetchFavorites } from "../redux/favoritesSlice";
import { selectAuthToken } from "../redux/selectors";

import AuthForm from "./AuthForm";
import VideoSearch from "./VideoSearch";
import Favorites from "./Favorites";
import ProtectedRoute from "./ProtectedRoute";
import "../App.css";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const token = useSelector(selectAuthToken);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (token) dispatch(fetchFavorites());
  }, [token, dispatch]);

  const menuItems = [
    { key: "/", label: <Link to="/">Поиск</Link> },
    { key: "/favorites", label: <Link to="/favorites">Избранное</Link> },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#1677ff" } }}>
      <AntdApp>
        <Layout className="app-layout">
          {token && (
            <Header className="header-container">
              <div className="logo-wrapper">
                <YoutubeOutlined className="logo-icon" />
                <Title level={4} className="m-0">
                  YouTube Search
                </Title>
              </div>
              <Menu
                mode="horizontal"
                selectedKeys={[location.pathname]}
                items={menuItems}
                className="flex-1 border-none"
              />
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={() => dispatch(logout())}
              >
                Выйти
              </Button>
            </Header>
          )}

          <Content className="main-content">
            <div className="content-wrapper">
              <Routes>
                <Route
                  path="/login"
                  element={!token ? <AuthForm /> : <Navigate to="/" replace />}
                />

                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<VideoSearch />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Route>

                <Route
                  path="*"
                  element={<Navigate to={token ? "/" : "/login"} replace />}
                />
              </Routes>
            </div>
          </Content>
        </Layout>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
