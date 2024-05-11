const Joi = require("joi")

const userValidator = Joi.object({
  username: Joi.string()
    .required()
    .error(()=>{throw new Error("Username is required.")}),
  password: Joi.string()
    .required()
    .error(()=>{throw new Error("Password is required.")})
})

module.exports = userValidator;