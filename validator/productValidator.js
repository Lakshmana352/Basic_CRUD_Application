const Joi = require("joi")

const productValidator = Joi.object({
  name: Joi.string()
    .required()
    .error(()=>{throw new Error("Username is required.")}),
  description: Joi.string()
    .required()
    .error(()=>{throw new Error("Description is required.")}),
  price: Joi.string()
    .required()
    .error(()=>{throw new Error("Price is required.")})
})

module.exports = productValidator;