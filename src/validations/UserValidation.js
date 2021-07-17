const Validation = require("./Validation")
const User = require("../models/User")

class UserValidation {
  async store(req, res) {
    let errorBag = [];

    const errorCheck = await Validation.check(res, {...getRules()}, req.body);
    if (errorCheck) {
      errorBag.push(errorCheck);
    }

    const errorUnique = await checkUniques(req.body);
    if (errorUnique) {
      errorBag.push(errorUnique);
    }

    const errors = await Validation.verifyErrorsAndReturn(errorBag);
    if (errors) {
      return errors;
    }
  }

  async login(req, res) {
    let errorBag = [];

    const errorCheck = await Validation.check(res, {...getLoginRules()}, req.body);
    if (errorCheck) {
      errorBag.push(errorCheck);
    }

    const errors = await Validation.verifyErrorsAndReturn(errorBag);
    if (errors) {
      return errors;
    }
  }
}

async function checkUniques(body, id = false) {
  const { email } = body;

  let errorBag = [];

  if (email) {
    const errorEmail = await Validation.checkExistsAndResponseError(
      User,
      {email: email},
      "User with Email: " + email + " already exists!",
      id
    );
    if (errorEmail) {
      errorBag.push(errorEmail);
    }
  }

  return errorBag;
}

function getRules() {
  return {
    name: 'required|string',
    email: 'required|email',
    password: 'required|minLength:6'
  };
}

function getLoginRules() {
  return {
    email: 'required|email',
    password: 'required|minLength:6'
  };
}

module.exports = new UserValidation();
