export interface IErrorStatusCode {
  [x: string]: number;
}

export interface IError {
  status?: number;
  code: string;
  message: string;
}

export interface IGlobalError {
  [x: string]: {
    [x: string]: IError;
  };
}

export interface IAPIResponse {
  success: boolean;
  message: string;
  datas?: object | undefined | null;
  error?: IError | undefined | null;
}

export interface IUser {
  _id?: string | number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birth_date: Date | number | string;
  phone_number: string;
}

export interface IAdmin {
  _id?: string | number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone_number: string;
}
