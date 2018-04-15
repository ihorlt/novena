import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export interface ThemeInterface {
  id: number;
  color: string;
  file: string;
  name: string;
}

@Injectable()
export class ThemingService {

  private _themes: ThemeInterface[] = [
    {id: 0, color: "#7b1fa2", file: "", name: "Фіолетово-зелене" },
    {id: 1, color: "#673ab7", file: "assets/css/deeppurple-amber.css", name: "Темно-фіолетово-бурштинове" },
    {id: 2, color: "#3f51b5", file: "assets/css/indigo-pink.css", name: "Індиго-рожеве" },
    {id: 3, color: "#c2185b", file: "assets/css/pink-bluegrey.css", name: "Рожево-синьо-сіре" },
    {id: 4, color: "#009688", file: "assets/css/teal-orange.css", name: "Морськово-апельсиновий" }
  ];

  /**
   * Holds an active theme
   */
  private _themeCssActive: ReplaySubject<ThemeInterface> = new ReplaySubject();

  constructor() {
    this._themeCssActive.next(this._themes[0]);
   }

  get themeCssActive(): ReplaySubject<ThemeInterface> {
    return this._themeCssActive;
  }

  set themeCssActive(theme: ReplaySubject<ThemeInterface>) {
    this._themeCssActive = theme;
  }

  get themes(): ThemeInterface[] {
    return this._themes;
  }

}
