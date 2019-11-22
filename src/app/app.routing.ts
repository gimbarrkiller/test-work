import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookmarksComponent} from './bookmarks/bookmarks.component';
import {MovieComponent} from './movie/movie.component';

const routes: Routes = [
  { path: '', redirectTo: '/movie', pathMatch: 'full' },
  {
    path: 'movie',
    component: MovieComponent,
  },
  {
    path: 'bookmarks',
    component: BookmarksComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


