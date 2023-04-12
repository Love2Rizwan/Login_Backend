const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  OrganisationName: {
    type: String,
    required: true,
  },
  GstNumber: {
    type: String,
    unique: true,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  MobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTKEY, {
    expiresIn: "7d",
  });
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    middleName: Joi.string().required().label("Middle Name"),
    lastName: Joi.string().required().label("Last Name"),
    OrganisationName: Joi.string().required().label("Organisation Name"),
    GstNumber: Joi.string().required().label("Gst Number"),
    MobileNumber: Joi.string().required().label("Mobile Number"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    Address: Joi.string().required().label("Address"),
  });
	return schema.validate(data);
};

module.exports = { User, validate };
