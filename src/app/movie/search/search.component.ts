import {Component, OnInit} from '@angular/core';
import {MoviesStore} from '../../service/movies.store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  constructor(private moviesStore: MoviesStore) {
  }

  ngOnInit() {
  }

  search(term: string): void {
    this.moviesStore.searchMovie(term);
  }

}
