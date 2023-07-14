import { useState } from "react";

const useForm = (inputValues) => {
  const [state, setState] = useState(inputValues);
  const [isMessage, setIsMessage] = useState(false);

  const handleChanges = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setIsMessage(false);
  };

  const showMessage = () => {
    setIsMessage(true);
  };

  return [state, handleChanges, isMessage, showMessage, setState];
};

export default useForm;
