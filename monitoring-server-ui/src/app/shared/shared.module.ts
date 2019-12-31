import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {KeysPipe} from './pipes/keys.pipe';
import {MessageContentPipe} from './pipes/messsage-content.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    KeysPipe,
    MessageContentPipe
  ],
  declarations: [
    KeysPipe,
    MessageContentPipe
  ]
})
export class SharedModule {
}
