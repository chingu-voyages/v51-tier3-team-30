import {
    HttpException ,
    HttpStatus ,
    Injectable ,
    InternalServerErrorException ,
    UnauthorizedException
} from '@nestjs/common';
import {UserService} from '../../user/user.service';
import {User} from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {SignInResponse} from './login.response';
import {formatApiResponse} from "../../../common/utils/format-api-response";
import {AuthMessage} from "../config/login.config";
import {ApiResponse} from "../../../common/types/response.types";

@Injectable()
export class LoginService {
    constructor(private userService: UserService) {}

    // TODO: return tokens instead of null
    async signIn(email: string, password: string): Promise<ApiResponse<null>> {
        const foundUser: User | null =
            await this.userService.findUserByEmail(email);
        const isValidUser: boolean =
            !foundUser ||
            (foundUser &&
                (await this.validatePassword(
                    password,
                    foundUser.password_hash,
                )));
        if (isValidUser) {
            throw new UnauthorizedException(
                'failed to login, username/password do not match',
            );
        }
        return formatApiResponse(null, HttpStatus.CREATED , AuthMessage.UserSignedIn)
    }
    async signUp(username: string, password: string, email: string): Promise<ApiResponse<null>>
    {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const createdUser = this.userService.createUser({
                password: hashedPassword,
                username,
                email,
            });
            return formatApiResponse(null, HttpStatus.CREATED, AuthMessage.UserCreated)
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
