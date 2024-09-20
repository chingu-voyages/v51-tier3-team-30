import {PassportStrategy} from "@nestjs/passport";
import {Strategy , VerifyCallback} from "passport-google-oauth20";
import {ConfigService} from "@nestjs/config";
import {Injectable , Logger} from "@nestjs/common";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google' ){
    private logger = new Logger('GoogleStrategy')
   constructor(private readonly configService: ConfigService) {
       super({
           clientID: configService.get<string>('google.clientID'),
           clientSecret: configService.get<string>('google.clientSecret'),
           callbackURL: configService.get<string>('google.callbackURL'),
           scope: ['email', 'profile'],
       });
   }

   async validate(
       accessToken: string,
       refreshToken: string,
       profile: any,
       done: VerifyCallback,
   ){
       const {id,name, emails, photos} = profile;
        const username = name.givenName + name.familyName || emails[0].value.split('@')[0];
       const user = {
           email: emails[0].value,
           firstName: name.givenName,
           lastName: name.familyName,
           username,
           picture: photos[0].value,
           providerAccountId: id,
           provider: 'google'
       }

       done(null, user)
   }
}
