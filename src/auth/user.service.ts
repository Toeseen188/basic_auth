import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(user: {
    username: string;
    password: string;
  }): Promise<User> {
    try {
      // hash the password
      user.password = crypto
        .createHash('sha256')
        .update(user.password)
        .digest('hex');
      const newUser = new this.userModel(user);
      return newUser.save();
    } catch (error) {
      console.error('User Model cannot be created', error.message);
      throw error;
    }
  }

  // find user by username
  async findUserByUsername(username: string): Promise<UserDocument | null> {
    try {
      return this.userModel.findOne({ username }).exec();
    } catch (error) {
      console.error('Error finding username', error);
      throw error;
    }
  }
}
