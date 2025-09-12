import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  full_name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().min(10).max(255).required(),
  password: Joi.string().min(10).max(255).required(),
  photo_profile: Joi.string().allow(""),
  bio: Joi.string().min(3).max(100).required(),
});
