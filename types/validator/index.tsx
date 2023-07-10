export interface ValidatorTypes {
  type: string;
  password?: string;
  val?: number;
}

export interface ReducerStateTypes {
  value: string;
  isTouched: boolean;
  isValid: boolean;
}

export interface ReduceActionTypes {
  type: string;
  inputValue: string;
  validators: ValidatorTypes[];
}
