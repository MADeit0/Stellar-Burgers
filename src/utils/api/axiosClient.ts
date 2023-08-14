import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { baseUrl, message, token } from "../constants";
import { store } from "../../store/store";
import { setUser } from "../../store/auth/authSlice";
import { ResponseAuth, UserToken } from "../types";

export const authInstance: AxiosInstance = axios.create({
  baseURL: `${baseUrl}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const orderInstance: AxiosInstance = axios.create({
  baseURL: `${baseUrl}/orders`,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Перехватчик запросов из библиотеки Axios
 * @async
 * @function interceptorsAuth
 * @param {AxiosError} error Объект ошибки Axios
 * @returns {Promise} Возвращает промис перехваченного запроса,
 * в случае ошибки "jwt expired" запускает функцию обновления токена
 * и повторно выполняет оригинальный запрос с обновленным токеном
 */
export const interceptorsAuth = async (
  error: AxiosError<ResponseAuth, InternalAxiosRequestConfig<unknown[]>>
) => {
  const originalRequest = error.config!; // Сохранение оригинального запроса
  const rejected = error.response?.data; // Получение данных об отклоненном запросе

  // Проверка, если токен JWT истек
  if (rejected?.message === message.JWT_EXPIRED) {
    try {
      // Обновление токена с помощью запроса к authInstance
      const refreshData: AxiosResponse<UserToken> = await authInstance.post(
        "/token",
        {
          token: localStorage.getItem(token.REFRESH_TOKEN),
        }
      );
      // Сохранение нового токена в локальном хранилище
      localStorage.setItem(token.ACCESS_TOKEN, refreshData.data.accessToken);
      localStorage.setItem(token.REFRESH_TOKEN, refreshData.data.refreshToken);

      // Обновление заголовка авторизации в оригинальном запросе
      originalRequest.headers.Authorization = localStorage.getItem(
        token.ACCESS_TOKEN
      );
      // Повторное выполнение оригинального запроса с обновленным токеном
      return await axios(originalRequest);
    } catch (error) {
      localStorage.removeItem(token.ACCESS_TOKEN);
      localStorage.removeItem(token.REFRESH_TOKEN);
      store.dispatch(setUser(null));
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};

authInstance.interceptors.response.use((res) => res, interceptorsAuth);
