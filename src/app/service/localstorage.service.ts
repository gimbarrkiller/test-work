import {Injectable} from '@angular/core';
import {IMovieModel, Movie} from '../model/movie.model';


@Injectable()
export class LocalstorageService {

  public set(value: string, key = 'bookmarks'): void {
    let movies: string[] = this.get();
    if (movies && movies.length) {
      movies.push(value);
    } else {
      movies = [value];
    }
    localStorage.setItem(key, JSON.stringify(movies));
  }

  public remove(value: string, key = 'bookmarks'): void {
    let movies: string[] = this.get();
    if (movies && movies.length) {
      movies = movies.filter((item: string) => item !== value);
    } else {
      movies = [];
    }
    localStorage.setItem(key, JSON.stringify(movies));
  }

  public get(key: string = 'bookmarks'): string[] {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

}

export interface IBookmarks {
  bookmarks: string[];
}
