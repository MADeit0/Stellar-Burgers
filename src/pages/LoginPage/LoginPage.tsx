import loginStyle from "./LoginPage.module.css";

import FormBody from "../../components/FormBody/FormBody";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import { loginUserThunk } from "../../store/auth/authAction";
import { FormEvent, useState } from "react";
import { User } from "../../utils/types";
import { useAppDispatch } from "../../hooks/hook";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [valueForm, handleChanges, isMessage, showMessage] = useForm<User>({
    email: "",
    password: "",
  });

  /**
   * Обработчик события отправки формы для входа пользователя.
   * @param {FormEvent<HTMLFormElement>} e - Событие отправки формы.
   * @returns {void}
   */
  const handlerSubmit = (e:FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(loginUserThunk(valueForm))
      .unwrap()
      .catch((err) => {
        showMessage()
        setMessage("Имя пользователя или пароль введены неверно");
      });
  };

  return (
    <div className="mt-30">
      <FormBody
        onSubmit={handlerSubmit}
        title="Вход"
        colorText="red"
        message={message}
        isMessage={isMessage}
      >
        <EmailInput
          onChange={handleChanges}
          value={valueForm.email || ''}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          onChange={handleChanges}
          value={valueForm.password || ''}
          name={"password"}
        />
        <Button htmlType="submit" type="primary" size="large">
          Войти
        </Button>
      </FormBody>
      <ul className={`${loginStyle.lists} mt-20`}>
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
