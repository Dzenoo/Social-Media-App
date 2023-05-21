import { validate } from "@/utils/validators";
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.inputValue,
        isValid: validate(action.inputValue, action.validators),
      };
    }
    case "TOUCH": {
      return { ...state, isTouched: true };
    }
    default:
      return state;
  }
};

export const useValidation = (validators) => {
  const [state, dispatch] = useReducer(reducer, {
    value: "",
    isTouched: false,
    isValid: true,
  });

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE",
      inputValue: e.target.value,
      validators: validators,
    });
  };

  const handleBlur = () => {
    dispatch({ type: "TOUCH" });
  };

  return {
    value: state.value,
    isValid: state.isValid,
    isTouched: state.isTouched,
    onChangeHandler: handleChange,
    onBlurHandler: handleBlur,
  };
};
