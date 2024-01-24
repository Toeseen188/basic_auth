import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { UserDto } from './dto/user.dto'
import { type ResponseType } from './auth.types'

@Controller('auth')
export class AuthController {
  constructor (
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register (@Body() user: RegisterDto): Promise<ResponseType | undefined> {
    try {
      const existingUser = await this.userService.findUserByUsername(
        user.username
      )
      if (existingUser !== null) {
        console.log(`User: ${user.username} already exist`)
        return {
          message: `User: ${user.username} already exist`,
          statusCode: 409
        }
      }
      const newUser = await this.userService.createUser({
        username: user.username,
        password: user.password
      })
      if (newUser !== null) {
        console.log(`User: ${user.username} is created successfully`)
        return {
          message: `User: ${user.username} created Successfully`,
          statusCode: 201
        }
      }
      return { message: 'Error creating user', statusCode: 401 }
    } catch (error) {
      console.error('Cannot connect to endpoint auth/register', error)
      return { message: 'Internal SErver Error', statusCode: 500 }
    }
  }

  @Post('login')
  async login (@Body() user: UserDto): Promise<ResponseType | undefined> {
    try {
      const userExist = await this.authService.validateUser(
        user.username,
        user.password
      )

      if (userExist.user !== null) {
        if (userExist.isValid) {
          const token = this.authService.generateToken(userExist.user)
          console.log(
          `User: ${user.username} is logged in successfully. Access Token created`
          )
          return {
            message: 'User logged in Successfully',
            access_token: token,
            statusCode: 201
          }
        }
        return { message: 'Password incorrect. Please input the correct password', statusCode: 401 }
      }

      return {
        message: 'User Not Found. Please login with the correct credentials',
        statusCode: 401
      }
    } catch (error) {
      console.error('Error logging in through the endpoint auth/login', error)
      return { message: 'Internal Server Error', statusCode: 500 }
    }
  }
}
