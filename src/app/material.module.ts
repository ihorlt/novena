import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatGridListModule,
  MatDividerModule,
  MatCardModule,
  MatSelectModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatSelectModule,
    FlexLayoutModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatSelectModule,
    FlexLayoutModule
  ],
  declarations: []
})
export class MaterialModule { }
