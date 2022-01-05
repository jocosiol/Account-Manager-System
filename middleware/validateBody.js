const Ajv = require('ajv');
const ajv = new Ajv();

function validateBody(schema) {
    return (req, res, next) => {
      const validate = ajv.compile(schema);
      const valid = validate(req.body);
      if (!valid) {
        res.status(403).send('Invalid body');
        return;
      }
      next()
    };
  }
  
  module.exports = { validateBody };