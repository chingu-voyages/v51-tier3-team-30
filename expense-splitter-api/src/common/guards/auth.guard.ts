import {CanActivate , ExecutionContext , Injectable} from "@nestjs/common";
import {Observable} from "rxjs";


@Injectable()
export class  AuthGuard  implements CanActivate{
    canActivate(context: ExecutionContext): boolean  | Observable<boolean> {
        const host = context.switchToHttp();

        return true

    }

}
