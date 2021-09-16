'use strict';

const BaseController = require('./base');

class UserController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }


  async getResource() {
    const { ctx, service } = this;
    const result = await service.role.getResource();
    ctx.body = result;
  }

  async setResource() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    await service.role.setResource(body);
    this.success('授权成功');
  }

  async getUser() {
    const { ctx, service } = this;
    const result = await service.role.getUser();
    ctx.body = result;
  }

  async setUser() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    await service.role.setUser(body);
    this.success('授权成功');
  }
}

module.exports = UserController;
