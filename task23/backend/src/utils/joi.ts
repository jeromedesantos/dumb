import Joi from "joi";

export const userSchema = Joi.object({
  full_name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.base": "Full name should be a type of text",
      "string.empty": "Full name cannot be an empty field",
      "string.min": "Full name should have a minimum length of {#limit}",
      "string.max": "Full name should have a maximum length of {#limit}",
      "string.pattern.base": "Full name can only contain letters and spaces",
      "any.required": "Full name is a required field",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email address",
      "any.required": "Email is a required field",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is a required field",
  }),
});
