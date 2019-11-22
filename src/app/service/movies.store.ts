import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {IMovieModel, Movie} from '../model/movie.model';
import {BehaviorSubject, forkJoin, from, Observable, Observer, of, Subject} from 'rxjs';
import {IBookmarks, LocalstorageService} from './localstorage.service';


@Injectable()
export class MoviesStore {

  private movies: Movie[] = [];
  private saveBookmarks: string[];
  public movies$: BehaviorSubject<Movie[]>;
  public bookmarks$: BehaviorSubject<string[]>;
  public tags$: BehaviorSubject<string[]>;
  public showButton$: BehaviorSubject<boolean>;
  private count: number;
  private offset: number;
  private activeTags: string[];
  private activeSearch: string;

  constructor(private httpService: HttpService,
              private localstorageService: LocalstorageService) {
    this.activeTags = [];
    this.activeSearch = null;
    this.movies$ = new BehaviorSubject<Movie[]>(null);
    this.saveBookmarks = this.localstorageService.get();
    this.bookmarks$ = new BehaviorSubject<string[]>(this.saveBookmarks);
    this.tags$ = new BehaviorSubject<string[]>(null);
    this.showButton$ = new BehaviorSubject<boolean>(true);
    forkJoin(this.httpService.getMovies(), this.httpService.getTags())
      .subscribe((data) => {
        const movies: IMovieModel[] = data[0] as IMovieModel[];
        const tags: string[] = data[1];
        this.onNextSubjectTags(tags);
        movies.map((item: IMovieModel) => this.movies.push(new Movie(item, this.saveBookmarks)));
        this.movies$.next([...this.movies.slice(this.offset, this.count)]);
      });
    this.onNextSubjectBookmarks();
  }

  private getBookmarks(): string[] {
    return this.localstorageService.get();
  }

  initMovies() {
    this.activeTags = [];
    this.activeSearch = null;
    this.offset = 0;
    this.count = 15;
    this.onNextSubjectMovies();
    this.changeDisableButton();
  }

  changeDisableButton(value = true): void {
    this.showButton$.next(value);
  }

  onNextPage(): void {
    this.offset += this.count;
    this.onNextSubjectMovies();
    this.changeDisableButton(this.offset < this.movies.length);
  }

  private onNextSubjectMovies(): void {
    this.movies$.next([...this.movies.slice(0, this.count + this.offset)]);
  }

  private onNextSubjectTags(tags: string[]): void {
    this.tags$.next(tags);
  }

  private onNextSubjectBookmarks(): void {
    this.bookmarks$.next(this.getBookmarks());
  }

  searchTagMovie(tags: string[]): void {
    this.activeTags = tags;
    this.searchMovie(this.activeSearch);
  }

  searchMovie(term: string): void {
    if (term && term.trim()) {
      this.activeSearch = term.trim().toLowerCase();
    } else {
      this.activeSearch = null;
    }

    if (this.activeTags.length || this.activeSearch) {
      let resultSearch = [];

      if (this.activeSearch) {
        resultSearch = this.movies
          .filter((item: Movie) => {
            return item.title.toLowerCase().search(this.activeSearch) > -1;
          });
      }

      if (this.activeTags.length) {
        resultSearch = (resultSearch.length ? resultSearch : this.movies).filter((item: Movie) => {
          return this.activeTags.every((activeTag: string) => {
            let boolItem = false;
            for (const itemTag of item.tags) {
              if (activeTag === itemTag) {
                boolItem = true;
              }
            }
            return boolItem;
          });
        });

      }
      this.movies$.next([...resultSearch]);
      this.changeDisableButton(false);
    } else {
      this.onNextSubjectMovies();
      this.changeDisableButton(true);
    }
  }

  onHandleBookmark(item: Movie): void {
    item.changeActivebookmark();
    if (item.isActiveBookmark()) {
      this.localstorageService.set(item.title);
    } else {
      this.localstorageService.remove(item.title);
    }
    this.onNextSubjectBookmarks();
  }

  deleteBookmark(item: string): void {
    this.localstorageService.remove(item);
    this.movies = this.movies.map((value: Movie) => {
      if (value.title === item){
          value.changeActivebookmark();
      }
      return value;
    });
    this.onNextSubjectBookmarks();
  }

}

