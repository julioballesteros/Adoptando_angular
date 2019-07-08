import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Pet} from '../models/pet.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  private url = 'http://localhost:8888';

  constructor(private http: HttpClient) { }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${ this.url }/pets`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getPet(id:number): Observable<Pet>{
    return this.http.get<Pet>(`${ this.url }/pet/${ id }`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  addPet(pet: Pet) : Observable<Pet> {
    return this.http.post<Pet>(`${ this.url }/pets`, pet, httpOptions)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  deletePet(id : number) {
    return this.http.delete(`${ this.url }/pet/${ id }`, httpOptions)
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
