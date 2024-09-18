import { Module } from '@nestjs/common';
import { SwaggerModule } from './swagger/swagger.module';
import { CustomConfigModule } from './config/customConfigModule';

@Module({
    imports: [SwaggerModule, CustomConfigModule],
})
export class CommonModule {}
