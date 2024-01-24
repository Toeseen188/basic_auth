import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
// import { UserInterface } from './interfaces/user.interface';
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
  @Prop()
    username: string

  @Prop()
    password: string
}
export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
