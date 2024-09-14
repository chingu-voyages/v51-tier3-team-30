import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from "./auth.service";

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: "This is my dump secret that should be move into secured file",
            signOptions: {
                expiresIn: '60s' // should be declared as constant value in centralized config  file
            }
        })
    ]
})
export class AuthModule {}
