import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() user: { username: string; password: string }) {
    try {
      const existingUser = await this.userService.findUserByUsername(
        user.username,
      );
      if (existingUser) {
        console.log(`User: ${user.username} already exist`);
        return {
          message: `User: ${user.username} already exist`,
          statusCode: 400,
        };
      }
      const newUser = await this.userService.createUser({
        username: user.username,
        password: user.password,
      });
      if (newUser) {
        console.log(`User: ${user.username} is created successfully`);
        return {
          message: `User: ${user.username} created Successfully`,
          statusCode: 201,
        };
      }
      return { message: 'Error creating user', statusCode: 402 };
    } catch (error) {
      console.error('Cannot connect to endpoint auth/register', error);
    }
  }

  @Post('login')
  async login(@Body() user: { username: string; password: string }) {
    try {
      const userExist = await this.authService.validateUser(
        user.username,
        user.password,
      );

      if (userExist) {
        const token = await this.authService.generateToken(userExist);
        console.log(
          `User ${user.username} is logged in successfully. Access Token created`,
        );
        return {
          message: 'User logged in Successfully',
          access_token: token,
          statusCode: 201,
        };
      }
      return {
        message: 'User Unauthorized / wrong credentials',
        statusCode: 500,
      };
    } catch (error) {
      console.error('Error logging in through the endpoint auth/login', error);
    }
  }
}
