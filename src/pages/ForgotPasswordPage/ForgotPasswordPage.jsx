import forgotPassStyle from "./ForgotPasswordPage.module.css";

import FormBody from "../../components/FormBody/FormBody";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { Link } from "react-router-dom";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [value, setValue] = useState("password");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`mt-30 ${forgotPassStyle.colum}`}>
      <FormBody title="Восстановление пароля" btn="Восстановить">
        <EmailInput
          onChange={onChange}
          value={value}
          name={"email"}
          isIcon={false}
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

export default ForgotPasswordPage;
