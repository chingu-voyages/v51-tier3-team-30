import {HttpStatus , Injectable , InternalServerErrorException , UnauthorizedException} from "@nestjs/common";
import {AuthResult} from "./auth.interface";
import {UserService} from "../user/user.service";
import {AuthDto} from "./dtos/auth.dto";
import {AuthMessage} from "./config/login.config";
import {User} from "../user/user.interface";
import * as bcrypt from "bcrypt";
import {formatApiResponse} from "../../common/utils/format-api-response";
import {JwtService} from "@nestjs/jwt";
import {ApiResponse} from "../../common/types/response.types";




@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {
    }
    async authenticate(input: AuthDto): Promise<ApiResponse<AuthResult>> {
       const user = await this.validateUser(input);
       if(!user) {
           throw new UnauthorizedException(
               AuthMessage.USERNAME_PASSWORD_DO_NOT_MATCH,
           );
       }
       return this.signIn(user)
    }
    async validateUser(input: AuthDto) {
        const foundUser: User | null =
            await this.userService.findUserByEmail(input.email);
        const isValidUser: boolean =
            (foundUser!== null &&
                (await this.validatePassword(
                    input.password,
                    foundUser.password_hash!,
                )));
        if(!isValidUser){
            return null
        }
        return foundUser
    }
    async signIn(user: User): Promise<ApiResponse<AuthResult>>{
        const payload: Record<string , string> = { sub: user.id, username: user.username}
        return formatApiResponse(
            {
                access_token: await this.jwtService.signAsync(payload)
            },
            HttpStatus.CREATED ,
            AuthMessage.USER_SIGNED_IN
        )
    }

    async signUp(username: string, password: string, email: string): Promise<ApiResponse<null>>
    {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            await this.userService.createUser({
                password: hashedPassword,
                username,
                email,
            });
            return formatApiResponse(null,HttpStatus.CREATED, AuthMessage.USER_CREATED);
        }catch (e) {
            throw new InternalServerErrorException()
        }
    }
    private async validatePassword(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}
