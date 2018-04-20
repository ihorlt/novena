import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { BigNovenaRoutingModule } from './big-novena-routing.module';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { ChildBornComponent } from './child-born/child-born.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    BigNovenaRoutingModule
  ],
  declarations: [RootComponent, HomeComponent, ChildBornComponent]
})
export class BigNovenaModule { }
