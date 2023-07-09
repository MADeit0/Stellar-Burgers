import ProfileStyle from "./ProfilePage.module.css";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutThunk, updateDataUserThunk } from "../../store/auth/authAction";
import FormBody from "../../components/FormBody/FormBody";
import useForm from "../../hooks/useForm";

const setActive = ({ isActive }) =>
  `${ProfileStyle.link} ${
    isActive ? ProfileStyle.active : "text_color_inactive"
  }`;

const ProfilePage = () => {
  const { email, name } = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [valueForm, handleChanges, setValueForm] = useForm({
    name: "",
    email: "",
    password: "",
  });

  const onIconClick = () => {
    const input = inputRef.current;
    input.disabled = false;
    input.focus();
    input.classList.remove("input__textfield-disabled");
  };

  const disabledToggle = () => {
    const input = inputRef.current;
    input.classList.add("input__textfield-disabled");
    input.disabled = true;
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDataUserThunk(valueForm));
    setValueForm({ ...valueForm, password: "" });
  };

  const handleCancelForm = () => {
    setValueForm({ ...valueForm, name: name, email: email, password: "" });
  };

  useEffect(() => {
    handleCancelForm();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={ProfileStyle.profile}>
      <div className={ProfileStyle.column}>
        <ul className={ProfileStyle.navigation}>
          <li>
            <NavLink to="/profile" className={setActive}>
              <span className="text text_type_main-medium ">Профиль</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="orders" className={setActive}>
              <span className="text text_type_main-medium ">
                История заказов
              </span>
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => dispatch(logoutThunk())}
              className={ProfileStyle.btn}
            >
              <span
                className={`${ProfileStyle.exit} text text_type_main-medium text_color_inactive`}
              >
                Выход
              </span>
            </button>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
        </p>
      </div>
      <FormBody onSubmit={handlerSubmit} btn="Изменить" isBtnVisible={true}>
        <Input
          disabled={true}
          onBlur={disabledToggle}
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChanges}
          value={valueForm.name}
          icon={"EditIcon"}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <EmailInput
          onChange={handleChanges}
          value={valueForm.email}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput
          onChange={handleChanges}
          value={valueForm.password}
          name={"password"}
          icon="EditIcon"
        />
        <Button
          htmlType="reset"
          type="primary"
          size="large"
          extraClass="mb-20"
          onClick={handleCancelForm}
        >
          Cancel
        </Button>
      </FormBody>
    </div>
  );
};

export default ProfilePage;
