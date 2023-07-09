import { useState } from "react";

const useForm = (inputValues) => {
  const [state, setState] = useState(inputValues);

  const handleChanges = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const resetState = () => {
    const newState = Object.keys(state).reduce((acc, key) => {
      return {
        ...acc,
        [key]: "",
      };
    }, {});

    setState(newState);
  };

  return [state, handleChanges, resetState];
};

export default useForm;
