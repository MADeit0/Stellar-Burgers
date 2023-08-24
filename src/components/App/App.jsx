import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import HomePage from "../../pages/HomePage/HomePage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";

import IngredientDetails from "../IngredientDetails/IngredientDetails";

import Modal from "../Modal/Modal";
import {
  OnlyAuth,
  OnlyUnAuth,
} from "../ProtectedRouteElement/ProtectedRouteElement";

import { checkUserAuthThunk } from "../../store/auth/authAction";
import { useEffect } from "react";
import OrdersPage from "../../pages/OrdersPage/OrdersPage";
import ProfilePageForm from "../../pages/ProfilePage/ProfilePageForm/ProfilePageForm";
import { fetchIngredientsDetails } from "../../store/burgerIngredients/burgerIngredientsSlice";
import FeedPage from "../../pages/FeedPage/FeedPage";
import FeedDetails from "../FeedDetails/FeedDetails";
import { useAppDispatch } from "../../hooks/hook";
import { token } from "../../utils/constants";
import { setAuthChecked } from "../../store/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    if (localStorage.getItem(token.ACCESS_TOKEN)) {
      dispatch(checkUserAuthThunk());
    } else {
      dispatch(setAuthChecked(true));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchIngredientsDetails());
    // eslint-disable-next-line
  }, []);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<AppHeader />}>
          <Route index element={<HomePage />} />
          <Route
            path="login"
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path="register"
            element={<OnlyUnAuth component={<RegisterPage />} />}
          />
          <Route path="feed" element={<FeedPage />} />
          <Route
            path="profile"
            element={<OnlyAuth component={<ProfilePage />} />}
          >
            <Route index element={<ProfilePageForm />} />
            <Route path="orders" element={<OrdersPage />} />
          </Route>

          <Route
            path="forgot-password"
            element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
          />
          <Route
            path="reset-password"
            element={<OnlyUnAuth component={<ResetPasswordPage />} />}
          />
          <Route
            path="/ingredients/:ingredientId"
            element={<IngredientDetails />}
          />
          <Route path="/feed/:orderId" element={<FeedDetails />} />
          <Route path="/profile/orders/:orderId" element={<FeedDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          ></Route>

          <Route
            path="/feed/:orderId"
            element={
              <Modal onClose={handleModalClose}>
                <FeedDetails />
              </Modal>
            }
          ></Route>

          <Route
            path="/profile/orders/:orderId"
            element={
              <Modal onClose={handleModalClose}>
                <FeedDetails />
              </Modal>
            }
          ></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
