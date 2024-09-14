import {ApiResponse} from "../types/response.types";
import {HttpStatus} from "@nestjs/common";


export function formatApiResponse<T>(data: T, statusCode: HttpStatus, message: string): ApiResponse<T> {
   return {
       status: statusCode,
       message,
       ...(data ? data: null)
   }
}
