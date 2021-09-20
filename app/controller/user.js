'use strict';

const BaseController = require('./base');
const { sign } = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');

class UserController extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'user';
  }

  async captcha() {
    const { ctx } = this;
    const captchaObj = svgCaptcha.create();
    ctx.session.captcha = captchaObj.text;
    ctx.set('Content-Type', 'image/svg+xml');
    ctx.body = captchaObj.data;
  }

  async checkCaptcha() {
    const { ctx } = this;
    const captcha = ctx.request.body.captcha;
    if (captcha === ctx.session.captcha) {
      this.success('验证成功');
    } else {
      this.error('验证失败');
    }
  }

  async signup() {
    const { ctx, app } = this;
    const user = ctx.request.body;
    const result = await app.mysql.insert('user', user);
    if (result.affectedRows > 0) {
      this.success({
        id: result.insertId,
      });
    } else {
      this.error('注册失败');
    }
  }

  async signin() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const result = await app.mysql.select('user', {
      where: { username, password },
      limit: 1,
    });
    if (result && result.length) {
      const u = JSON.parse(JSON.stringify(result[0]));
      delete u.password;
      this.success(sign(u, this.config.jwtSecret));
    } else {
      this.error('登录失败');
    }
  }
}

module.exports = UserController;
