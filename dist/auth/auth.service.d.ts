import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { type User, type UserDocument } from './user.schema';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<{
        isValid: boolean;
        user: UserDocument | null;
    }>;
    generateToken(user: User): string | undefined;
}
