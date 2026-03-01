import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt-strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { ConfigModule } from "@nestjs/config/dist/config.module";
import { ConfigService } from "@nestjs/config/dist/config.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '4h' },
            }),
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [JwtModule, PassportModule],
})
export class AuthModule { }