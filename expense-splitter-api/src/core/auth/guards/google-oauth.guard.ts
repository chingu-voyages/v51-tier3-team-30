import {AuthGuard} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";



@Injectable()
export class GoogleOauthGuard  extends AuthGuard('google') {
    constructor() {
        super({
            accessType: 'offline' // to return a refresh token after successful authentication.
        });
    }
}
