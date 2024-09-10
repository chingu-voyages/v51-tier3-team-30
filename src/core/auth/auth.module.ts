import { Module } from '@nestjs/common';
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";

@Module({
    providers: [RegisterService, LoginService],
    controllers: [AuthController],
    imports: [UserModule]
})
export class AuthModule {}
