const { Service } = require('egg');

class BaseService extends Service {
    async list(pageNum, pageSize, where) {
        const data = await this.app.mysql.select(this.entity,{
            where,
            order: [['id','asc'], ['username', 'asc']],
            offset: (pageNum - 1) * pageSize,
            limit: pageSize,
        });
        const total = await this.app.mysql.count(this.entity,where);
        return {data,total}
    }
    async create(args) {
        const result = await this.app.mysql.insert(this.entity,args);
        return result.affectedRows > 0;
    }
    async update(args) {
        const result = await this.app.mysql.update(this.entity,args);
        return result.affectedRows > 0;
    }
    async destroy(id) {
        const result =  await this.app.mysql.delete(this.entity, {id});
        return result.affectedRows > 0;
    }
}

module.exports = BaseService;