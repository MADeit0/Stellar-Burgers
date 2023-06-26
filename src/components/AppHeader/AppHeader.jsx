import { NavLink, Outlet } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyle from "./AppHeader.module.css";

const AppHeader = () => {
  const setActive = ({ isActive }) =>
    `p-5 ${headerStyle.link} ${
      isActive ? headerStyle.active : "text_color_inactive"
    }`;

  return (
    <>
      <header className={`${headerStyle.header} pt-4 pb-4`}>
        <div className={headerStyle.container}>
          <nav className={headerStyle.navigation}>
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
                <NavLink to="/login" className={setActive}>
                  <ListIcon type="secondary" />
                  <span className="text text_type_main-default pl-2">
                    Лента заказов
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>
          <Logo />
          <div className={headerStyle.profile}>
            <NavLink to="/profile" className={setActive}>
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default pl-2">
                Личный кабинет
              </span>
            </NavLink>
          </div>
        </div>
      </header>
      <main className={`${headerStyle.content} pb-10`}>
        <Outlet />
      </main>
    </>
  );
};

export default AppHeader;
