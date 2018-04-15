import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from "rxjs/Subject";
import { takeUntil } from 'rxjs/operators';
import { ThemingService } from '../../../core/services/theming.service';

@Component({
  selector: 'nov-theme-select',
  templateUrl: './theme-select.component.html',
  styleUrls: ['./theme-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ThemeSelectComponent implements OnDestroy {

  choosenThemeId: FormControl = new FormControl();

  //for unsubscribing from Observables
  private unsubscribe: Subject<void> = new Subject();

  constructor(public themingService: ThemingService) {
    // react on change value
    this.choosenThemeId.valueChanges
    .pipe(takeUntil(this.unsubscribe))
    .subscribe( val => {
      this.themingService.themeCssActive.next(this.themingService.themes[val]);
    });
   }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
