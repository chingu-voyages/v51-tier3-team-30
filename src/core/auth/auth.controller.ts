import {Body , Controller , Post} from '@nestjs/common';
import {LoginService} from "./login/login.service";
import {LoginDto} from "./login-dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly loginService: LoginService) {}

    @Post('login')
    async signIn(@Body() loginDto: LoginDto){
        return this.loginService.signIn(loginDto.email, loginDto.password)
    }
}
