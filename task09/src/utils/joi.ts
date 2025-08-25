import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().min(3).max(255).required(),
  password: Joi.string().min(3).max(255).required(),
  role: Joi.string().min(3).max(50).required(),
});

export const productSchema = Joi.object({
  name: Joi.string().email().min(5).max(100).required(),
  price: Joi.number().min(3).max(10).required(),
  stock: Joi.number().min(3).max(10).required(),
});
