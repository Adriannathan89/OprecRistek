import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async login(username: string, email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: email ? { email } : { username }
        });
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}