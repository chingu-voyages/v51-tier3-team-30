import {Controller , Get , HttpStatus , Request , UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {GoogleOauthGuard} from "./guards/google-oauth.guard";
import {GetUser} from "../../common/decorators/user.decorator";
import {UserPayload} from "../../common/types/user.types";


@Controller('oauth')
export class OauthController {
    constructor(private readonly authService: AuthService) {}


    @Get('google')
    @UseGuards(GoogleOauthGuard)
    async handleGoogleAuth(){}

    @UseGuards(GoogleOauthGuard)
    @Get('google/callback')
    async handleGoogleAuthCallback(@Request() req){
        return this.authService.findOrCreateUser(req.user)
    }
}
