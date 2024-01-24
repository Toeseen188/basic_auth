import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './user.schema'
import { UserService } from './user.service'
import { JwtModule } from '@nestjs/jwt'
// import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'basic_key',
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService]
})
export class AuthModule {}
