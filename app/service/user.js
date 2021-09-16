const BaseService = require('./base');

class UserService extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'user';
  }

  async list(pageNum, pageSize, where) {
    const data = await this.app.mysql.select(this.entity, {
      where,
      order: [ [ 'id', 'asc' ], [ 'username', 'asc' ] ],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
    });

    for (let i = 0; i < data.length; i++) {
      const user = data[i];
      const resources = await this.app.mysql.query('select resource.* from resource\n' +
        'inner join role_resource on resource.id = role_resource.resource_id\n' +
        'INNER JOIN role_user on role_resource.role_id  = role_user.role_id\n' +
        'WHERE role_user.user_id = ?', [ user.id ]);
      const rootMenus = [];
      const map = {};
      resources.forEach(resouce => {
        resouce.children = [];
        map[resouce.id] = resouce;
        if (resouce.parent_id === 0) {
          rootMenus.push(resouce);
        } else {
          map[resouce.parent_id].children.push(resouce);
        }
      });
      user.resource = rootMenus;
    }

    const total = await this.app.mysql.count(this.entity, where);
    return { data, total };
  }
}

module.exports = UserService;
