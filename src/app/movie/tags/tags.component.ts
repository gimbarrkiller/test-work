import {Component, OnInit, Renderer, Renderer2, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {MoviesStore} from '../../service/movies.store';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {

  tags$: Observable<string[]>;
  activeTags: Set<string>;

  constructor(private moviesStore: MoviesStore,
              private renderer: Renderer) {
    this.activeTags = new Set<string>();
  }

  ngOnInit() {
    this.tags$ = this.moviesStore.tags$;
  }

  onSelectTag(event, tag): void {
    if (this.activeTags.has(tag)) {
      this.activeTags.delete(tag);
      this.renderer.setElementClass(event._elementRef.nativeElement, 'active', false);
    } else {
      this.activeTags.add(tag);
      this.renderer.setElementClass(event._elementRef.nativeElement, 'active', true);

    }
    this.moviesStore.searchTagMovie([...this.activeTags]);
  }

}
