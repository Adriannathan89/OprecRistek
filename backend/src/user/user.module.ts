import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthService } from "src/auth-guard/auth.service";
import { AuthModule } from "src/auth-guard/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        AuthModule,
    ],
    controllers: [UserController],
    providers: [UserService, AuthService],
    exports: [UserService]
})
export class UserModule {}