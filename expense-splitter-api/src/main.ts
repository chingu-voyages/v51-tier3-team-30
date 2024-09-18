import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from "./common/exceptions/http-exception.filter";
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        })
    )
    const configService = app.get<ConfigService>(ConfigService)
    await app.listen(configService.get<number>('PORT') as number);
}
bootstrap();
