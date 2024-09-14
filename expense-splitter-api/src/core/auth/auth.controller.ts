import {Body , Controller , Get , Logger , Post} from '@nestjs/common';
import {AuthDto} from "./dtos/auth.dto";
import {SignupDto} from "./dtos/signup.dto";
import {AuthService} from "./auth.service";


@Controller('auth')
export class AuthController {
    private logger = new Logger("AuthController")
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async signIn(@Body() loginDto: AuthDto){
        this.logger.debug(`signUpDto: ${loginDto.password} ${loginDto.email}`)
        return this.authService.authenticate(loginDto)
    }
    @Post('signup')
    async signUp(@Body() signUpDto: SignupDto){
        this.logger.debug(`signUpDto: ${signUpDto.password} ${signUpDto.email} ${signUpDto.username}`)
        return this.authService.signUp(signUpDto.username, signUpDto.password, signUpDto.email)
    }

    @Get('me')
    async profile(){

    }
}
