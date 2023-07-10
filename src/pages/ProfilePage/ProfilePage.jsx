import ProfileStyle from "./ProfilePage.module.css";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
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
  const [colorText, setColorText] = useState("purple");
  const [message, setMessage] = useState("");
  const [valueForm, handleChanges, isMessage, showMessage, setValueForm] =
    useForm({
      name: "",
      email: "",
      password: "",
    });

  const isFormChanged =
    valueForm.name !== name ||
    valueForm.email !== email ||
    !!valueForm.password;

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

    dispatch(updateDataUserThunk(valueForm))
      .unwrap()
      .then((res) => {
        showMessage();
        setMessage("Данные изменены успешно");
        setColorText("purple");
      })
      .catch((err) => {
        showMessage();
        setMessage("Возникла ошибка при отправке данных");
        setColorText("red");
      });

    setValueForm({ ...valueForm, password: "" });
  };

  const handledDfaultValue = () => {
    setValueForm({ ...valueForm, name: name, email: email, password: "" });
    setMessage("");
  };

  useEffect(() => {
    handledDfaultValue();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isFormChanged) {
      setMessage("");
    }
  }, [isFormChanged]);

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
      <FormBody
        onSubmit={handlerSubmit}
        colorText={colorText}
        message={message}
        isMessage={isMessage}
      >
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
        {isFormChanged && (
          <div>
            <Button htmlType="submit" type="primary" size="large">
              Изменить
            </Button>
            <Button
              htmlType="reset"
              type="secondary"
              size="large"
              onClick={handledDfaultValue}
            >
              Сбросить
            </Button>
          </div>
        )}
      </FormBody>
    </div>
  );
};

export default ProfilePage;
