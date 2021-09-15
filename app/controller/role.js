'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'role'
  }
}

module.exports = UserController;
