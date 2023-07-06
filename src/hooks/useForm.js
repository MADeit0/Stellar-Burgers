import { useState } from "react";

const useForm = (inputValues) => {
  const [state, setState] = useState(inputValues);

  const handleChanges = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return [state, handleChanges];
};

export default useForm;
