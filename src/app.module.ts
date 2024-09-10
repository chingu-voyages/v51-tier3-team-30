import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { ExpenseModule } from './expense/expense.module';
import { ExpenseGroupModule } from './expense-group/expense-group.module';
import { CalculationsModule } from './calculations/calculations.module';
import { ReceiptModule } from './receipt/receipt.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ExportModule } from './export/export.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
    imports: [CoreModule, CommonModule, CoreModule, ExpenseModule, ExpenseGroupModule, CalculationsModule, ReceiptModule, AnalyticsModule, ExportModule, PrismaModule],
})
export class AppModule {}
