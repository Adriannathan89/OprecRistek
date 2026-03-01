import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
import { ApiResponse } from "src/apiResponse/api.response";
import * as bcrypt from "bcrypt";
import { ServerErrorResponse } from "src/apiResponse/errorResponse/serverError.response";
import { NotFoundResponse } from "src/apiResponse/errorResponse/notFound.response";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }
    async createUser(userDto: UserDto) {
        try {
            const userData = new User();
            userDto.password = await bcrypt.hash(userDto.password, 10);
            Object.assign(userData, userDto);
            const user = await this.userRepository.save(userData);

            const apiResponse = new ApiResponse<User>(true, 201, "User created successfully");
            return apiResponse;
        } catch (error) {
            throw new ServerErrorResponse("Failed to create user");
        }
    }

    async getUserById(id: string) {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            
            if (!user) {
                throw new NotFoundResponse("User not found");
            }

            const apiResponse = new ApiResponse<String>(true, 200, "User found", user.username);
            return apiResponse;
        } catch (error) {
            throw new ServerErrorResponse("Failed to retrieve user");
        }
    }
}