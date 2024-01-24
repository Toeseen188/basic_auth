import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UserDto } from './dto/user.dto';
import { type ResponseType } from './auth.types';
export declare class AuthController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    register(user: RegisterDto): Promise<ResponseType | undefined>;
    login(user: UserDto): Promise<ResponseType | undefined>;
}
