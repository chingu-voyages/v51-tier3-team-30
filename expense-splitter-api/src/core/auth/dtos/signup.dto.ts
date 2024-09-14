import {IsEmail , isNotEmpty , IsNotEmpty , IsString} from "class-validator";


export class SignupDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsString()
    @IsNotEmpty()
    password: string
}
