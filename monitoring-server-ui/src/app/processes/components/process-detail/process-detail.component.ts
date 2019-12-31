import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Process} from '../../models/process';

@Component({
  selector: 'app-process-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './process-detail.component.html',
  styleUrls: ['./process-detail.component.css']
})
export class ProcessDetailComponent implements OnInit {
  @Input() process: Process;
  @Output() selectFailedMessage = new EventEmitter<string>();
  @Output() selectPendingMessage = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

}
