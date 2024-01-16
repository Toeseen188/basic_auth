"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async register(user) {
        try {
            const existingUser = await this.userService.findUserByUsername(user.username);
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
        }
        catch (error) {
            console.error('Cannot connect to endpoint auth/register', error);
        }
    }
    async login(user) {
        try {
            const userExist = await this.authService.validateUser(user.username, user.password);
            if (userExist) {
                const token = await this.authService.generateToken(userExist);
                console.log(`User ${user.username} is logged in successfully. Access Token created`);
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
        }
        catch (error) {
            console.error('Error logging in through the endpoint auth/login', error);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map