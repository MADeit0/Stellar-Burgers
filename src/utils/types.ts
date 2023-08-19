import PropTypes from "prop-types";

const ingredientType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export default ingredientType;

export type Loading = "idle" | "pending" | "succeeded" | "failed";

export type User = {
  email?: string;
  name?: string;
  password?: string;
};

export type UserToken = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponseConfig = {
  message: string;
  success: boolean;
};
export type ErrorResponseConfig = AuthResponseConfig;

export type Tingredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  fakeId?: string;
};
