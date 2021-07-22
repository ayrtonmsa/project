const {Validator} = require("node-input-validator")
const {Op} = require("sequelize")
const sequelize = require("sequelize")

class Validation {

  async check(res, rules, data) {
    const validations = new Validator(data, rules);
    const valid = await validations.check();
    if (!valid) {
      let errorMessages = [];
      for (const error of Object.values(validations.errors)) {
        errorMessages.push(error.message);
      }
      return errorMessages;
    }
  }

  async checkExistsAndResponseError(model, condition, errorMessage, $except = false) {
    if ($except) {
      if (await this.checkExistsWithExcept(model, condition, $except)) {
        return errorMessage;
      }
    } else {
      if (await this.checkExists(model, condition)) {
        return errorMessage;
      }
    }
  }

  async checkNotExistsAndResponseError(model, condition, errorMessage) {
    if (!await this.checkExists(model, condition)) {
      return errorMessage;
    }
  }

  async checkExistsWithExcept(model, condition, except) {
    return await model.count({
      where: sequelize.and(
        {
          id: {
            [Op.ne]: except,
          },
        },
        condition
      )
    });
  }

  async checkExists(model, condition) {
    return await model.count(
      {where: condition}
    );
  }

  async checkHasRelation(model, relation, id, message, userId) {
    const result = await model.scope({method: ['auth', userId]})
      .findByPk(id, {
        include: [{
          model: relation,
          required: true
        }]
      });
    if (result) {
      return message;
    }
  }

  generateArrayValidationRules(rulesObject, arrayKeyName) {
    let newObject = {};
    Object.keys(rulesObject).map((item) => {
      newObject[arrayKeyName + ".*." + item] = rulesObject[item];
    });
    return newObject;
  }

  async verifyErrorsAndReturn(errorBag) {
    if (errorBag) {
      let errors = [];
      await errorBag.forEach(function (value) {
        value.forEach(function (val) {
          errors.push(val);
        });
      });
      return {errors: errors};
    }
  }
}

module.exports = new Validation();
