// Perfect-payload   Validation
//DEFAULT VALUES IF NOT SPECIFIED
// mandatory        	    : false
// allowNull                : true
// type 		            : any
// min              	    : ignored
// max              	    : ignored
// preventDecimal   	    : false
// enum             	    : ignored
// range            	    : ignored
// dependecy 	            : a function which

export const EXAMPLE_VALIDATION_RULE = {
  id: {
    mandatory: true,
    allowNull: true,
    type: "uuid",
  },
  batchId: {
    mandatory: true,
    allowNull: true,
    type: "objectid",
  },
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
  age: {
    type: "number",
    min: 0.1,
    max: 120,
  },
  totalWins: {
    type: "number",
    min: 0,
    preventDecimal: true,
  },
  email: {
    type: "email",
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
    type: "number",
    dependency: {
      maxSalary: {
        setDependencyRule: (minSalary, maxSalary) => {
          return { mandatory: true, min: minSalary + 1 };
        },
      },
    },
  },
  maxSalary: {
    dependency: {
      minSalary: {
        setDependencyRule: (maxSalary, minSalary) => {
          return { mandatory: true, max: maxSalary - 1 };
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
