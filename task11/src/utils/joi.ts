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
  price: Joi.number().min(0).max(1000000).required(),
  stock: Joi.number().min(0).max(1000000).required(),
});

export const orderSchema = Joi.object({
  userId: Joi.string().min(0).max(255).required(),
  productId: Joi.string().min(0).max(255).required(),
  qty: Joi.number().min(0).max(1000000).required(),
});

export const updateOrderSchema = Joi.object({
  qty: Joi.number().min(0).max(1000000).required(),
});

export const transferSchema = Joi.object({
  senderId: Joi.string().min(0).max(255).required(),
  receiverId: Joi.string().min(0).max(255).required(),
  amount: Joi.number().min(0).max(1000000).required(),
});
