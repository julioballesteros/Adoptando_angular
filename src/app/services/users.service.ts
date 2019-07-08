import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError } from 'rxjs';
import {User} from '../models/user.model';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = 'http://localhost:8888';

  public loggedUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('loggedUser')));

  constructor( private http: HttpClient ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${ this.url }/users`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getUser(id: number) : Observable<User> {
    return this.http.get<User>(`${ this.url }/user/${ id }`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  createUser(user: User) : Observable<User>{
      return this.http.post<User>(`${ this.url }/users`, user);

  }

  login(mail: String, password: String) {
    return this.http.post<User>(`${ this.url }/login`, {mail: mail, password: password})
      .subscribe(user => {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        this.loggedUserSubject.next(user);
      });
  }

  updateUser(user: User) : Observable<User>{
    return this.http.put<User>(`${ this.url }/user/${ user.id }`, user);
  }

  logout() {
		localStorage.removeItem('logged_user');
		this.loggedUserSubject.next(null);
	}

  deleteUser(user: User) {
    return this.http.delete(`${ this.url }/user/${ user.id }`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
  };

}
