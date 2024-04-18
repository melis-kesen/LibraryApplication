const Joi = require("joi");

const getUserSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
});

const createUserSchema = Joi.object({
  name: Joi.string().required(),
});
const borrowBookSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  bookId: Joi.number().integer().positive().required(),
});
const returnBookSchemaParams = Joi.object({
  userId: Joi.number().integer().positive().required(),
  bookId: Joi.number().integer().positive().required(),
});
const returnBookSchemaBody = Joi.object({
  score: Joi.number().integer().min(0).max(100).required(),
});
module.exports = {
  getUserSchema: getUserSchema,
  createUserSchema: createUserSchema,
  borrowBookSchema:borrowBookSchema,
  returnBookSchemaParams: returnBookSchemaParams,
  returnBookSchemaBody: returnBookSchemaBody,
};
