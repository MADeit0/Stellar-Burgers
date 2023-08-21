import { ChangeEvent, useState } from "react";

type FormHookResult<T = unknown> = [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  boolean,
  () => void,
  React.Dispatch<React.SetStateAction<T>>
];

/**
 *Пользовательский хук собирающий данные введённые в инпуты.
 *
 * @param {T} inputValues входные значения формы
 * @returns {FormHookResult<T>}
 * * state Объект значений с формы
 * * handleChanges Берет введенные данные с инпута (необходимо указать в атрибуте) 
 * * isMessage Флаг для отображения сообщения
 * * showMessage Функция для показа сообщения
 * * setState Функция для обновления состоя, например сброса всех полей формы
 * @example
 * type User = {name: string, password: string}
 * useForm<User>({name: '', password: ''})
 */
const useForm = <T = unknown>(inputValues: T): FormHookResult<T> => {
  const [state, setState] = useState(inputValues);
  const [isMessage, setIsMessage] = useState(false);

  /**
   * Функция получения данных с импутов и сброс сообщения с результатом запроса
   * @param {ChangeEvent<HTMLInputElement>} e объект события
   * @returns {void}
   */
  const handleChanges = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = { ...state, [e.target.name]: e.target.value };
    setState(inputValue);
    setIsMessage(false);
  };
  /**
   * Меняет флаг для отображения сообщения
   * @returns {void}
   */
  const showMessage = (): void => {
    setIsMessage(true);
  };

  return [state, handleChanges, isMessage, showMessage, setState];
};

export default useForm;
