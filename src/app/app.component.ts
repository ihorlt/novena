import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from "rxjs/Subject";
import { takeUntil } from 'rxjs/operators';
import { ThemingService, ThemeInterface } from './core/services/theming.service';

@Component({
  selector: 'nov-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy  {
  title = 'novena';
  // link to external css theme. If it quals to "", then a default is used.
  cssThemeUrl: ThemeInterface;

  //for unsubscribing from Observables
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    public sanitizer: DomSanitizer,
    private themingService: ThemingService){
    themingService.themeCssActive
    .pipe(takeUntil(this.unsubscribe))
    .subscribe( theme => this.cssThemeUrl = theme );
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
