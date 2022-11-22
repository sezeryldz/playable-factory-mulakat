import debug from 'debug'
import { CreateUserDto } from '../dto/create.user.dto'
import { PrismaClient } from '@prisma/client'
const log: debug.IDebugger = debug('app:prisma-service')
const prisma = new PrismaClient()

class PrismaUsersService {
  constructor() {
    log('Created new instance of User')
  }

  async createUser(user: CreateUserDto) {
    const prismaUser = await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
      },
    })

    return {
      user: prismaUser,
    }
  }

  async deleteUserById(userId: number) {
    const deleteUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    })
    return deleteUser
  }

  async listAllUsers() {
    return await prisma.user.findMany()
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
  }

  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
    })
  }

  async updatePassword(email: string, password: string) {
    return await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: password,
      },
    })
  }

  async createTodo(email: string, text: string) {
    const prismaUser = await this.getUserByEmail(email)

    const prismaTodo = await prisma.todo.create({
      data: {
        userID: prismaUser.id,
        text: text,
      },
    })

    return prismaTodo
  }

  async getTodosByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        todos: true,
      },
    })
  }

  async getTodoById(id: number) {
    return await prisma.todo.findUnique({
      where: {
        id: id,
      },
    })
  }

  async removeTodoById(id: number) {
    const removedTodo = await prisma.todo.delete({
      where: {
        id: id,
      },
    })
    return removedTodo
  }
}

export default new PrismaUsersService()
