import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsersService} from '../services/users.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private usersService: UsersService){

	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let logged_user = this.usersService.loggedUserSubject.getValue();
		if (logged_user){
			req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${logged_user.token}`
				}
			});
		}
		return next.handle(req);
	}
}
