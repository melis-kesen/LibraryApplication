const Joi = require("joi");

const getBookSchema = Joi.object({
  bookId: Joi.number().integer().positive().required(),
});

const createBookSchema = Joi.object({
  name: Joi.string().required(),
});
module.exports = { getBookSchema: getBookSchema, createBookSchema: createBookSchema };
