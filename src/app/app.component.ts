import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navLinks: { path: string, label: string }[];

  constructor() {
    this.navLinks = [
      {
        path: '/movie',
        label: 'Фильмы'
      },
      {
        path: '/bookmarks',
        label: 'Закладки'
      }
    ];
  }

}
