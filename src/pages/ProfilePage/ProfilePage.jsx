import ProfileStyle from "./ProfilePage.module.css";

import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutThunk } from "../../store/auth/authAction";

const setActive = ({ isActive }) =>
  `${ProfileStyle.link} ${
    isActive ? ProfileStyle.active : "text_color_inactive"
  }`;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("password");
  const inputRef = useRef(null);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

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
              <span className={`${ProfileStyle.exit} text text_type_main-medium text_color_inactive`}>Выход</span>
            </button>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
        </p>
      </div>
      <form className={ProfileStyle.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          icon={"EditIcon"}
          value={value}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <EmailInput
          onChange={onChange}
          value={value}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput
          onChange={onChange}
          value={value}
          name={"password"}
          icon="EditIcon"
        />
      </form>
    </div>
  );
};

export default ProfilePage;
