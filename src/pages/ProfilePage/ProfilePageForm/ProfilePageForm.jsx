import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDataUserThunk } from "../../../store/auth/authAction";
import FormBody from "../../../components/FormBody/FormBody";
import useForm from "../../../hooks/useForm";

const ProfilePageForm = () => {
  const { email, name } = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [colorText, setColorText] = useState("purple");
  const [message, setMessage] = useState("");
  const [valueForm, handleChanges, isMessage, showMessage, setValueForm] =
    useForm({
      name: "",
      email: "",
      password: "",
    });

  const isFormChanged =
    valueForm.name !== name ||
    valueForm.email !== email ||
    !!valueForm.password;

  const onIconClick = () => {
    const input = inputRef.current;
    input.disabled = false;
    input.focus();
    input.classList.remove("input__textfield-disabled");
  };

  const disabledToggle = () => {
    const input = inputRef.current;
    input.classList.add("input__textfield-disabled");
    input.disabled = true;
  };

  const handlerSubmit = (e) => {
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

  const handledDfaultValue = () => {
    setValueForm((prev) => ({ ...prev, ...valueForm, name: name, email: email, password: "" }));
    setMessage("");
  };

  useEffect(() => {
    handledDfaultValue();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isFormChanged) {
      setMessage("");
    }
  }, [isFormChanged]);

  return (
    <FormBody
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
        value={valueForm.name}
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
        value={valueForm.email}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
      />
      <PasswordInput
        onChange={handleChanges}
        value={valueForm.password}
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
            onClick={handledDfaultValue}
          >
            Сбросить
          </Button>
        </div>
      )}
    </FormBody>
  );
};

export default ProfilePageForm;
