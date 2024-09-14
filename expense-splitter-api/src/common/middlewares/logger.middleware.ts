import {HttpStatus , Injectable , Logger , NestMiddleware} from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('RESPONSE')
    use(req: Request , res: Response , next: NextFunction) {
        const {method, originalUrl: url} = req
        const  requestTime = new Date().getTime();
        res.on('finish', () => {
            const { statusCode } = res;
            const responseTime = new Date().getTime();
            if(statusCode === HttpStatus.CREATED || statusCode == HttpStatus.OK) {
                this.logger.log(
                    `${method} ${url} ${statusCode} - ${responseTime - requestTime} ms`
                )
            }
        })
        next()
    }

}
