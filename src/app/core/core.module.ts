import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { ThemingService } from './services/theming.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: [],
  providers: [AuthService, ThemingService]
})
export class CoreModule {
  /**
     * Prevents importing CoreModule twice
     * @Optional() is because core is not required
     * @SkipSelf() is because we asking a CoreModule dependency inside a CoreModule.
     * At this point Angular would go WTF, but this decorator allows instantiate injection after
     *  CoreModule
     */
    constructor(@Optional() @SkipSelf() public core: CoreModule) {
      if(core) {
          throw new Error("You shall not run!");
      }
  }
 }
