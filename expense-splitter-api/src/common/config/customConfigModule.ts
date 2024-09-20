import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import configuration from "./configuration";

const ENV_PATH = ".env"
@Module({
    imports: [ConfigModule.forRoot({
        load: [configuration],
        isGlobal: true
    })]
})
export class CustomConfigModule {}

