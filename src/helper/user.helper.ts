import { IUser } from 'src/types/types';

const formatUserLoginResponse = (user: IUser): IUser => {
  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    birth_date: user.birth_date,
    phone_number: user.phone_number,
  };
};

const formatUserRegisterResponse = (user: IUser): IUser => {
  const formatedUser = {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    birth_date: user.birth_date,
    phone_number: user.phone_number,
  };
  return formatedUser;
};

export { formatUserLoginResponse, formatUserRegisterResponse };
