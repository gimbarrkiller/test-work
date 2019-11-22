import {LocalstorageService} from '../service/localstorage.service';

export interface IMovieModel {
  title: string;
  tags: string[];
}


export class Movie implements IMovieModel {
  title: string;
  tags: string[];
  private activeBookmark: boolean;
  icon: string;
  tooltip: string;

  constructor(data: IMovieModel,
              private saveBookmarks: string[]) {
    if (saveBookmarks.filter((item: string) => item === data.title).length) {
      this.setActivebookmark(true);
    } else {
      this.setActivebookmark(false);
    }
    this.title = data.title;
    this.tags = data.tags;
  }

  setActivebookmark(check: boolean): void {
    this.activeBookmark = check;
    this.setIconBookmark();
    this.setTooltip();
  }

  setTooltip(): void {
    this.tooltip = this.isActiveBookmark() ? 'Удалить из закладки' : 'Добавить в закладки';
  }

  changeActivebookmark(): void {
    this.setActivebookmark(!this.isActiveBookmark());
  }

  setIconBookmark(): void {
    this.icon = this.isActiveBookmark() ? 'star' : 'star_border';
  }

  isActiveBookmark(): boolean {
    return this.activeBookmark;
  }

}
