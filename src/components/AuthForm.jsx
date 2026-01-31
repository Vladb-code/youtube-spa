import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../redux/authSlice";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Tabs,
  Alert,
  Select,
  App,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  NumberOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const AuthForm = () => {
  const { message } = App.useApp();

  const [activeTab, setActiveTab] = useState("login");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    try {
      if (activeTab === "login") {
        await dispatch(loginUser(values)).unwrap();
        message.success("С возвращением! Вход выполнен.");
      } else {
        const registrationData = {
          ...values,
          age: Number(values.age),
        };
        await dispatch(registerUser(registrationData)).unwrap();
        message.success("Аккаунт успешно создан! Добро пожаловать.");
      }
    } catch (err) {
      message.error(typeof err === "string" ? err : "Ошибка аутентификации");
    }
  };

  return (
    <div className="auth-wrapper">
      <Card className="auth-card">
        <div className="auth-header">
          <Title level={3}>YouTube Search</Title>
        </div>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            { label: "Вход", key: "login" },
            { label: "Регистрация", key: "register" },
          ]}
        />

        {error && (
          <Alert
            title={error}
            type="error"
            showIcon
            closable
            className="mb-20"
          />
        )}

        <Form layout="vertical" onFinish={onFinish}>
          {activeTab === "register" && (
            <>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Введите имя пользователя" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Имя пользователя"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="age"
                rules={[{ required: true, message: "Укажите возраст" }]}
              >
                <Input
                  type="number"
                  prefix={<NumberOutlined />}
                  placeholder="Возраст"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="gender"
                rules={[{ required: true, message: "Выберите пол" }]}
              >
                <Select placeholder="Выберите пол" size="large">
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                </Select>
              </Form.Item>
            </>
          )}

          <Form.Item
            name="email"
            rules={[
              { required: true, type: "email", message: "Введите email" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={isLoading}
            className="auth-btn"
          >
            {activeTab === "login" ? "Войти" : "Зарегистрироваться"}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AuthForm;
