import RegisterStyle from "./RegisterPage.module.css";

import FormBody from "../../components/FormBody/FormBody";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const RegisterPage = () => {
  const [value, setValue] = useState("password");
  const inputRef = useRef(null);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`mt-30 ${RegisterStyle.colum}`}>
      <FormBody title="Регистрация" btn="Зарегистрироваться">
        <Input
          type={"text"}
          placeholder={"placeholder"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="ml-1"
        />
        <EmailInput
          onChange={onChange}
          value={value}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput onChange={onChange} value={value} name={"password"} />
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
