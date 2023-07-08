import { Routes, Route } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import HomePage from "../../pages/HomePage/HomePage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";

import {
  OnlyAuth,
  OnlyUnAuth,
} from "../ProtectedRouteElement/ProtectedRouteElement";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAuth } from "../../store/auth/authAction";

function App() {
  const isForgotPassword = useSelector(({ auth }) => auth.isForgotPassword);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <Routes>
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
        <Route
          path="profile"
          element={<OnlyAuth component={<ProfilePage />} />}
        />
        <Route
          path="forgot-password"
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />

        {isForgotPassword && (
          <Route
            path="reset-password"
            element={<OnlyUnAuth component={<ResetPasswordPage />} />}
          />
        )}
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
