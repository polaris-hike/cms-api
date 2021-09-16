const BaseService = require('./base');

class RoleService extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }

  async getResource() {
    const { app } = this;
    const resoures = await app.mysql.select('resource');
    const rootMenus = [];
    const map = {};
    resoures.forEach(resouce => {
      resouce.children = [];
      map[resouce.id] = resouce;
      if (resouce.parent_id === 0) {
        rootMenus.push(resouce);
      } else {
        map[resouce.parent_id].children.push(resouce);
      }
    });
    return rootMenus;
  }

  async setResource({ roleId, resourceIds }) {
    const { app } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      await conn.query('DELETE FROM role_resource WHERE role_id=?', [ roleId ]);
      for (let i = 0; i < resourceIds.length; i++) {
        await conn.insert('role_user', {
          role_id: roleId,
          resource_id: resourceIds[i],
        });
      }
      await conn.commit();
    } catch (e) {
      await conn.rollback();
      throw e;
    }
  }

  async getUser() {
    const { app } = this;
    const users = await app.mysql.select('user');
    return users;
  }

  async setUser({ roleId, userIds }) {
    const { app } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      await conn.query('DELETE FROM role_user WHERE role_id=?', [ roleId ]);
      for (let i = 0; i < userIds.length; i++) {
        await conn.insert('role_user', {
          role_id: roleId,
          user_id: userIds[i],
        });
      }
      await conn.commit();
    } catch (e) {
      await conn.rollback();
      throw e;
    }
  }
}

module.exports = RoleService;
