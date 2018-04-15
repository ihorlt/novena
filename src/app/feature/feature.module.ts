import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { ThemeSelectComponent } from './components/theme-select/theme-select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    ThemeSelectComponent
  ],
  exports: [
    ThemeSelectComponent
  ]
})
export class FeatureModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FeatureModule,
      providers: [ ]
    };
  }
}
