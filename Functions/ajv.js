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
    state: {          
      type: 'string',
      minLength: 1,
    },
    city: {
      type: 'string',
      minLength: 1,
    },
    email: {
      type: 'string',
      minLength: 1,
    },
    birthday: { //Need to format to date not string
      type: 'string',
      minLength: 1,
      /*type: 'date',
      min: '0000-00-00',
      max: '9999-99-99'*/
    },
    favGame: {
      type: 'string',
      minLength: 1,
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
    secret: { // require below if needed for MFA
      type: 'string',
    },
  },
  required: ['username', 'password'],
  additionalProperties: false,
};

const userSchema = { // need to edit
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    /*password: {
      type: 'string',
    },*/ //In case we ever want to see password(encrypted)
    state: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    birthday: { // check if this is right. //Need to format to date not string
      type: 'date',
    },
    favGame: {
      type: 'string',
    },
  },
  required: [],
  additionalProperties: false,
};

const eventSchema = { // need to format for eventSchema
  type: 'object',
  properties: {
    eventName: {
      type: 'string',
    },
    eventHostname: {
      type: 'string',
    },
    eventDescription: {
      type: 'string',
    },
    eventGame: {
      type: 'string',
    },
    eventTime: { 
      type: 'string',
      //type: 'date',
    },
    eventAddress: {
      type: 'string',
    },
    eventMaxAttendance: {
      type: 'string',
    },
    eventAttending: {
      type: 'string',
    },
  },
  required: [],
  additionalProperties: false,
};


module.exports = { // validation for each shema
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
  validateEvent(data) {
    if (data !== null && data !== undefined) {
      const validate = ajv.compile(eventSchema);
      validate(data);
      return (validate.errors);
    }
    return ('No data received.');
  },
};
