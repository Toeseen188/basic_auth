import { Injectable } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtService } from '@nestjs/jwt'
import { type User, type UserDocument } from './user.schema'
import * as crypto from 'crypto'

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser (
    username: string,
    password: string
  ): Promise<{ isValid: boolean, user: UserDocument | null }> {
    try {
      const user = await this.userService.findUserByUsername(username)
      const hashedPassword = (password = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex'))

      if (user !== null && user.password === hashedPassword) {
        return { isValid: true, user }
      }
      if (user !== null && user.password !== hashedPassword) {
        return { isValid: false, user }
      }
      return { isValid: false, user: null }
    } catch (error) {
      console.error('error while validating user', error)
      throw error
    }
  }

  generateToken (user: User): string | undefined {
    try {
      const payload = { username: user.username, sub: user._id }
      return this.jwtService.sign(payload)
    } catch (error) {
      console.log('Error while generating token', error)
    }
  }
}
