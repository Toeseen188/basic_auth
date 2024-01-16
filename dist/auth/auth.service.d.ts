import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './user.schema';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<UserDocument>;
    generateToken(user: User): string;
}
