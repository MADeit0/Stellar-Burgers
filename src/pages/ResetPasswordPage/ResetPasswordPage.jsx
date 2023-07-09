import resetPassStyle from "./ResetPasswordPage.module.css";

import FormBody from "../../components/FormBody/FormBody";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, Navigate, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { baseUrl } from "../../utils/constants";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [valueForm, handleChanges] = useForm({
    password: "",
    token: "",
  });

  const handlerSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}/password-reset/reset`, valueForm)
      .then((res) => {
        localStorage.removeItem("emailSent");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Неверный код сброса");
      });
  };

  return localStorage.getItem("emailSent") ? (
    <div className={`mt-30 ${resetPassStyle.colum}`}>
      <FormBody
        onSubmit={handlerSubmit}
        title="Восстановление пароля"
        btn="Сохранить"
      >
        <PasswordInput
          placeholder={"Введите новый пароль"}
          onChange={handleChanges}
          value={valueForm?.password}
          name={"password"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChanges}
          value={valueForm?.token}
          name={"token"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </FormBody>

      <p className="text text_type_main-default text_color_inactive">
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
