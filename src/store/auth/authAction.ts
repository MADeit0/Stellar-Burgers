import { authInstance } from "../../utils/api/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { token } from "../../utils/constants";
import { ResponseAuth, User, UserToken } from "../../utils/types";
import { AxiosError } from "axios";

type UserPayload = UserToken & { user: User };

/**
 * Асинхронное действие для регистрация пользователя
 * @async
 * @function registerUserThunk
 * @param {User} dataUser Данные пользователя для регистрации
 * @returns {Promise<UserPayload>} Промис, который возвращает объект с данными пользователя и токеном
 * @throws {ResponseAuth | string} Объект с ошибкой аутентификации или 
 * строка с сообщением об ошибке если промис не вернул ответ.
 */
export const registerUserThunk = createAsyncThunk<
  UserPayload,
  User,
  { rejectValue: ResponseAuth | string }
>("user/registerUserThunk", async (dataUser, { rejectWithValue }) => {
  try {
    const res = await authInstance.post("/register", dataUser);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<ResponseAuth>;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data);
    } else {
      return rejectWithValue("An error occurred");
    }
  }
});

/**
 * Асинхронное действие для входа пользователя
 * @async
 * @function loginUserThunk
 * @param {User} dataUser Данные пользователя для входа
 * @returns {Promise<UserPayload>} Промис, который возвращает объект с данными пользователя и токеном
 * @throws {ResponseAuth | string} Объект с ошибкой аутентификации или 
 * строка с сообщением об ошибке если промис не вернул ответ.
 */
export const loginUserThunk = createAsyncThunk<
  UserPayload,
  User,
  { rejectValue: ResponseAuth | string }
>("user/loginUserThunk", async (dataUser, { rejectWithValue }) => {
  try {
    const res = await authInstance.post("/login", dataUser);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<ResponseAuth>;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data);
    } else {
      return rejectWithValue("An error occurred");
    }
  }
});

/**
 * Асинхронное действие для выхода пользователя
 * @async
 * @function logoutThunk
 * @returns {Promise<ResponseAuth>} Промис, который возвращает объект
 * содержащий результат запроса и сообщение с успешным выходом пользователя
 * @throws {ResponseAuth | string} Объект с ошибкой аутентификации или 
 * строка с сообщением об ошибке если промис не вернул ответ.
 */
export const logoutThunk = createAsyncThunk<
  ResponseAuth,
  undefined,
  { rejectValue: ResponseAuth | string }
>("user/logoutThunk", async (_, { rejectWithValue }) => {
  try {
    const res = await authInstance.post("/logout", {
      token: localStorage.getItem(token.REFRESH_TOKEN),
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<ResponseAuth>;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data);
    } else {
      return rejectWithValue("An error occurred");
    }
  }
});

/**
 * Асинхронное действие для обновления данных пользователя
 * @async
 * @function updateDataUserThunk
 * @param {User} dataUser Новые данные пользователя
 * @returns {Promise<{user: User}>} Промис, который возвращает объект с обновленными данными пользователя
 * @throws {ResponseAuth | string} Объект с ошибкой аутентификации или 
 * строка с сообщением об ошибке если промис не вернул ответ.
 */
export const updateDataUserThunk = createAsyncThunk<
  { user: User },
  User,
  { rejectValue: ResponseAuth | string }
>("user/updateDataUserThunk", async (dataUser, { rejectWithValue }) => {
  try {
    const res = await authInstance.patch("/user", dataUser, {
      headers: {
        authorization: localStorage.getItem(token.ACCESS_TOKEN),
      },
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<ResponseAuth>;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data);
    } else {
      return rejectWithValue("An error occurred");
    }
  }
});

/**
 * Асинхронное действие для проверки аутентификации пользователя.
 * @async
 * @function checkUserAuthThunk
 * @returns {Promise<{ user: User }>}Промис, который возвращает объект с информацией о пользователе.
 * @throws {ResponseAuth|string} Объект с ошибкой аутентификации или 
 * строка с сообщением об ошибке если промис не вернул ответ.
 */
export const checkUserAuthThunk = createAsyncThunk<
  { user: User },
  undefined,
  { rejectValue: ResponseAuth | string }
>("user/checkUserAuthThunk", async (_, { rejectWithValue }) => {
  try {
    const res = await authInstance.get("/user", {
      headers: {
        authorization: localStorage.getItem(token.ACCESS_TOKEN),
      },
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<ResponseAuth>;
    if (axiosError.response) {
      return rejectWithValue(axiosError.response.data);
    } else {
      return rejectWithValue("An error occurred");
    }
  }
});
