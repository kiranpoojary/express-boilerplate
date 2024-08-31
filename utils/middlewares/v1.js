import { testValidator } from "../v1/test.js";
import { dataValidatorV1 } from "../validator.js";

export const validatePayload = ({ rule }) => {
  return (req, res, next) => {
    const { statusCode, ...response } = dataValidatorV1(req?.body, rule);
    console.log({ statusCode });
    if (+statusCode >= 200 && +statusCode <= 299) {
      next();
    } else res.status(statusCode).json(response);
  };
};
