import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './user.schema';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // generate token from user object

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDocument> {
    try {
      const user = await this.userService.findUserByUsername(username);
      const hashedPassword = (password = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex'));
      if (user && user.password == hashedPassword) {
        return user;
      }
      return null;
    } catch (error) {
      console.error('error while validating user', error);
    }
  }

  generateToken(user: User): string {
    try {
      const payload = { username: user.username, sub: user._id };
      return this.jwtService.sign(payload);
    } catch (error) {
      console.log('Error while generating token', error);
    }
  }
}
