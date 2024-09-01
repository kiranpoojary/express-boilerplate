import { perfectPayloadV1 } from "perfect-payload";

export const validatePayload = ({ rule }) => {
  return (req, res, next) => {
    const { statusCode, ...response } = perfectPayloadV1(req?.body, rule);
    if (+statusCode >= 200 && +statusCode <= 299) {
      next();
    } else res.status(statusCode).json(response);
  };
};
