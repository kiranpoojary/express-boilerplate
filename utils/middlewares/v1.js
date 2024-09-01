import { dataValidatorV1 } from "../validator.js";

export const validatePayload = ({ rule }) => {
  return (req, res, next) => {
    const { statusCode, ...response } = dataValidatorV1(req?.body, rule);
    if (+statusCode >= 200 && +statusCode <= 299) {
      next();
    } else res.status(statusCode).json(response);
  };
};
