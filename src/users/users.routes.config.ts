import { CommonRoutesConfig } from '../common/common.routes.config'
import UsersController from './controllers/users.controller'
import UsersMiddleware from './middleware/users.middleware'
import express from 'express'
import usersMiddleware from './middleware/users.middleware'
import usersController from './controllers/users.controller'
import path from 'path'

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes')
  }

  configureRoutes(): express.Application {
    this.app.use(express.static(path.join(__dirname, '../public')))

    this.app
      .route('/users')
      .get(UsersController.listUsers)
      .post(
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser,
      )

    this.app
      .route('/users/login')
      .post(
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateEmailRegistered,
        UsersController.loginUser,
      )
    this.app
      .route('/users/resetpassword')
      .post(
        UsersMiddleware.validatePasswordField,
        UsersMiddleware.authGuard,
        UsersController.resetPassword,
      )

    this.app
      .route('/users/todo')
      .post(UsersMiddleware.authGuard, UsersController.createTodo)
      .get(UsersMiddleware.authGuard, UsersController.getUsersTodos)

    this.app.param('id', UsersMiddleware.extractId)
    this.app
      .route('/users/todo/:id')
      .delete(
        UsersMiddleware.authGuard,
        usersMiddleware.validateTodoExist,
        usersMiddleware.validateTodoIsOwnedByRequester,
        usersController.removeTodo,
      )

    this.app.param('id', UsersMiddleware.extractId)
    this.app
      .route('/users/:id')
      .get(UsersMiddleware.validateUserExists, UsersController.getUserById)
      .delete(UsersMiddleware.validateUserExists, UsersController.removeUser)

    this.app.route('/').get(usersMiddleware.serveStatic)

    return this.app
  }
}
