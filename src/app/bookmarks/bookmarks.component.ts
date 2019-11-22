import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {MoviesStore} from '../service/movies.store';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BookmarksComponent implements OnInit {

  bookmarksObservable$: Observable<string[]>;

  constructor(private moviesStore: MoviesStore) {
  }

  ngOnInit() {
    this.bookmarksObservable$ = this.moviesStore.bookmarks$;
  }

  onDeleteBookmark(item: string): void {
    this.moviesStore.deleteBookmark(item);
  }

}
