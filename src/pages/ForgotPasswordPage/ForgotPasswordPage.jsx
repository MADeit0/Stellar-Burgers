import forgotPassStyle from "./ForgotPasswordPage.module.css";

import FormBody from "../../components/FormBody/FormBody";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [valueForm, handleChanges, isMessage, showMessage] = useForm({
    email: "",
  });

  const handlerSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}/password-reset`, valueForm)
      .then((res) => {
        localStorage.setItem("emailSent", true);
        navigate("/reset-password");
        setMessage("");
      })
      .catch((error) => {
        showMessage()
        setMessage("Ошибка отправки email адреса");
      });
  };

  return (
    <div className={`mt-30 ${forgotPassStyle.colum}`}>
      <FormBody
        onSubmit={handlerSubmit}
        title="Восстановление пароля"
        colorText="red"
        message={message}
        isMessage={isMessage}
      >
        <EmailInput
          onChange={handleChanges}
          value={valueForm.email}
          name={"email"}
          isIcon={false}
        />
        <Button htmlType="submit" type="primary" size="large">
          Восстановить
        </Button>
      </FormBody>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Link to="/login">
          <span className="text text_type_main-default pl-2">Войти</span>
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
