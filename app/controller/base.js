'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
    success(data) {
        this.ctx.body = {
            code: 200,
            data
        };
    }
    error(error) {
        this.ctx.body = {
            code: 200,
            error
        };
    }
    async index() {
        const { ctx, service } = this;
        const { pageNum, pageSize, ...where } = ctx.query;
        const list = await service[this.entity].list(Number(pageNum), Number(pageSize), where);
        this.success(list);
    }

    async create() {
        const { ctx, service } = this;
        const body = ctx.request.body;
        const result = await service[this.entity].create(body);
        result ? this.success('创建成功') : this.error('创建失败');
    }

    async update() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const body = ctx.request.body;
        body.id = id;
        const result = await service[this.entity].update(body);
        result ? this.success('更新成功') : this.error('更新失败');
    }

    async destroy() {
        const { ctx, service } = this;
        const id = ctx.params.id;
        const result = await service[this.entity].destroy(id);
        result ? this.success('删除成功') : this.error('删除失败');
    }
}

module.exports = BaseController;
