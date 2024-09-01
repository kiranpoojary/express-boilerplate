export function dataValidatorV1(
  data = payload,
  dataValidationRule = payloadValidationRules,
  validPayloadResponse = { statusCode: 200, valid: true },
  inValidPayloadResponse = {
    statusCode: 400,
    valid: false,
    message: "One or more invalid data found",
  }
) {
  let rowErrors = [];
  for (const attributeName in dataValidationRule) {
    let addNextError = true;
    const attributeRules = dataValidationRule?.[attributeName];
    const attrPath = dataValidationRule?.[attributeName]?.path || null;
    for (const ruleName in attributeRules) {
      const attributePath = `${attrPath ? attrPath + "." : ""}${attributeName}`;
      const attributeValue = data?.[attributeName] ?? null;
      const nullAllowed =
        dataValidationRule?.[attributeName]?.["allowNull"] ?? true;
      const isMandatoryField = attributeRules?.["mandatory"] ?? false;
      const attrExist = Object.keys(data)?.includes(attributeName); //Mandatory value check

      //mandatory value check
      if (ruleName === "mandatory" && isMandatoryField && !attrExist) {
        addNextError = false;
        rowErrors.push(
          attributeRules?.["mandatoryError"] || `${attributePath} is mandatory`
        );
      } else if (!attrExist) {
        addNextError = false;
      }

      //allowNull value check
      if (addNextError && ruleName === "allowNull" && attributeValue == null) {
        if (!dataValidationRule?.[attributeName]?.[ruleName]) {
          addNextError = false;
          rowErrors.push(
            attributeRules?.["allowNullError"] ||
              `value null/'' not valid for attribute ${attributePath}`
          );
        }
      }

      //allowEmptyObject check
      if (addNextError && ruleName === "allowEmptyObject") {
        if (
          !attributeRules?.["allowEmptyObject"] &&
          Object.keys(attributeValue).length == 0
        ) {
          rowErrors.push(
            attributeRules?.["emptyObjectError"] ||
              `value {} not valid for attribute ${attributePath}`
          );
          addNextError = false;
        }
      }

      //custom regex check
      if (addNextError && ruleName === "regex") {
        if (!isPassedRegex(attributeRules[ruleName], attributeValue)) {
          rowErrors.push(
            attributeRules?.["regexError"] ||
              `${attributePath} failed to pass the regex ${attributeRules[ruleName]}`
          );
          addNextError = false;
        }
      }

      //value type check
      if (addNextError && ruleName === "type") {
        if (attributeValue == null && nullAllowed) {
          addNextError = true;
        } else {
          switch (attributeRules[ruleName]) {
            case "number":
              if (!isNumber(attributeValue)) {
                rowErrors.push(
                  attributeRules?.["typeError"] ||
                    `Invalid ${typeof attributeValue} value(${attributeValue}) found in attribute ${attributePath}, required ${
                      attributeRules[ruleName]
                    } value`
                );
                addNextError = false;
              }
              break;

            case "string":
              if (!isString(attributeValue)) {
                rowErrors.push(
                  attributeRules?.["typeError"] ||
                    `Invalid ${typeof attributeValue} value(${attributeValue}) found in attribute ${attributePath}, required ${
                      attributeRules[ruleName]
                    } value`
                );
                addNextError = false;
              }
              break;
            case "boolean":
              if (!isBoolean(attributeValue)) {
                rowErrors.push(
                  attributeRules?.["typeError"] ||
                    `Invalid ${typeof attributeValue} value(${attributeValue}) found in attribute ${attributePath}, required ${
                      attributeRules[ruleName]
                    } value`
                );
                addNextError = false;
              }
              break;
            case "email":
              if (!isValidEmail(attributeValue)) {
                rowErrors.push(
                  attributeRules?.["typeError"] ||
                    `Invalid email ID(${attributeValue}) found in attribute ${attributePath}`
                );
                addNextError = false;
              }
              break;

            case "url":
              if (!isValidUrl(attributeValue)) {
                rowErrors.push(
                  attributeRules?.["typeError"] ||
                    `Invalid URL format(${attributeValue}) found in attribute ${attributePath}`
                );
                addNextError = false;
              }
              break;
            case "enum":
              if (attributeValue == null && nullAllowed) {
                addNextError = true;
              } else if (!isString(attributeValue)) {
                rowErrors.push(
                  attributeRules?.["typeError"] ||
                    `Invalid ${typeof attributeValue} value(${attributeValue}) found in attribute ${attributePath}, required string value`
                );
                addNextError = false;
              } else {
                const allEnumValues = attributeRules["enumValues"];
                if (!allEnumValues?.includes(attributeValue)) {
                  rowErrors.push(
                    attributeRules?.["typeError"] ||
                      `Invalid value(${attributeValue}) found in attribute ${attributePath}, valid values are ${allEnumValues?.join(
                        ", "
                      )}`
                  );
                  addNextError = false;
                }
              }
              break;
            case "uuid":
              if (attributeValue == null && nullAllowed) {
                addNextError = true;
              } else if (!isUUID(attributeValue)) {
                rowErrors.push(
                  attributeRules?.["typeError"] ||
                    `Invalid UUID(${attributeValue}) found in attribute ${attributePath}`
                );
                addNextError = false;
              }
              break;
            case "objectId":
              if (attributeValue == null && nullAllowed) {
                addNextError = true;
              } else {
                if (!isObjectId(attributeValue)) {
                  rowErrors.push(
                    attributeRules?.["typeError"] ||
                      `Invalid ObjectId(${attributeValue}) found in attribute ${attributePath}`
                  );
                  addNextError = false;
                }
              }
              break;

            case "array":
              if (!isArray(attributeValue)) {
                rowErrors.push(
                  attributeRules?.["typeError"] ||
                    `Invalid ${typeof attributeValue} value(${attributeValue}) found in attribute ${attributePath}, required ${
                      attributeRules[ruleName]
                    } value`
                );
                addNextError = false;
              }
              break;

            case "object":
              if (!isObject(attributeValue)) {
                rowErrors.push(
                  attributeRules?.["typeError"] ||
                    `Invalid ${typeof attributeValue} value(${attributeValue}) found in attribute ${attributePath}, required ${
                      attributeRules[ruleName]
                    } value`
                );
                addNextError = false;
              }
              break;

            default:
              break;
          }
        }
      }

      //minimum string length check
      if (addNextError && ruleName === "minLength") {
        if (attributeValue == null && nullAllowed) {
          addNextError = true;
        } else if (typeof attributeValue == "string") {
          if (attributeValue.length < +attributeRules[ruleName])
            rowErrors.push(
              attributeRules?.["minLengthError"] ||
                `${attributePath} should be minimum of ${attributeRules[ruleName]} character`
            );
          addNextError = false;
        } else {
          throw new Error(
            `perfect-payload:- minLength is applied only on string type values, found ${typeof attributeValue} type`
          );
        }
      }

      //max string length check
      if (addNextError && ruleName === "maxLength") {
        if (attributeValue == null && nullAllowed) {
          addNextError = true;
        } else if (typeof attributeValue == "string") {
          if (attributeValue.length > +attributeRules[ruleName])
            rowErrors.push(
              attributeRules?.["maxLengthError"] ||
                `${attributePath} can have maximum of ${attributeRules[ruleName]} character`
            );
          addNextError = false;
        } else {
          throw new Error(
            `perfect-payload:- maxLength is applied only on string type values, found ${typeof attributeValue} type`
          );
        }
      }

      //preventFraction
      if (addNextError && ruleName === "preventDecimal") {
        if (attributeValue == null && nullAllowed) {
          addNextError = true;
        } else if (!isNumber(attributeValue)) {
          rowErrors.push(
            `Invalid ${typeof attributeValue} value(${attributeValue}) found in attribute ${attributePath}, required number value`
          );
          addNextError = false;
        } else if (+attributeValue % 1 !== 0) {
          rowErrors.push(
            attributeRules?.["preventDecimalError"] ||
              `Decimal value not allowed in attribute ${attributePath}(${attributeValue})`
          );
          addNextError = false;
        }
      }

      //minimum value  check
      if (addNextError && ruleName === "min") {
        if (attributeValue == null && nullAllowed) {
          addNextError = true;
        } else if (!isNumber(attributeValue)) {
          rowErrors.push(
            `Invalid ${typeof attributeValue} value(${attributeValue}) found in attribute ${attributePath}, required number value`
          );
          addNextError = false;
        } else if (+attributeValue < +attributeRules[ruleName]) {
          rowErrors.push(
            attributeRules?.["minError"] ||
              `minimum value ${
                attributeRules[ruleName]
              } is allowed in attribute ${attributePath}, found value ${
                data[attributeName] ?? "Nil"
              }`
          );
          addNextError = false;
        }
      }

      //maximum value  check
      if (addNextError && ruleName === "max") {
        if (attributeValue == null && nullAllowed) {
          addNextError = true;
        } else if (!isNumber(attributeValue)) {
          rowErrors.push(
            `Invalid ${typeof attributeValue} value(${attributeValue}) found in attribute ${attributePath}, required number value`
          );
          addNextError = false;
        } else if (+attributeValue > +attributeRules[ruleName]) {
          rowErrors.push(
            attributeRules?.["maxError"] ||
              `maximum value ${
                attributeRules[ruleName]
              } is allowed in attribute ${attributePath}, found value ${
                data[attributeName] ?? "Nil"
              }`
          );
          addNextError = false;
        }
      }

      //value range  check
      if (addNextError && ruleName === "range") {
        if (attributeValue == null && nullAllowed) {
          addNextError = true;
        } else if (!isNumber(attributeValue)) {
          rowErrors.push(
            `Invalid ${typeof attributeValue} value(${attributeValue}) found in attribute ${attributePath}, required number value`
          );
          addNextError = false;
        } else {
          const [min, max] = attributeRules[ruleName].split("-");
          if (
            !isNumber(attributeValue) ||
            +attributeValue < +min ||
            +attributeValue > +max
          ) {
            rowErrors.push(
              attributeRules?.["rangeError"] ||
                `Invalid values(${attributeValue}) found in attribute ${attributePath}, value should be between ${min} and ${max} `
            );
            addNextError = false;
          }
        }
      }

      //nested object attributes check
      if (addNextError && ruleName === "objectAttr") {
        console.log({ attributeName });
        const allObjectAttr = Object.keys(attributeRules?.[ruleName]);
        const objectAttrRules = {};
        for (const attr of allObjectAttr) {
          objectAttrRules[attr] = {
            ...attributeRules?.[ruleName]?.[attr],
            path: attributeRules?.[ruleName]?.[attr]?.path
              ? attributeRules?.[ruleName]?.[attr]?.path + `.${attr}`
              : `${attributePath}`,
          };
        }

        console.log({ attributeValue, objectAttrRules });
        const { errors = [] } = dataValidatorV1(
          attributeValue,
          objectAttrRules
        );
        rowErrors = [...rowErrors, ...errors];
        addNextError = true;
      }

      //dependency check
      if (addNextError && ruleName === "dependency") {
        const allDependencyAttr = Object.keys(attributeRules?.[ruleName]);
        for (const attr of allDependencyAttr) {
          if (
            typeof attributeRules?.[ruleName]?.[attr]?.setDependencyRule ==
            "function"
          ) {
            const newRule = attributeRules?.[ruleName]?.[
              attr
            ]?.setDependencyRule(attributeValue, data?.[attr]);
            let newData = { [attributeName]: attributeValue };
            if (Object.keys(data).includes(attr)) {
              newData = { ...newData, [attr]: data?.[attr] };
            }
            const { errors = [] } = dataValidatorV1(newData, {
              [attr]: newRule,
            });
            rowErrors = [...rowErrors, ...errors];
            addNextError = true;
          } else {
            throw new Error(
              `perfect-payload:- function setDependencyRule not found in ${attr} dependency `
            );
          }
        }
      }
    }
  }

  if (rowErrors?.length) {
    return { ...inValidPayloadResponse, errors: rowErrors };
  } else {
    return validPayloadResponse;
  }
}

function isNumber(value) {
  return typeof value == "number";
}

function isString(value) {
  return typeof value == "string";
}

function isBoolean(value) {
  return typeof value == "boolean";
}

function isArray(value) {
  return Array.isArray(value);
}

function isObject(value) {
  return typeof value == "object";
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidUrl(url) {
  const urlRegex =
    /^(https?:\/\/)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(:[0-9]+)?(\/[^\s]*)?(\?[^\s]*)?$/;
  return urlRegex.test(url);
}

function isUUID(uuid) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

function isObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

function isPassedRegex(reExpression, value) {
  return reExpression.test(value);
}
