import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule, MatBadgeModule,
  MatBottomSheetModule, MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatRadioModule,
  MatRippleModule, MatSelectionList,
  MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSortModule, MatStepperModule,
  MatTab, MatTableModule,
  MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing';
import {MovieComponent} from './movie/movie.component';
import {BookmarksComponent} from './bookmarks/bookmarks.component';
import {HttpService} from './service/http.service';
import {MoviesStore} from './service/movies.store';
import {PortalModule} from '@angular/cdk/portal';
import {CdkTreeModule} from '@angular/cdk/tree';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {A11yModule} from '@angular/cdk/a11y';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {LocalstorageService} from './service/localstorage.service';
import {TagsComponent} from './movie/tags/tags.component';
import {SearchComponent} from './movie/search/search.component';

const materialLibs = [
  A11yModule,
  CdkStepperModule,
  CdkTableModule,
  CdkTreeModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatStepperModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  PortalModule,
  ScrollingModule,
]


@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    BookmarksComponent,
    TagsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    AppRoutingModule,
    materialLibs
  ],
  providers: [
    HttpService,
    MoviesStore,
    LocalstorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
