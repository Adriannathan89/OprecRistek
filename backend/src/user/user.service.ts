import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
import { ApiResponse } from "src/apiResponse/api.response";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}
    async createUser(userDto: UserDto) {
        const userData = new User();
        userDto.password = await bcrypt.hash(userDto.password, 10);
        Object.assign(userData, userDto);
        const user = await this.userRepository.save(userData);
        if(!user) {
            const apiResponse = new ApiResponse<User>(false, 500, "Failed to create user");
            return apiResponse;
        }

        const apiResponse = new ApiResponse<User>(true, 201, "User created successfully");
        return apiResponse;
    }
}