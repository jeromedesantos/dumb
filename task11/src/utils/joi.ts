import Joi from "joi";

export const userSchema = Joi.object({
  profile: Joi.string().allow(""),
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().min(10).max(255).required(),
  password: Joi.string().min(10).max(255).required(),
  role: Joi.string().min(3).max(50).required(),
});

export const productSchema = Joi.object({
  image: Joi.string().allow(""),
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().min(0).max(10000).required(),
  stock: Joi.number().min(0).max(10000).required(),
});

export const orderSchema = Joi.object({
  image: Joi.string().allow(""),
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().min(0).max(10000).required(),
  stock: Joi.number().min(0).max(10000).required(),
});
