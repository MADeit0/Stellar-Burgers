import loginStyle from "./LoginPage.module.css";

import FormBody from "../../components/FormBody/FormBody";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "../../store/auth/authAction";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [valueForm, handleChanges] = useForm({
    email: "",
    password: "",
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserThunk(valueForm));
  };

  return (
    <div className="mt-30">
      <FormBody onSubmit={handlerSubmit} title="Вход" btn="Войти">
        <EmailInput
          onChange={handleChanges}
          value={valueForm.email}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          onChange={handleChanges}
          value={valueForm.password}
          name={"password"}
        />
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
