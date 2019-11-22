import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {IMovieModel} from '../model/movie.model';


@Injectable({ providedIn: 'root' })
export class HttpService {

  private baseUrl = 'http://www.mocky.io/v2/';
  private movieID = '5dceddf43000005500931d09';
  private tagsID = '5dcede30300000fd9f931d0b';

  constructor(
    private http: HttpClient) {
  }

  getMovies(): Observable<IMovieModel[]> {
    return this.http.get<IMovieModel[]>(`${this.baseUrl}${this.movieID}`)
      .pipe(
        catchError(this.handleError<IMovieModel[]>('getMovies', []))
      );
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}${this.tagsID}`)
      .pipe(
        catchError(this.handleError<string[]>('getTags', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
