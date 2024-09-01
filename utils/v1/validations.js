//--------DEFAULT VALUES IF NOT SPECIFIED------------
// mandatory            : false
// allowNull            : true
// type 		            : any
// min                  : ignored
// max                  : ignored
// preventDecimal       : false
// enum                 : ignored
// range                : ignored
// dependecy 	          : ignored
//
// ******************************************************************************
//
// ---------Custom Error Message Attributes---------
// mandatoryError       : string
// allowNullError       : string
// typeError            : string
// preventDecimalError  : string
// minError             : string
// maxError             : string
// regexError           : string
// minLengthError       : string
// maxLengthError       : string
// emptyObjectError     : string
// ******************************************************************************
//
export const EXAMPLE_VALIDATION_RULE = {
  id: {
    mandatory: true,
    allowNull: true,
    type: "uuid",
  },
  batchId: {
    mandatory: true,
    allowNull: true,
    type: "objectId",
  },
  firstName: {
    mandatory: true,
    allowNull: false,
    type: "string",
    minLength: 3,
    maxLength: 6,
  },
  lastName: {
    mandatory: false,
    allowNull: true,
    type: "string",
  },
  age: {
    type: "number",
    min: 0.1,
    max: 120,
  },
  isAdult: {
    type: "boolean",
  },
  totalWins: {
    type: "number",
    min: 0,
    preventDecimal: true,
  },
  email: {
    type: "email",
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  githubLink: {
    type: "url",
  },
  accountStatus: {
    type: "enum",
    enumValues: ["Active", "Inactive"],
  },
  marks: {
    range: "0-100",
  },
  totalScore: {
    type: "number",
    dependency: {
      result: {
        setDependencyRule: (totalScore, result) => {
          return { mandatory: true, allowNull: false, type: "string" };
        },
      },
    },
  },
  result: {
    type: "string",
    dependency: {
      totalScore: {
        setDependencyRule: (result, totalScore) => {
          return { mandatory: true, allowNull: false, type: "number" };
        },
      },
    },
  },
  minSalary: {
    mandatory: true,
    min: 1,
    type: "number",
    dependency: {
      maxSalary: {
        setDependencyRule: (minSalary, maxSalary) => {
          return {
            mandatory: true,
            min: minSalary + 1,
            minError: "maxSalary must be more than minSalary",
          };
        },
      },
    },
  },
  maxSalary: {
    dependency: {
      minSalary: {
        setDependencyRule: (maxSalary, minSalary) => {
          return {
            mandatory: true,
            max: maxSalary - 1,
            maxError: "minSalary must be less than maxSalary",
          };
        },
      },
    },
  },
  address: {
    mandatory: true,
    type: "object",
    allowEmptyObject: false,
    objectAttr: {
      country: { mandatory: true, type: "string" },
      state: {
        mandatory: true,
        type: "string",
      },
      city: {},
      zip: {
        mandatory: true,
        type: "string",
      },
      position: {
        mandatory: true,
        type: "object",
        allowEmptyObject: false,
        objectAttr: {
          lattitude: { mandatory: true, type: "number" },
          longitude: {
            mandatory: true,
            type: "number",
          },
        },
      },
    },
  },
};

export const SIGNUP_VALIDATION = {
  firstName: {
    mandatory: true,
    allowNull: false,
    type: "string",
  },
  lastName: {
    mandatory: false,
    allowNull: true,
    type: "string",
  },
  email: {
    mandatory: true,
    allowNull: false,
    type: "email",
  },
  phone: {
    mandatory: true,
    allowNull: false,
    type: "string",
    length: 10, //pending
    regex: "", //pending
  },
  age: {
    mandatory: false,
    type: "number",
    min: 1,
    max: 120,
  },
};
