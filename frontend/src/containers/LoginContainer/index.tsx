import { Col, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "../../components/BaseButton";
import FormInput from "../../components/FormInput";
import { adminLogin, filterVacancy } from "../../consts";
import { addNotification } from "../../utils/notifications";

import "./styles.sass";

interface ILoginData {
  login: string;
  password: string;
}

const initLoginData: ILoginData = {
  login: "",
  password: "",
};

const LoginContainer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ILoginData>({
    ...initLoginData,
  });

  const loginUser = () => {
    const { login, password } = formData;
    if (login && password) {
      if (login === adminLogin.login && password === adminLogin.password) {
        sessionStorage.setItem("user", JSON.stringify(formData));
        navigate(filterVacancy ? "/admin/cities" : "/admin/vacancies");
      } else {
        addNotification({
          type: "danger",
          title: "Ошибка авторизаци",
          message:
            "Убедитесь, что ввели правильно логин и пароль админ-пользователя",
        });
      }
    } else {
      addNotification({ type: "danger", title: "Заполните все поля" });
    }
  };

  const { login, password } = formData;

  return (
    <div className="login-page">
      <div className="container login-container">
        <div className="login-form">
          <Row gutter={[0, 18]} justify="center">
            <Col span={24}>
              <div className="form-element">
                <FormInput
                  value={login}
                  placeholder="Логин"
                  setValue={(value) =>
                    setFormData({ ...formData, login: value })
                  }
                  modificator="login-element"
                />
              </div>
            </Col>
            <Col span={24}>
              <div className="form-element">
                <FormInput
                  value={password}
                  placeholder="Пароль"
                  typeInput="password"
                  setValue={(value) =>
                    setFormData({ ...formData, password: value })
                  }
                  modificator="login-element"
                />
              </div>
            </Col>

            <BaseButton
              title="Авторизоваться"
              modificator="login-btn"
              onClick={loginUser}
              isBlack
            />
          </Row>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
