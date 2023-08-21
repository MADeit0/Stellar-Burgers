import RegisterStyle from "./RegisterPage.module.css";

import FormBody from "../../components/FormBody/FormBody";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import { registerUserThunk } from "../../store/auth/authAction";
import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../hooks/hook";
import { User } from "../../utils/types";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [valueForm, handleChanges, isMessage, showMessage] = useForm<User>({
    name: "",
    email: "",
    password: "",
  });

    /**
 * Обработчик события отправки формы для регистрации.
 * @param {FormEvent<HTMLFormElement>} e - Событие отправки формы.
 * @returns {void}
 */
  const handlerSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(registerUserThunk(valueForm))
      .unwrap()
      .catch((err) => {
        showMessage();
        setMessage("Произошла ошибка при регистрации");
      });
  };

  return (
    <div className={`mt-30 ${RegisterStyle.colum}`}>
      <FormBody
        onSubmit={handlerSubmit}
        title="Регистрация"
        colorText="red"
        message={message}
        isMessage={isMessage}
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChanges}
          value={valueForm.name || ""}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <EmailInput
          onChange={handleChanges}
          value={valueForm.email || ""}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          onChange={handleChanges}
          value={valueForm.password || ""}
          name={"password"}
        />
        <Button htmlType="submit" type="primary" size="large">
          Зарегистрироваться
        </Button>
      </FormBody>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?
        <Link to="/login">
          <span className="text text_type_main-default pl-2">Войти</span>
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
