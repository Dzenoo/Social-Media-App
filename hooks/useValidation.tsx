import {
  ReduceActionTypes,
  ReducerStateTypes,
  ValidatorTypes,
} from "@/types/validator";
import { validate } from "@/utils/validators";
import { ChangeEvent, useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
  isValid: false,
};

const reducer = (state: ReducerStateTypes, action: ReduceActionTypes) => {
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

export const useValidation = (validators: ValidatorTypes[]) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      type: "CHANGE",
      inputValue: e.target.value,
      validators: validators,
    });
  };

  const handleBlur = (): void => {
    dispatch({ type: "TOUCH", inputValue: "", validators: [] });
  };

  return {
    value: state.value,
    isValid: state.isValid,
    isTouched: state.isTouched,
    onChangeHandler: handleChange,
    onBlurHandler: handleBlur,
  };
};
