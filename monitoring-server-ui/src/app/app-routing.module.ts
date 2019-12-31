import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NotFoundPageComponent} from './core/containers/not-found-page/not-found-page.component';
import {FailedMessagePageComponent} from './processes/containers/failed-message-page/failed-message-page.component';
import {PendingMessagePageComponent} from './processes/containers/pending-message-page/pending-message-page.component';
import {ProcessesPageComponent} from './processes/containers/processes-page/processes-page.component';
import {ViewProcessPageComponent} from './processes/containers/view-process-page/view-process-page.component';
import {ProcessExistsGuard} from './processes/guards/process-exists.guard';
import {MessageDetailResolverGuard} from './processes/guards/message-detail-resolver.guard';

const appRoutes: Routes = [
  {path: 'processes', component: ProcessesPageComponent},
  {path: 'processes/:id', component: ViewProcessPageComponent, canActivate: [ProcessExistsGuard]},
  {
    path: 'processes/:processId/failed-messages/:messageId',
    component: FailedMessagePageComponent,
    resolve: {
      message$: MessageDetailResolverGuard
    }
  },
  {
    path: 'processes/:processId/pending-messages/:messageId',
    component: PendingMessagePageComponent,
    resolve: {
      message$: MessageDetailResolverGuard
    }
  },
  {path: '', redirectTo: '/processes', pathMatch: 'full'},
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
