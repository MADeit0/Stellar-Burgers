import resetPassStyle from "./ResetPasswordPage.module.css";

import FormBody from "../../components/FormBody/FormBody";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const ResetPasswordPage = () => {
  const [value, setValue] = useState("password");
  const inputRef = useRef(null);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`mt-30 ${resetPassStyle.colum}`}>
      <FormBody title="Восстановление пароля" btn="Сохранить">
        <PasswordInput
          onChange={onChange}
          value={value}
          name={"password"}
        />
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
        />
      </FormBody>

      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?
        <Link to="/login">
          <span className="text text_type_main-default pl-2">Войти</span>
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
