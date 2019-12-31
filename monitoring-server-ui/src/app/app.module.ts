import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StoreModule} from '@ngrx/store';
import {ToastrModule} from 'ngx-toastr';

import {AppComponent} from './app.component';
import {AppSandbox} from './app.sandbox';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {ProcessesModule} from './processes/processes.module';
import {SharedModule} from './shared/shared.module';
import {reducers} from './state-management/reducers/root.reducer';
import {CustomHttpInterceptor} from './custom-http.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(reducers),
    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    AppRoutingModule,
    CoreModule,
    ProcessesModule,
    SharedModule
  ],
  providers: [AppSandbox, {
    provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
