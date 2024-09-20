import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from "./auth.service";
import {ConfigService} from "@nestjs/config";
import {GoogleStrategy} from "./strategies/google.strategy";
import {OauthController} from "./oauth.controller";

@Module({
    providers: [AuthService, GoogleStrategy],
    controllers: [AuthController, OauthController],
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [JwtModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('jwt.secret'),//TODO: declare this string in a constant folder to avoid magic value,
                    signOptions: {
                        expiresIn: configService.get<number>('jwt.expiresIn') //TODO: declare this string in a constant folder to avoid magic value,
                    },
                }
            },
            inject: [ConfigService]
        })

    ]
})
export class AuthModule {}
