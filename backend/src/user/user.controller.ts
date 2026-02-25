import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";
import { AuthService } from "src/auth-guard/auth.service";
import { Param } from "@nestjs/common";

@Controller("/api/user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

    @Post("/register")
    async registerUser(@Body() userDto: UserDto) {
        return await this.userService.createUser(userDto);
    }

    @Post("/login")
    async loginUser(@Body() userDto: UserDto) {
        return await this.authService.login(userDto.username, userDto.email, userDto.password);
    }

     @Get("/profile/:id")
    async getUserProfile(@Param("id") id: string) {
        return await this.userService.getUserById(id);
    }
}