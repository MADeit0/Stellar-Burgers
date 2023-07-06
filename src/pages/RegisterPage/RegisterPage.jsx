import RegisterStyle from "./RegisterPage.module.css";

import FormBody from "../../components/FormBody/FormBody";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";

import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { registerUserThunk } from "../../store/auth/authAction";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [valueForm, handleChanges] = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserThunk(valueForm));
  };

  return (
    <div className={`mt-30 ${RegisterStyle.colum}`}>
      <FormBody
        onSubmit={handlerSubmit}
        title="Регистрация"
        btn="Зарегистрироваться"
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChanges}
          value={valueForm.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
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
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?
        <Link to="/login">
          <span className="text text_type_main-default pl-2">Войти</span>
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
