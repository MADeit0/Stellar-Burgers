import resetPassStyle from "./ResetPasswordPage.module.css";

import FormBody from "../../components/FormBody/FormBody";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, Navigate, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { FormEvent, useState } from "react";
import { User } from "../../utils/types";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [valueForm, handleChanges, isMessage, showMessage] = useForm<User>({
    password: "",
    token: "",
  });

  /**
 * Обработчик события отправки формы для сброса пароля.
 * @param {FormEvent<HTMLFormElement>} e - Событие отправки формы.
 * @returns {void}
 */
  const handlerSubmit = (
    e: FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/password-reset/reset`, valueForm)
      .then((res) => {
        localStorage.removeItem("emailSent");
        navigate("/login");
      })
      .catch((error) => {
        showMessage();
        setMessage("Неверный код сброса");
      });
  };

  return localStorage.getItem("emailSent") ? (
    <div className={`mt-30 ${resetPassStyle.colum}`}>
      <FormBody
        onSubmit={handlerSubmit}
        title="Восстановление пароля"
        colorText="red"
        message={message}
        isMessage={isMessage}
      >
        <PasswordInput
          placeholder={"Введите новый пароль"}
          onChange={handleChanges}
          value={valueForm?.password || ''}
          name={"password"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChanges}
          value={valueForm?.token || ''}
          name={"token"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button htmlType="submit" type="primary" size="large">
          Сохранить
        </Button>
      </FormBody>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Link to="/login">
          <span className="text text_type_main-default pl-2">Войти</span>
        </Link>
      </p>
    </div>
  ) : (
    <Navigate to="/forgot-password" />
  );
};

export default ResetPasswordPage;
