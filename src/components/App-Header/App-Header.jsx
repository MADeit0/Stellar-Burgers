import { NavLink } from "react-router-dom";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import headerStyle from "./App-Header.module.css";

const AppHeader = () => {
  const setActive = ({ isActive }) =>
    `p-5 ${headerStyle.link} ${
      isActive ? headerStyle.active : "text_color_inactive"
    }`;

  return (
    <header className={`${headerStyle.header} pt-4 pb-4`}>
      <div className={headerStyle.container}>
        <nav>
          <ul className={headerStyle.lists}>
            <li>
              <NavLink to="/" className={setActive}>
                <BurgerIcon type="primary" />
                <span className="text text_type_main-default pl-2">
                  Конструктор
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="./b" className={setActive}>
                <ListIcon type="secondary" />
                <span className="text text_type_main-default pl-2">
                  Лента заказов
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Logo />
        <NavLink to="./c" className={setActive}>
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default pl-2">
            Личный кабинет
          </span>
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
