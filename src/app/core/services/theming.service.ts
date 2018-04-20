import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ThemeInterface } from '../models/user';
import { AuthService } from './auth.service';

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

  constructor(private authService: AuthService) {
    if(authService.isLoggedUser() && authService.theme){
      this._themeCssActive.next(authService.theme);
    } else {
      this._themeCssActive.next(this._themes[0]);
    }
    this._themeCssActive.subscribe(
      theme => {
        this.loadCSS(theme.file);
        this.authService.theme = theme;
      });
   }

   get themeCssActive(): ReplaySubject<ThemeInterface>{
     return this._themeCssActive;
   }

  set themeCssActive(theme: ReplaySubject<ThemeInterface>) {
    this._themeCssActive = theme;
  }

  get themes(): ThemeInterface[] {
    return this._themes;
  }

  /**
   * Load css file with help of link tag dynamically
   * @param url css file with styles
   */
  public loadCSS(url) {
    let head = document.getElementsByTagName('head')[0];
    let links = head.getElementsByTagName('link');
    let newThemeLinks = links[links.length-1];
    
    // if new link is added, just change href
    if(newThemeLinks.getAttribute("id") === "new-theme-stylesheet-in-head-loaded"){
      newThemeLinks.href = url;
      return;
    }

    // Create link
    let link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.id = "new-theme-stylesheet-in-head-loaded";

    head.insertAdjacentElement("beforeend", link);
  }

}
