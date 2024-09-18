import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { type CreateUserDto } from './dtos/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import {Prisma , User} from '@prisma/client';


@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}
    //TODO: use safeUser interface instead
    //TODO: refactor this and use saveUser method
    async createUser(payload: CreateUserDto): Promise<User | null> {
        const { username, password, email } = payload;
        return this.prismaService.user.create({
            data: {
                id: uuidv4(),
                username,
                passwordHash: password,
                email,
            },
        });
    }
    async saveUser(payload: Prisma.UserCreateInput) {
        return this.prismaService.user.create({
            data: payload
        })
    }
    async findUserByUsername(username: string): Promise<User | null> {
        return this.prismaService.user.findFirst({
            where: {
                username,
            },
        });
    }
    async findUserByEmail(email: string): Promise<User | null>{
        return this.prismaService.user.findFirst({
            where: {
                email,
            },
        });
    }
}
