import loginStyle from "./LoginPage.module.css";

import FormBody from "../../components/FormBody/FormBody";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [value, setValue] = useState("password");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="mt-30">
      <FormBody title="Вход" btn="Войти">
        <EmailInput
          onChange={onChange}
          value={value}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput onChange={onChange} value={value} name={"password"} />
      </FormBody>
      <ul className={loginStyle.lists}>
        <li>
          <span className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?
          </span>
          <Link to="/register">
            <span className="text text_type_main-default pl-2">
              Зарегистрироваться
            </span>
          </Link>
        </li>
        <li>
          <span className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </span>
          <Link to="/forgot-password">
            <span className="text text_type_main-default pl-2">
              Восстановить пароль
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LoginPage;
