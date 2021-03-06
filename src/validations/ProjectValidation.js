const Validation = require("./Validation")
const Project = require("../models/Project")

class ProjectValidation {
  async store(req, res) {
    let errorBag = [];

    const errorCheck = await Validation.check(res, {...getRules()}, req.body);
    if (errorCheck) {
      errorBag.push(errorCheck);
    }

    const errorUnique = await checkUniques(req.body, req.user);
    if (errorUnique) {
      errorBag.push(errorUnique);
    }

    const errors = await Validation.verifyErrorsAndReturn(errorBag);
    if (errors) {
      return errors;
    }
  }
}

async function checkUniques(body, user, id = false) {
  const { title } = body;
  const userId = user.id;

  let errorBag = [];

  if (title) {
    const errorTitle = await Validation.checkExistsAndResponseError(
      Project,
      {title: title, userId},
      "Project with Title: " + title + " already exists for logged in User!",
      id
    );
    if (errorTitle) {
      errorBag.push(errorTitle);
    }
  }

  return errorBag;
}

function getRules() {
  return {
    'title': 'required|string',
    'description': 'required|string',
    'budget': 'required|string',
    'tags': 'required|array',
    'tags.*.name': 'required|string'
  };
}

module.exports = new ProjectValidation();
