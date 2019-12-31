import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SharedModule} from '../shared/shared.module';
import {FailedMessagePageComponent} from './containers/failed-message-page/failed-message-page.component';
import {PendingMessagePageComponent} from './containers/pending-message-page/pending-message-page.component';
import {ProcessesPageComponent} from './containers/processes-page/processes-page.component';
import {SelectedProcessPageComponent} from './containers/selected-process-page/selected-process-page.component';
import {ViewProcessPageComponent} from './containers/view-process-page/view-process-page.component';
import {MessageDetailComponent} from './components/message-detail/message-detail.component';
import {MessageTableComponent} from './components/message-table/message-table.component';
import {ProcessDetailComponent} from './components/process-detail/process-detail.component';
import {ProcessTableComponent} from './components/process-table/process-table.component';
import {ProcessExistsGuard} from './guards/process-exists.guard';
import {ProcessService} from './services/process.service';
import {ProcessesSandbox} from './processes.sandbox';
import {MessageDetailResolverGuard} from './guards/message-detail-resolver.guard';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    FailedMessagePageComponent,
    PendingMessagePageComponent,
    ProcessesPageComponent,
    SelectedProcessPageComponent,
    ViewProcessPageComponent,
    MessageDetailComponent,
    MessageTableComponent,
    ProcessDetailComponent,
    ProcessTableComponent,
  ],
  providers: [
    ProcessService,
    ProcessesSandbox,
    ProcessExistsGuard,
    MessageDetailResolverGuard
  ]
})
export class ProcessesModule {
}
