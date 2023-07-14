import ProfileStyle from "./ProfilePage.module.css";

import { useDispatch } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { logoutThunk } from "../../store/auth/authAction";

const setActive = ({ isActive }) =>
  `${ProfileStyle.link} ${
    isActive ? ProfileStyle.active : "text_color_inactive"
  }`;

const ProfilePage = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  
  return (
    <div className={ProfileStyle.profile}>
      <div className={ProfileStyle.column}>
        <ul className={ProfileStyle.navigation}>
          <li>
            <NavLink end to="/profile" className={setActive}>
              <span className="text text_type_main-medium ">Профиль</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/orders" className={setActive}>
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
        {pathname === "/profile" && (
          <p className="text text_type_main-default text_color_inactive">
            В&nbsp;этом разделе вы&nbsp;можете изменить свои персональные данные
          </p>
        )}

        {pathname === "/profile/orders" && (
          <p className="text text_type_main-default text_color_inactive">
            В&nbsp;этом разделе вы&nbsp;можете просмотреть свою историю заказов
          </p>
        )}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
