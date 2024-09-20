import {
    BadRequestException ,
    HttpStatus ,
    Injectable ,
    InternalServerErrorException ,
    UnauthorizedException
} from "@nestjs/common";
import  type {AuthResult , OauthUserInput} from "./auth.interface";
import {UserService} from "../user/user.service";
import {AuthDto} from "./dtos/auth.dto";
import {AuthMessage} from "./config/auth.config";
import {User} from "../user/user.interface";
import {formatApiResponse} from "../../common/utils/format-api-response";
import {JwtService} from "@nestjs/jwt";
import {ApiResponse} from "../../common/types/response.types";

import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from "bcrypt";



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
                    foundUser.passwordHash!,
                )));
        if(!isValidUser){
            return null
        }
        return foundUser
    }
    async signIn(user: User): Promise<ApiResponse<AuthResult>>{
        const payload: Record<string , string> = { sub: user.id, username: user.username }
        return formatApiResponse(
            {
                access_token: await this.jwtService.signAsync(payload)
            },
            HttpStatus.CREATED ,
            AuthMessage.USER_SIGNED_IN
        )
    }

    async findOrCreateUser(oauthUserInput : OauthUserInput) {
        const { provider,providerAccountId, ...rest} = oauthUserInput
        if(!oauthUserInput){
            throw new BadRequestException('Unauthenticated')
        }
        const foundUser = await  this.userService.findUserByEmail(rest.email);
        if(!foundUser){
            const newUser = await this.userService.saveUser({
                id: uuidv4(),
                accounts: {
                    create: {
                        id: uuidv4(),
                        provider: provider,
                        providerAccountId: providerAccountId,
                    }
                },
                ...rest,
            });

            return await this.signIn(newUser as User)

        }
        return await this.signIn(foundUser as User)
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
