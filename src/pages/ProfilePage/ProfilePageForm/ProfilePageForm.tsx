import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useEffect, useRef, useState } from "react";
import { updateDataUserThunk } from "../../../store/auth/authAction";
import FormBody from "../../../components/FormBody/FormBody";
import useForm from "../../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../../hooks/hook";
import { User } from "../../../utils/types";

const ProfilePageForm = () => {
  const user = useAppSelector(({ auth }) => auth.user);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [colorText, setColorText] = useState("purple");
  const [message, setMessage] = useState("");
  const [
    valueForm,
    handleChanges,
    isMessage,
    showMessage,
    setValueForm,
  ] = useForm<User>({
    name: "",
    email: "",
    password: "",
  });

  const isFormChanged =
    valueForm.name !== user?.name ||
    valueForm.email !== user?.email ||
    !!valueForm.password;

  /**
   * Обработчик клика по иконке, устанавливает фокус и активирует поле ввода.
   */
  const onIconClick = () => {
    const input = inputRef.current;
    if (input) {
      input.disabled = false;
      input.focus();
      input.classList.remove("input__textfield-disabled");
    }
  };

  /**
   * Отключает поле ввода.
   */
  const disabledToggle = () => {
    const input = inputRef.current;
    if (input) {
      input.classList.add("input__textfield-disabled");
      input.disabled = true;
    }
  };

  /**
   * Обработчик события отправки формы для изменения данных пользователя.
   * @param {FormEvent<HTMLFormElement>} e - Событие отправки формы.
   * @returns {void}
   */
  const handlerSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(updateDataUserThunk(valueForm))
      .unwrap()
      .then((res) => {
        showMessage();
        setMessage("Данные изменены успешно");
        setColorText("purple");
      })
      .catch((err) => {
        showMessage();
        setMessage("Возникла ошибка при отправке данных");
        setColorText("red");
      });

    setValueForm((prev) => ({ ...prev, ...valueForm, password: "" }));
  };

  /**
   *  Возвращает изначальные данные пользователя которые существуют до подтверждения и перезаписи текущимию данными
   */
  const handledDefaultValue = () => {
    if (user) {
      setValueForm((prev) => ({
        ...prev,
        ...valueForm,
        name: user.name,
        email: user.email,
        password: "",
      }));
      setMessage("");
    }
  };

  useEffect(() => {
    handledDefaultValue();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isFormChanged) {
      setMessage("");
    }
  }, [isFormChanged]);

  return (
    <FormBody
      title=""
      onSubmit={handlerSubmit}
      colorText={colorText}
      message={message}
      isMessage={isMessage}
    >
      <Input
        disabled={true}
        onBlur={disabledToggle}
        type={"text"}
        placeholder={"Имя"}
        onChange={handleChanges}
        value={valueForm.name || ""}
        icon={"EditIcon"}
        name={"name"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
      />
      <EmailInput
        onChange={handleChanges}
        value={valueForm.email || ""}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
      />
      <PasswordInput
        onChange={handleChanges}
        value={valueForm.password || ""}
        name={"password"}
        icon="EditIcon"
      />
      {isFormChanged && (
        <div>
          <Button htmlType="submit" type="primary" size="large">
            Изменить
          </Button>
          <Button
            htmlType="reset"
            type="secondary"
            size="large"
            onClick={handledDefaultValue}
          >
            Сбросить
          </Button>
        </div>
      )}
    </FormBody>
  );
};

export default ProfilePageForm;
