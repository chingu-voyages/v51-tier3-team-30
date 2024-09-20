import {MiddlewareConsumer , Module , NestModule} from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { ExpenseModule } from './expense/expense.module';
import { ExpenseGroupModule } from './expense-group/expense-group.module';
import { CalculationsModule } from './calculations/calculations.module';
import { ReceiptModule } from './receipt/receipt.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ExportModule } from './export/export.module';
import { PrismaModule } from './prisma/prisma.module';
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";


@Module({
    imports: [CoreModule, CommonModule, ExpenseModule, ExpenseGroupModule, CalculationsModule, ReceiptModule, AnalyticsModule, ExportModule, PrismaModule],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*')
    }
}
