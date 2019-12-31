import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NavbarComponent} from './components/navbar/navbar.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {NotFoundPageComponent} from './containers/not-found-page/not-found-page.component';

export const COMPONENTS = [
  NavbarComponent,
  SpinnerComponent,
  NotFoundPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
}
