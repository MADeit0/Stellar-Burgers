import forgotPassStyle from "./ForgotPasswordPage.module.css";

import FormBody from "../../components/FormBody/FormBody";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import { forgotPassword } from "../../store/auth/authAction";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueForm, handleChanges] = useForm({
    email: "",
  });

  const handlerSubmit = async (e) => {
    e.preventDefault();

    dispatch(forgotPassword(valueForm)).then((res) => {
      localStorage.setItem("emailSent", true)
      navigate("/reset-password");
    });
  };

  return (
    <div className={`mt-30 ${forgotPassStyle.colum}`}>
      <FormBody
        onSubmit={handlerSubmit}
        title="Восстановление пароля"
        btn="Восстановить"
      >
        <EmailInput
          onChange={handleChanges}
          value={valueForm.email}
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
