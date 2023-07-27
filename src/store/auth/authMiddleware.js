import { authInstance, interceptorsAuth } from "../../utils/api/axiosClient";
import { setAuthChecked, setUser } from "./authSlice";
import {  token } from "../../utils/constants";

export const checkUserAuth = () => async (dispatch) => {
  if (localStorage.getItem(token.ACCESS_TOKEN)) {
    try {
      const res = await authInstance.get("/user", {
        headers: {
          authorization: localStorage.getItem(token.ACCESS_TOKEN),
        },
      });
      dispatch(setUser(res.data.user));
      return res;
    } catch (error) {
      localStorage.removeItem(token.ACCESS_TOKEN);
      localStorage.removeItem(token.REFRESH_TOKEN);
      dispatch(setUser(null));
    } finally {
      dispatch(setAuthChecked(true));
    }
  } else {
    dispatch(setAuthChecked(true));
  }
};

authInstance.interceptors.response.use((res) => res, interceptorsAuth);
