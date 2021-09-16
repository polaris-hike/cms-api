'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('user', '/api/user', controller.user);
  router.resources('role', '/api/role', controller.role);
  router.resources('roleUser', '/api/roleUser', controller.roleUser);
  router.resources('resource', '/api/resource', controller.resource);
  router.resources('roleResource', '/api/roleResource', controller.roleResource);

  router.get('/role/getResource', controller.role.getResource);
  router.post('/role/setResource', controller.role.setResource);

  router.get('/role/getUser', controller.role.getUser);
  router.post('/role/setUser', controller.role.setUser);
};
