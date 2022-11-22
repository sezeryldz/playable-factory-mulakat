import express from 'express'
import userService from '../services/prisma.users.service'

// jsonwebtoken library is for generating jwt tokens
import jwt from 'jsonwebtoken'

interface JWTI {
  exp: string
  data: {
    email: string
  }
}

class UsersMiddleware {
  async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    if (req.body && req.body.email && req.body.password) {
      next()
    } else {
      res.status(400).send({
        error: 'Missing required fields email and password',
      })
    }
  }

  async validatePasswordField(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    if (req.body && req.body.password) {
      next()
    } else {
      res.status(400).send({
        error: 'Missing required field password',
      })
    }
  }

  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user = await userService.getUserByEmail(req.body.email)
    if (user) {
      res.status(400).send({ error: 'User email already exists' })
    } else {
      next()
    }
  }

  async validateEmailRegistered(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user = await userService.getUserByEmail(req.body.email)
    if (user) {
      next()
    } else {
      res.status(400).send({ error: 'User email is not registered' })
    }
  }

  async validateSameEmailBelongToSameUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user = await userService.getUserByEmail(req.body.email)
    if (user.id === Number(req.params.userId)) {
      next()
    } else {
      res.status(400).send({ error: 'Invalid email' })
    }
  }

  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const user = await userService.getUserById(Number(req.params.id))
    if (user) {
      next()
    } else {
      res.status(404).send({
        error: `User ${req.params.id} not found`,
      })
    }
  }

  async validateTodoExist(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await userService.getTodoById(Number(req.params.id))
    if (user) {
      next()
    } else {
      res.status(404).send({
        error: `Todo ${req.params.id} not found`,
      })
    }
  }

  async validateTodoIsOwnedByRequester(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const userData = await userService.getTodosByEmail(req.body.email)
    var chek = userData.todos.find((c) => c.userID === Number(req.body.id))

    if (chek === undefined) {
      res.status(401).send({
        message: 'You dont own this todo.',
      })
    } else {
      next()
    }
  }

  async extractId(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body.id = req.params.id
    next()
  }

  async authGuard(req: express.Request, res: express.Response, next: express.NextFunction) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]
      jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, async function (err, decoded) {
        if (err) {
          res.status(401).send({
            message: 'Token Expired',
          })
        } else {
          req.body.email = (<JWTI>(<unknown>decoded)).data.email
          next()
        }
      })
    } else {
      res.status(401).send({
        message: 'You have to login first',
      })
    }
  }

  async serveStatic(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.send('index.html')
  }
}

export default new UsersMiddleware()
