import { UserService } from './user.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    register(user: {
        username: string;
        password: string;
    }): Promise<{
        message: string;
        statusCode: number;
    }>;
    login(user: {
        username: string;
        password: string;
    }): Promise<{
        message: string;
        access_token: string;
        statusCode: number;
    } | {
        message: string;
        statusCode: number;
        access_token?: undefined;
    }>;
}
