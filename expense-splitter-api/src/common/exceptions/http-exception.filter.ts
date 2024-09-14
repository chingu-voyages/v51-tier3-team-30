import {ArgumentsHost , Catch , ExceptionFilter , HttpException , Logger} from "@nestjs/common";
import {Request , Response} from "express";


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter{
    private logger = new Logger('HTTP');
    catch(exception: HttpException , host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.message;
        const timestamp = new Date().toUTCString();
            this.logger.error(
            `${request.method} ${request.originalUrl} ${request.url} ${status} : error:${message} at ${timestamp}`
        );
        response
            .status(status)
            .json({
                status: "failed",
                statusCode: status,
                message: message ?? "An unexpected error occurred",
            })
    }

}
