import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MoviesStore} from '../service/movies.store';
import {Observable, Subject} from 'rxjs';
import {Movie} from '../model/movie.model';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MovieComponent implements OnInit {

  moviesObservable$: Observable<Movie[]>;
  showButton$: Observable<boolean>;

  constructor(private moviesStore: MoviesStore) {
  }

  ngOnInit() {
    this.moviesStore.initMovies();
    this.moviesObservable$ = this.moviesStore.movies$;
    this.showButton$ = this.moviesStore.showButton$;
  }

  onNextPage(): void {
    this.moviesStore.onNextPage();
  }

  onHandleBookmark(item: Movie): void {
    this.moviesStore.onHandleBookmark(item);
  }

}
