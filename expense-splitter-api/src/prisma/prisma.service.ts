import {Injectable , Logger , OnModuleInit} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    logger = new Logger(PrismaService.name);

    async onModuleInit(): Promise<void> {
        await this.$connect();
        this.$on('query' as never, async (e: any) => {
            this.logger.debug(`(${e.duration}ms) ${e.query}`);
        });
    }
}
