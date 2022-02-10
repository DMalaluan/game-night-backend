
const Ajv = require('ajv').default;

const ajv = new Ajv({ strict: true, allErrors: true });

const passSchema = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      minLength: 8,
    },
  },
  required: ['password'],
  additionalProperties: false,
};

const signupSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 1,
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 40,
      pattern: '((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!$%]).{8,40})', 
    },
    additionalProperties: false,
  },
};

const loginSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    secret: { //require below if needed for MFA
      type: 'string',
    },
  },
  required: ['username', 'password'],
  additionalProperties: false,
};

const userSchema = { //need to edit
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      state: {
        type: 'string',
      },
      city: {
        type: 'string',
      },
      birthday: { //check if this is right. 
        type: 'date',
      },
      email: {
        type: 'string'
      },
    },
    required: [],
    additionalProperties: false,
  };

  module.exports = { //validation for each shema
    validateLogin(data) {
      if (data !== null && data !== undefined) {
        const validate = ajv.compile(loginSchema);
        validate(data);
        return (validate.errors);
      }
      return ('No data received.');
    },
    validatePass(data) {
      if (data !== null && data !== undefined) {
        const validate = ajv.compile(passSchema);
        validate(data);
        return (validate.errors);
      }
      return ('No data received.');
    },
    validateSignup(data) {
      if (data !== null && data !== undefined) {
        const validate = ajv.compile(signupSchema);
        validate(data);
        return (validate.errors);
      }
      return ('No data received.');
    },
    validateUser(data) {
      if (data !== null && data !== undefined) {
        const validate = ajv.compile(userSchema);
        validate(data);
        return (validate.errors);
      }
      return ('No data received.');
    },
  };